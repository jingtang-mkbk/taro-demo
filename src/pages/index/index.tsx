import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import './index.less'

export default function Index() {
  const [obj, setObj] = useState({clientX: 100, clientY: 100});
  const [angle, setAngle] = useState(0);

  useLoad(() => {
    console.log('Page loaded.')
    const _index = document.getElementsByClassName('index')
    console.log('_index', _index);

  })

  const compute = (clientX: number, clientY: number, offsetX = 75, offsetY = 75) => {
    console.log(clientX,clientY)
    // 以下都是rpx的一半
    const r = 25;   //摇杆的半径
    const r2 = 100; //底盘的半径
    const x = offsetX + r;  //加上r半径的偏移到中心
    const y = offsetY + r;
    let _angle = 0;
    //开根 触摸点到摇杆中心点的距离
    let d = Math.sqrt(Math.pow(clientX - x, 2) + Math.pow(clientY - y, 2));
    d = d > (r2 - r) ? r2 - r : d;
    //三角函数求反正切 减去xy偏移到中心点
    const radin = Math.atan2(clientY - y, clientX - x);
    const vx = Math.cos(radin) * d + x;
    const vy = Math.sin(radin) * d + y;
    setObj({clientX: vx, clientY: vy});
    if (radin <= 0) {
      _angle = Math.abs(radin) * (180 / Math.PI);
    } else {
      _angle = 360 - Math.abs(radin) * (180 / Math.PI);
    }
    setAngle(_angle);
  }

  const onTouchMove = (e: any) => {
    compute(e.touches[0].clientX, e.touches[0].clientY,)
  }

  const onTouchEnd = () => {
    setObj({clientX: 100, clientY: 100})
    setAngle(0);
  }

  return (
    <>
      <View className='container'>
        <View
          className='joystick'
          style={{ left: obj.clientX, top: obj.clientY }}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
        </View>
      </View>
      <View className='angle'>angle：{angle}</View>
    </>
  )
}
