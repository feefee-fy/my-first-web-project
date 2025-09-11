// Index.ets
import webview from '@ohos.web.webview';
import promptAction from '@ohos.promptAction';

@Entry
@Component
struct Index {
  // 在这里替换成你的 Vercel 网址
  @State url: string = 'www.mypico.xyz';
  // 构建UI界面
  build() {
    Column() {
      // 1. 显示一个按钮
      Button('打开我的个人网站')
        .width(250) // 稍微调宽一点以适应文字
        .height(60)
        .fontSize(20)
        .margin(20)
        .fontColor(Color.White)
        .backgroundColor('#007AFF') // 给按钮一个漂亮的蓝色
        .onClick(() => { // 2. 绑定点击事件
          // 当按钮被点击时，调用这个方法
          this.openWebPage();
        })

      // 3. Web组件容器 - 初始为空，点击按钮后才会加载
      if (this.showWebView) {
        Web({ src: this.url, controller: this.webController })
          .width('100%')
          .height('100%')
          .onPageEnd(() => {
            // 网页加载完成后的回调
            promptAction.showToast({ message: '我的网站加载完成！', duration: 2000 });
          })
      }
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center) // 让按钮在Column中居中
    .backgroundColor('#F5F5F5') // 给页面一个浅灰色背景
  }

  // 控制Web组件是否显示的变量
  @State showWebView: boolean = false;
  // Web组件控制器，用于执行刷新、后退等操作
  webController: webview.WebviewController = new webview.WebviewController();

  // 按钮点击后触发的方法
  openWebPage() {
    // 将showWebView设置为true，条件渲染会让Web组件显示出来
    this.showWebView = true;

    // 显示一个加载提示
    promptAction.showToast({ message: '正在加载网站...', duration: 1000 });
  }
}