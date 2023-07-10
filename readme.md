**特别声明：本项目中的展示图片归 Only One 桑格利亚所有。**

### 源码地址

github 地址: [https://github.com/tinypuppet/nxdc-milktea](https://github.com/tinypuppet/nxdc-milktea)

gitee 地址：[https://gitee.com/tinypuppet/nxdc-milktea](https://gitee.com/tinypuppet/nxdc-milktea)

uni-app 插件市场地址:[https://ext.dcloud.net.cn/plugin?id=1807](https://ext.dcloud.net.cn/plugin?id=1807)

### 简介

一套仿 Only One 桑格利亚小程序的项目模板。

如果你喜欢这套模板，请给个 star 呗~

### 个人说明

如有问题，请联系 QQ 或微信`327722714`。

### 说明

1. 本项目包含：

   - 首页
   - 点餐（自取和外卖两种方式，有基本的点餐逻辑处理）
   - 取餐
   - 我的
   - 积分商城
   - 积分商城详情页
   - 积分签到
   - 会员码
   - 我的卡券
   - 收货地址
   - 我的资料
   - 我的订单
   - 订单详情
   - 余额
   - 会员卷包
   - 卷包详情
   - 订单评价
   - 买茶送包
   - 更多服务
   - 开发票
   - 礼品卡

2. 所有数据都是静态的，保存在 api 文件夹下。

### 展示效果

| 首页 | 点餐 | 饮品详情 | 我的 | 取餐 |
| --- | --- | --- | --- | --- |
| ![](https://img.cdn.aliyun.dcloud.net.cn/stream/plugin_screens/fafaa180-94f3-11ea-9423-8760f636375f_0.jpg?v=1590130842) | ![](https://img.cdn.aliyun.dcloud.net.cn/stream/plugin_screens/fafaa180-94f3-11ea-9423-8760f636375f_1.jpg?v=1590130842) | ![](https://img.cdn.aliyun.dcloud.net.cn/stream/plugin_screens/fafaa180-94f3-11ea-9423-8760f636375f_2.jpg?v=1590130842) | ![](https://img.cdn.aliyun.dcloud.net.cn/stream/plugin_screens/fafaa180-94f3-11ea-9423-8760f636375f_3.jpg?v=1590130842) | ![](https://img.cdn.aliyun.dcloud.net.cn/stream/plugin_screens/fafaa180-94f3-11ea-9423-8760f636375f_4.jpg?v=1590130842) |

# 2023-07-04 09:16:50

- css 在 h5 下修改`.uni-scroll-view, .uni-scroll-view-content { width: 100%; height: 100%; margin-bottom: 30px; }`

# 2023-07-05 17:10:47

- page.json 中这样配置才可以确保支付宝小程序页面不被滚动` { "path": "pages/menu/menu", "style": { // #ifdef MP-WEIXIN "navigationBarTitleText": "Only One 桑格利亚", // #endif "navigationBarTextStyle": "black", "navigationBarBackgroundColor": "#ffffff", "navigationStyle": "custom", "mp-alipay": { "transparentTitle": "always", "titlePenetrate": "YES" }, "disableScroll": true } },`
- 重点看 wechat 和 ali 的差异化配置项注意点`https://uniapp.dcloud.net.cn/collocation/pages.html#tabbar`

# 2023-07-05 23:15:33

- （vue2）uni-app/小程序绑定 style 对象渲染结果是[object Object]，解决办法：用 `[ ]` 包裹着就行

# 2023-07-06 11:53:26(多查询官方文档)

- 新版侧边栏和分类栏方案 1:`https://blog.csdn.net/weixin_44816309/article/details/106869588`
- 方案 2：`https://blog.csdn.net/caihuahuahua/article/details/119488894`
- 方案 3：`https://blog.csdn.net/LizequaNNN/article/details/124433574`
- 在支付宝小程序中，scroll-view 的滚动速度可以设置，具体参考官方定义：`https://opendocs.alipay.com/mini/component/scroll-view`(多查询官方文档)

# 2023-07-08 15:04:53(要多思考)

- 在支付宝小程序中，如果需要在自定义组件中使用样式（特别是 scss 嵌套等），则不能直接在该组件上直接使用 `class="myclass"`这种，否则如果有用到`.myclass { .itemA {}}`。。诸如此类的样式，会读取不到，正确做法是在自定义组件下再嵌套一个 div，将`class="myclass"`写在该 div 上。形成 `<customCompoennt> <div class="myclass" > xxxxx详细内容 </div>`
- 同时兼容支付宝和微信小程序，使用`@tap`绑定事件，有概率出现在 ali 小程序中失效，如有点击事件失效的，可以使用`@click`绑定事件
  - 参考链接:`https://juejin.cn/post/7199542948307648569`;`https://www.jianshu.com/p/d815910b0830`
- qrcode 改用 uv 的组件库`https://www.uvui.cn/components/qrcode.html`

# 2023-07-10 16:39:15

- 像背景颜色这种地方，要在`@import '~@/static/style/app.scss';`里面修改
- alipay 设置下拉刷新时，需要设置`"allowsBounceVertical": "YES",`以及在对应的页面开启下拉刷新功能
