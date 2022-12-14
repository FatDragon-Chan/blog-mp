export default defineAppConfig({
  pages: [
    'pages/tabbar/index/index',
    'pages/tabbar/my/index',
    'pages/article/list/index',
    'pages/tools/svg2canvas/index'
  ],
  darkmode: true,
  themeLocation: 'theme.json',
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/tabbar/index/index',
        text: '้ฆ้กต',
      },
      {
        pagePath: 'pages/tabbar/my/index',
        text: 'ๆ็',
      }
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '@navBgColor',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
