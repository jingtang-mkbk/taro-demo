export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/test/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#000',
    selectedColor: '#e4801e',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'static/icon/home.png',
        selectedIconPath: 'static/icon/home-active.png'
      },
      {
        pagePath: 'pages/test/index',
        text: '我的',
        iconPath: 'static/icon/user.png',
        selectedIconPath: 'static/icon/user-active.png'
      },
    ],
  }
})
