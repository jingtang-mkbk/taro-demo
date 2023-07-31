import { View } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro';
import { useRef, useState } from 'react'
import './index.less'

interface OffsetRefType {
  offsetX: number,
  offsetY: number,
}

export default function Index() {
  const [obj, setObj] = useState({ clientX: 0, clientY: 0 });
  const [angle, setAngle] = useState(0);
  const offsetRef = useRef<OffsetRefType>({ offsetX: 0, offsetY: 0 });

  useLoad(() => {
    // 获取设备宽高
    const { windowWidth, windowHeight } = Taro.getWindowInfo();
    // 实际中心点位于屏幕中心
    const realWidth = windowWidth * 0.5;
    // 高度为屏幕高度的350/555
    const realHeight = Math.round(350 * windowHeight / 555);
    offsetRef.current = { offsetX: realWidth, offsetY: realHeight }
  })

  /**
   * @param clientX 按下的x偏移量
   * @param clientY 按下的y偏移量
   * @param offsetX 距离原点x偏移量
   * @param offsetY 距离原点y偏移量
   */
  const compute = (clientX: number, clientY: number, offsetX = 100, offsetY = 100) => {
    // 以下都是rpx的一半
    const r = 25;   //摇杆的半径
    const r2 = 100; //底盘的半径
    let _angle = 0;
    //开根 触摸点到摇杆中心点的距离
    let d = Math.sqrt(Math.pow(clientX - offsetX, 2) + Math.pow(clientY - offsetY, 2));
    d = d > (r2 - r) ? r2 - r : d;
    //三角函数求反正切 减去xy偏移到中心点
    const radin = Math.atan2(clientY - offsetY, clientX - offsetX);
    const vx = Math.cos(radin) * d;
    const vy = Math.sin(radin) * d;
    setObj({ clientX: vx * 2, clientY: vy * 2 });

    if (radin <= 0) {
      _angle = Math.abs(radin) * (180 / Math.PI);
    } else {
      _angle = 360 - Math.abs(radin) * (180 / Math.PI);
    }
    setAngle(_angle);
  }

  const onTouchMove = (e: any) => {
    compute(e.touches[0].clientX, e.touches[0].clientY, offsetRef.current.offsetX, offsetRef.current.offsetY);
  }

  const onTouchEnd = () => {
    setObj({ clientX: 0, clientY: 0 })
    setAngle(0);
  }

  return (
    <>
      <View className='top'>
        <View className='angle'>angle：{angle.toFixed(2)}</View>
        <View>x:{obj.clientX.toFixed(2)}</View>
        <View>y:{obj.clientY.toFixed(2)}</View>
      </View>
      <View className='box'>
        <View className='container'>
          <View
            className='joystick'
            style={{
              left: obj.clientX === 0 ? '200rpx' : `${200 + obj.clientX}rpx`,
              top: obj.clientY === 0 ? '200rpx' : `${200 + obj.clientY}rpx`,
            }}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
          </View>
        </View>
      </View>

    </>
  )
}
