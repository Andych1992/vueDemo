
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/mainindex/mainindex","pages/mainstroage/mainstroage","pages/mainme/mainme","pages/login/login"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"物资管理系统","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#B5B5B5","selectedColor":"#1296db","borderStyle":"black","backgroundColor":"#FFFFFF","list":[{"pagePath":"pages/mainindex/mainindex","text":"首页","iconPath":"static/tabbar/indexpage.png","selectedIconPath":"static/tabbar/indexpage_fill.png"},{"pagePath":"pages/mainstroage/mainstroage","text":"发放","iconPath":"static/tabbar/add.png","selectedIconPath":"static/tabbar/add_fill.png"},{"pagePath":"pages/mainme/mainme","text":"我的","iconPath":"static/tabbar/me.png","selectedIconPath":"static/tabbar/me_fill.png"}]},"splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"xinguan2020-storage","compilerVersion":"2.5.8","entryPagePath":"pages/index/index","networkTimeout":{"request":6000,"connectSocket":6000,"uploadFile":6000,"downloadFile":6000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":"新冠-物资管理系统"}},{"path":"/pages/mainindex/mainindex","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"新冠-物资管理系统"}},{"path":"/pages/mainstroage/mainstroage","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"发放","enablePullDownRefresh":true}},{"path":"/pages/mainme/mainme","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":true}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登陆"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes}}}});
