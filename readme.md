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

# 2023-07-21 14:48:48

- 对于自定义组件图标使用，最好不要使用相对路径，应该要放在 static 下绝对路径使用，打包时候才能正常使用

# 2023-07-21 16:46:18

- flex-start 和 start 作用是一样的，没什么区别。 flex-start 是早期的写法，后来规范后，和 grid 一样统一用了 start 来表示 如果你希望兼容性好点，就用 flex-start ，否则就用 start

# 2023-07-22 19:18:41

- 有一个问题，当使用 unirequest 读取内容的时候，左侧侧边栏的内容无法实时显示，如果直接用 json 文件的话可以

# 2023-07-28 15:48:24

- unirequest 的请求异步问题，可以通过返回一个 promise 对象解决。
- 对于改动商品价格后，旧的购物车仍然存在缓存的问题，后续再修改。
- 优先解决订单结算购物车内容。

# 2023-07-28 17:49:23

- vuex 跟 pinia 不一样，state、getters 的数据初始化要在 vue 中的 computed 进行，其他如 mutation、actions 的此类要在 methods 中初始化。（computed 和 methods 要一一对应的意思）

- 在 uniapp 的 vue 中，当父组件传值给子组件时，需要注意在子组件的 mounted 处理相关 props 的逻辑。即，记住一点，如果是 uniapp 相关的生命周期处理事件，则要在其对应的生命周期中处理，如果是 vue 相关的，则要在 vue 的生命周期中处理。典型的，如果一个组件在原先是通过 onload 来处理数据，如果数据修改成从父组件传来，则需要将在 mounted 中处理相对应的逻辑赋值。

# 2023-07-31 17:09:37

- 需要注意，在 pay 和 takefood 页面，当前的手机号码是固定的，手机号码当前作为用户 ID，后期也可以考虑使用 openID，
- 逻辑 1：当 pay 页面付款时，要加上当前的手机号码信息和 payStatus 订单状态信息。进入 takefood 页面时，读取出当前手机号码用户中，payStatus 为 1 即制作中或者已下单的最近的一单信息。
- 逻辑 2：对于前面还有几单制作中的数据，可以通过：以当前订单编号为基准，根据该编号的 createAt 字段，往前推的所有数据中，统计出所有 payStatus 为 1 即制作中的数据条数。

# 2023-07-31 21:29:53

- 上传后，要修改下线上地址，即可以将本地地址和线上地址写在.env 中，根据环境变量来选择

# 2023-07-31 22:00:50

- 修改本地线上的 api，根据情况选择。
- 订单取餐号要进行优化，当前使用的是：星期开头字母+分钟数+秒数，这样容易重复，需要改进
