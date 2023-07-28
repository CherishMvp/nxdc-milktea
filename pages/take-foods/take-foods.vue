<template>
  <view class="wrapper">
    <!-- #ifdef MP-ALIPAY|| MP-WEIXIN -->
    <uni-nav-bar :border="false" :height="calculateStatusBarHeight"></uni-nav-bar>
    <view class="header" :style="[divStyle]">
      <view class="w-100 font-size-lg text-color-base text-truncate">{{ order.store.name }}</view>
      <view class="d-flex justify-content-center align-items-center" style="margin-left: 20rpx">
        <image src="/static/images/order/mobile.png" style="width: 60rpx; height: 60rpx; margin-right: 30rpx"></image>
        <image src="/static/images/order/navigation.png" style="width: 60rpx; height: 60rpx"></image>
      </view>
    </view>
    <!-- #endif -->
    <view :style="{ height: calculateWindowHeight }">
      <scroll-view
        :refresher-triggered="refreshTrigger"
        :refresher-enabled="true"
        @refresherrefresh="onRefresh"
        refresher-background="#ffff"
        class="container"
        :scroll-anchoring="true"
        :scroll-animation-duration="2000"
        :show-scrollbar="false"
        scroll-with-animation
        scroll-y
      >
        <view v-if="!Object.keys(order).length" class="d-flex w-100 h-100 flex-column just-content-center align-items-center">
          <image src="/static/images/loading.gif" class="drinks-img"></image>
          <view class="tips d-flex flex-column align-items-center font-size-base text-color-assist">
            <view>您还没有点单</view>
            <view>快去犒劳一下自己吧~</view>
          </view>
          <button type="primary" class="drink-btn" size="default" @tap="menu">去点餐</button>
          <view class="font-size-sm text-color-primary" @tap="orders">查看历史订单</view>
        </view>
        <!-- 展示点完的订单信息（包括待取餐等信息） -->
        <template v-else>
          <view class="order-box">
            <view class="bg-white">
              <view class="section">
                <!-- #ifdef MP-WEIXIN1 -->
                <!-- store info begin -->
                <list-cell :hover="false">
                  <view class="w-100 d-flex align-items-center">
                    <view class="d-flex flex-column w-60">
                      <view class="w-100 font-size-lg text-color-base text-truncate">{{ order.store.name }}</view>
                    </view>
                    <view class="d-flex justify-content-end align-items-center w-40">
                      <image src="/static/images/order/mobile.png" style="width: 60rpx; height: 60rpx; margin-right: 30rpx"></image>
                      <image src="/static/images/order/navigation.png" style="width: 60rpx; height: 60rpx"></image>
                    </view>
                  </view>
                </list-cell>
                <!-- store info end -->
                <!-- #endif -->
                <list-cell :hover="false" padding="50rpx 30rpx">
                  <view class="w-100 d-flex flex-column" style="margin-top: 40rpx">
                    <view class="d-flex align-items-center just-content-center" v-if="order.typeCate == 1">
                      <view class="sort-num">{{ order.sort_num }}</view>
                    </view>
                    <!-- steps begin：展示订单制作状态；typeCate用来区分外卖和自取的两种订单状态 -->
                    <view class="d-flex just-content-center">
                      <view class="steps d-flex flex-column" :class="{ 'w-80': order.typeCate == 1, 'w-100': order.typeCate == 2 }">
                        <view class="steps__img-column">
                          <view class="steps__img-column-item">
                            <image src="/static/images/order/ordered_selected.png" v-if="order.status >= 1"></image>
                            <image src="/static/images/order/ordered_selected.png" v-else></image>
                          </view>
                          <view class="steps__img-column-item" :class="{ active: order.status >= 2 }">
                            <image src="/static/images/order/production_selected.png" v-if="order.status >= 2"></image>
                            <image src="/static/images/order/production.png" v-else></image>
                          </view>
                          <view class="steps__img-column-item" :class="{ active: order.status >= 3 }" v-if="order.typeCate == 2">
                            <image src="/static/images/order/delivery_selected.png" v-if="order.status >= 3"></image>
                            <image src="/static/images/order/delivered.png" v-else></image>
                          </view>
                          <view class="steps__img-column-item" :class="{ active: order.status >= 4 }">
                            <image src="/static/images/order/delivered_selected.png" v-if="order.status >= 4"></image>
                            <image src="/static/images/order/delivered.png" v-else></image>
                          </view>
                        </view>
                        <view class="steps__text-column">
                          <view class="steps__text-column-item" :class="{ active: order.status >= 1 }">
                            <view class="steps__column-item-line bg-transparent"></view>
                            <view class="steps__text-column-item-text">已下单</view>
                            <view class="steps__column-item-line"></view>
                          </view>
                          <view class="steps__text-column-item" :class="{ active: order.status >= 2 }">
                            <view class="steps__column-item-line"></view>
                            <view class="steps__text-column-item-text">制作中</view>
                            <view class="steps__column-item-line"></view>
                          </view>
                          <view class="steps__text-column-item" :class="{ active: order.status >= 3 }" v-if="order.typeCate == 2">
                            <view class="steps__column-item-line"></view>
                            <view class="steps__text-column-item-text">配送中</view>
                            <view class="steps__column-item-line"></view>
                          </view>
                          <view class="steps__text-column-item" :class="{ active: order.status >= 4 }">
                            <view class="steps__column-item-line"></view>
                            <view class="steps__text-column-item-text">
                              {{ order.typeCate == 2 ? '已送达' : '请取餐' }}
                            </view>
                            <view class="steps__column-item-line bg-transparent"></view>
                          </view>
                        </view>
                      </view>
                    </view>
                    <!-- steps end -->
                    <view v-if="order.status <= 1" class="d-flex just-content-center align-items-center font-size-base text-color-assist mb-40"> 您前面还有 <text class="text-color-primary mr-10 ml-10">4</text> 单待制作 </view>
                    <!-- goods begin：点单后的商品信息有哪些 -->
                    <view class="w-100 d-flex flex-column position-relative mt-30 mygoods" style="margin-bottom: -40rpx">
                      <view class="w-100 d-flex align-items-center mb-40 lastItem" v-for="(good, index) in order.goods" :key="index">
                        <view class="d-flex flex-column w-60 overflow-hidden">
                          <view class="font-size-lg text-color-base mb-10 text-truncate">{{ good.name }}</view>
                          <view style="margin-bottom: 20rpx" class="font-size-sm text-color-assist text-truncate">{{ good.props_text }}</view>
                        </view>
                        <view class="d-flex w-40 align-items-center justify-content-between pl-30">
                          <view class="font-size-base text-color-base">x{{ good.number }}</view>
                          <view class="font-size-base text-color-base font-weight-bold">￥{{ good.price }}</view>
                        </view>
                      </view>
                    </view>
                    <!-- goods end -->
                  </view>
                </list-cell>
              </view>
              <view class="section">
                <!-- payment and amount begin -->
                <list-cell :hover="false" padding="50rpx 30rpx">
                  <view class="w-100 d-flex flex-column">
                    <view class="pay-cell">
                      <view>支付方式</view>
                      <view class="font-weight-bold">{{ order.pay_mode }}</view>
                    </view>
                    <view class="pay-cell">
                      <view>金额总计</view>
                      <!-- 可以直接在后端计算，得到一个总的商品价格，这里用前端方式计算；算出当前购物车中的商品总价 -->
                      <view class="font-weight-bold">￥{{ getCartGoodsPrice }}</view>
                      <!-- <view class="font-weight-bold">￥{{ order.amount }}</view> -->
                    </view>
                  </view>
                </list-cell>
                <!-- payment and amount end -->
              </view>
              <view class="section">
                <!-- order info begin -->
                <list-cell :hover="false" padding="50rpx 30rpx">
                  <view class="w-100 d-flex flex-column">
                    <view class="pay-cell">
                      <view>下单时间</view>
                      <view class="font-weight-bold">{{ $util.formatDateTime(order.created_at) }}</view>
                    </view>
                    <view class="pay-cell">
                      <view>下单门店</view>
                      <view class="font-weight-bold">{{ order.store.name }}</view>
                    </view>
                    <view class="pay-cell">
                      <view>支付方式</view>
                      <view class="font-weight-bold">{{ order.pay_mode }}</view>
                    </view>
                    <view class="pay-cell">
                      <view>订单号</view>
                      <view class="font-weight-bold">{{ order.order_no }}</view>
                    </view>
                  </view>
                </list-cell>
                <!-- order info end -->
              </view>
              <!-- order other info begin -->
              <list-cell :hover="false" padding="50rpx 30rpx 20rpx" last>
                <view class="w-100 d-flex flex-column">
                  <view class="pay-cell">
                    <view>取单号</view>
                    <view class="font-weight-bold">{{ order.sort_num }}</view>
                  </view>
                  <view class="pay-cell">
                    <view>享用方式</view>
                    <view class="font-weight-bold">自取</view>
                  </view>
                  <view class="pay-cell">
                    <view>取餐时间</view>
                    <view class="font-weight-bold">立即取餐</view>
                  </view>
                  <view class="pay-cell">
                    <view>完成制作时间</view>
                    <view class="font-weight-bold">{{ order.productioned_time }}</view>
                  </view>
                  <view class="pay-cell">
                    <view>备注</view>
                    <view class="font-weight-bold">{{ order.postscript }}</view>
                  </view>
                </view>
              </list-cell>
              <!-- order other info end -->
            </view>
          </view>
        </template>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import listCell from '@/components/list-cell/list-cell';
  import { mapState, mapMutations, mapGetters } from 'vuex';
  import orders from '@/api/orders';
  import { calculateWindowHeight as calHeight } from '../../common/getwindowHeight';

  export default {
    components: {
      listCell,
    },
    data() {
      return {
        cart: {},
        statusBar: '',
        windowHeight: '',
        divStyle: {},
        refreshTrigger: false,
      };
    },
    onShow() {
      console.log('takein onshow', Object.keys(this.order).length);
      // this.cart = uni.getStorageSync('cart');
      this.cart = this.currentCart();
      // TODO:实际上order信息都要从后端返回。只有支付成功后，才会有这个order订单信息
      // 订单数据不能用缓存去做，直接读取服务器就行了。
      // 可以先从vuex读取是否有数据
      if (!Object.keys(this.order).length) {
        console.log('vuex无订单数据，直接从服务器获取', this.order);
        // 则直接从服务器或者缓存中读取
        // 2023-07-28 18:02:00 暂时采用从vuex中获取，还需要组合一下内容
        let orderInfo = this.orderType == 'takein' ? orders[0] : orders[1];
        // 此处猜测status为商品的制作状态。4为完成，1为刚刚开始的状态；自取只有，1.2.4三种状态；外卖有1.2.3.4
        orderInfo = Object.assign(orderInfo, { status: 5 });
        orderInfo.goods = this.cart;
        console.log('目前的订单有：', orderInfo);
        this.SET_ORDER(orderInfo);
      } else {
        this.order.goods = this.cart;
        this.SET_ORDER(this.order);
      }
    },
    onPullDownRefresh() {
      uni.startPullDownRefresh({
        success: (result) => {
          console.log('refresh', result);
        },
      });
      setTimeout(() => {
        uni.stopPullDownRefresh({
          success: (result) => {
            console.log('stop refresh');
          },
        });
      }, 2000);
    },
    onHide() {
      console.log('takein hide');
    },
    mounted() {
      this.windowHeight = uni.getSystemInfoSync().windowHeight;
      this.statusBar = uni.getSystemInfoSync().statusBarHeight;
      const rect = uni.getMenuButtonBoundingClientRect();
      // 这里的left要注意有padding
      this.divStyle = {
        left: `20rpx`,
        top: `${rect.top}px`,
        /*会员码位置样式属性；left位置需要减去胶囊的宽度 */
      };
      console.log('this.divStyle', this.divStyle);
    },
    computed: {
      ...mapState(['order', 'orderType']),
      getCartGoodsPrice() {
        //计算购物车总价,暂时从vue心中获取
        // this.cart = uni.getStorageSync('cart');
        this.cart = this.currentCart();
        if (this.cart) return this.cart.reduce((acc, cur) => acc + cur.number * cur.price, 0);
        else return 0;
      },
      calculateWindowHeight() {
        return calHeight(this.windowHeight, this.statusBar); // 可使用窗口高度
      },
      calculateStatusBarHeight() {
        return this.statusBar + 'px';
      },
    },
    methods: {
      ...mapMutations(['SET_ORDER']),
      ...mapGetters(['currentCart']),
      onRefresh() {
        this.refreshTrigger = true; //下拉刷新已经被触发
        console.log('onRefresh ing', this.refreshTrigger);
        setTimeout(() => {
          this.refreshTrigger = false; //下拉刷新已经被触发
          console.log('onRefresh over', this.refreshTrigger);
        }, 3000);
      },
      orders() {
        if (!this.$store.getters.isLogin) {
          uni.navigateTo({ url: '/pages/login/login' });
          return;
        }
        uni.navigateTo({
          url: '/pages/orders/orders',
        });
      },
      menu() {
        uni.switchTab({
          url: '/pages/menu/menu',
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  /* #ifdef H5 */
  page {
    min-height: 100%;
    background-color: $bg-color;
  }
  /* #endif */
  .mygoods {
    .lastItem {
      border-bottom: 0.5px solid #e6e7e8;
      &:nth-last-child(1) {
        border-bottom: 0 !important;
      }
    }
  }

  .header {
    position: absolute;
    z-index: 999;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 20rpx;
    /* 设置div的样式，如宽、高、背景色等 */
  }
  .wrapper {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
  .container {
    height: 100%;
    overflow: hidden;
  }
  .order-box {
    // padding: 0 20rpx 20rpx 20rpx;
    /* #ifdef H5 */
    margin-bottom: 100rpx;
    /* #endif */
  }

  .drinks-img {
    width: 260rpx;
    height: 260rpx;
  }

  .tips {
    margin: 60rpx 0 80rpx;
    line-height: 48rpx;
  }

  .drink-btn {
    width: 320rpx;
    border-radius: 50rem !important;
    margin-bottom: 40rpx;
    font-size: $font-size-base;
    line-height: 3;
  }

  @mixin arch {
    content: '';
    position: absolute;
    background-color: $bg-color;
    width: 30rpx;
    height: 30rpx;
    bottom: -15rpx;
    z-index: 10;
    border-radius: 100%;
  }

  .section {
    position: relative;

    &::before {
      @include arch;
      left: -15rpx;
    }

    &::after {
      @include arch;
      right: -15rpx;
    }
  }

  .pay-cell {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: $font-size-base;
    color: $text-color-base;
    margin-bottom: 40rpx;

    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }

  .sort-num {
    font-size: 64rpx;
    font-weight: bold;
    color: $text-color-base;
    line-height: 2;
  }

  .steps__img-column {
    display: flex;
    margin: 30rpx 0;

    .steps__img-column-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      image {
        width: 80rpx;
        height: 80rpx;
      }
    }
  }

  .steps__text-column {
    display: flex;
    margin-bottom: 40rpx;

    .steps__text-column-item {
      flex: 1;
      display: inline-flex;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $font-size-base;
      color: $text-color-assist;

      &.active {
        color: $text-color-base;
        font-weight: bold;

        .steps__column-item-line {
          background-color: $text-color-base;
        }
      }

      .steps__column-item-line {
        flex: 1;
        height: 2rpx;
        background-color: #919293;
        transform: scaleY(0.5);
      }

      .steps__text-column-item-text {
        margin: 0 8px;
      }
    }
  }
</style>
