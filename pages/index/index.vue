<template>
  <view>
    <view :style="{ height: calculateWindowHeight }">
      <scroll-view class="container" :scroll-anchoring="true" :scroll-animation-duration="2000" :show-scrollbar="false" scroll-with-animation scroll-y>
        <view class="banner">
          <!-- <image src="https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg" mode="" class="bg"></image> -->
          <swiper class="bg" id="ads" autoplay circular easing-function="easeOutCubic" :interval="3000" indicator-dots>
            <swiper-item v-for="(item, index) in ads" :key="index">
              <image class="bg" :src="item.image" fade-show="true" @tap="goImageDetail(item)"></image>
            </swiper-item>
          </swiper>
          <view class="intro">
            <view class="note">好喝</view>
          </view>
        </view>
        <view class="content">
          <view class="entrance">
            <!-- <view class="headerbar">我是xxx</view> -->
            <view class="headerbar">
              <view class="text"> 您好，{{ isLogin ? member.nickname : '游客' }} </view>
            </view>

            <view class="item" @tap="takein">
              <image src="/static/images/index/store.png" class="icon"></image>
              <view class="title">自取</view>
            </view>
            <view class="item" @tap="takeout">
              <image src="/static/images/index/delivery-truck.png" class="icon"></image>
              <view class="title">外卖</view>
            </view>
          </view>
          <view class="info">
            <view class="integral_section" @tap="integrals">
              <view class="top">
                <!-- 积分优先取缓存中的值 -->
                <text class="title">我的积分</text>
                <text class="value">{{ pointNum || '暂未登录' }}</text>
              </view>
              <view class="bottom">
                进入积分商城兑换桑格利亚券及周边好礼
                <view class="iconfont iconarrow-right"></view>
              </view>
            </view>
            <view class="qrcode_section" @tap="memberCode">
              <image src="/static/images/index/qrcode.png"></image>
              <text>会员码</text>
            </view>
          </view>
          <view class="navigators">
            <view class="left">
              <view class="grid flex-column just-content-center" @click="showNaviToast">
                <view class="d-flex align-items-center">
                  <image src="/static/images/index/csc.png" class="mark-img"></image>
                  <view class="font-size-sm text-color-base">桑格利亚的茶商城</view>
                </view>
                <view class="text-color-assist" style="margin-left: 40rpx; font-size: 20rpx">优质茶礼盒，网红零食</view>
              </view>
              <view class="grid justify-content-end align-items-end">
                <image src="/static/images/index/yzclh.png" class="yzclh-img" mode="heightFix"></image>
              </view>
            </view>
            <view class="right">
              <view class="tea-activity" @tap="invite">
                <image src="/static/images/index/mcsb.png" class="mark-img"></image>
                <view>买茶送包</view>
                <view class="right-img">
                  <image src="/static/images/index/mcsb_bg.png" mode="widthFix"></image>
                </view>
              </view>
              <view class="member-gifts" @tap="packages">
                <image src="/static/images/index/hyjb.png" class="mark-img"></image>
                <view>会员劵包</view>
                <view class="right-img">
                  <image src="/static/images/index/hyjb_bg.png" mode="widthFix"></image>
                </view>
              </view>
            </view>
          </view>
          <view class="member-news" @click="showNaviToast">
            <view class="header">
              <view class="title">会员新鲜事</view>
              <view class="iconfont iconRightbutton"></view>
            </view>
            <view class="list">
              <view class="item">
                <image src="https://img-shop.qmimg.cn/s23107/2020/04/27/0039bf41c9ebd50a2c.jpg"></image>
                <view class="title">"梅"你不行 | 霸气杨梅清爽回归</view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import { localInfo } from '@/api/index';
  import { calculateWindowHeight as calHeight } from '../../common/getwindowHeight';

  export default {
    data() {
      return {
        pointNum: '',
        // 右侧商品列表最上方轮播图广告图片链接
        ads: [
          { image: 'https://img-shop.qmimg.cn/s23107/2020/04/27/4ebdb582a5185358c4.jpg?imageView2/2/w/600/h/900' },
          { image: 'https://images.qmai.cn/s23107/2020/05/08/c25de6ef72d2890630.png?imageView2/2/w/600/h/900' },
          { image: 'https://img-shop.qmimg.cn/s23107/2020/04/10/add546c1b1561f880d.jpg?imageView2/2/w/600/h/600' },
          { image: 'https://images.qmai.cn/s23107/2020/04/30/b3af19e0de8ed42f61.jpg?imageView2/2/w/600/h/600' },
          { image: 'https://img-shop.qmimg.cn/s23107/2020/04/17/8aeb78516d63864420.jpg?imageView2/2/w/600/h/600' },
        ],
        statusBar: '',
        windowHeight: '',
        noTitle: '',
      };
    },
    computed: {
      ...mapState(['member']),
      ...mapGetters(['isLogin']),
      calculateWindowHeight() {
        return calHeight(this.windowHeight, this.statusBar); // 可使用窗口高度
      },
    },
    onShow() {
      // #ifdef MP-ALIPAY

      my.hideBackHome();

      // #endif
      this.pointNum = localInfo('userinfo').pointNum;
      console.log('index onLoad', localInfo('userinfo').pointNum);
    },
    mounted() {
      this.windowHeight = uni.getSystemInfoSync().windowHeight;
    },
    methods: {
      showNaviToast() {
        uni.showToast({ title: '敬请期待' });
      },
      takein() {
        this.$store.commit('SET_ORDER_TYPE', 'takein');
        uni.switchTab({
          url: '/pages/menu/menu',
        });
      },
      takeout() {
        if (!this.isLogin) {
          uni.navigateTo({ url: '/pages/login/login' });
          return;
        }
        uni.navigateTo({
          url: '/pages/address/address?is_choose=true',
        });
      },
      integrals() {
        if (!this.isLogin) {
          uni.navigateTo({ url: '/pages/login/login' });
          return;
        }
        uni.navigateTo({
          url: '/pages/integrals/integrals',
        });
      },
      packages() {
        uni.navigateTo({
          url: '/pages/packages/index',
        });
      },
      memberCode() {
        if (!this.isLogin) {
          uni.navigateTo({ url: '/pages/login/login' });
          return;
        }
        uni.navigateTo({
          url: '/pages/mine/member-code',
        });
      },
      invite() {
        uni.navigateTo({
          url: '/pages/activities/invite',
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  /* #ifdef H5 */
  page {
    height: auto;
    min-height: 100%;
  }
  /* #endif */
  .container {
    height: 100%;
    overflow: hidden;
  }
  .banner {
    position: static;
    width: 100%;
    //height: 650rpx;
    height: 50vh;

    .bg {
      width: 100%;
      //  height: 650rpx;
      height: 50vh;
    }

    .intro {
      position: absolute;
      top: calc(70rpx + var(--status-bar-height));
      right: 40rpx;
      color: #e1e4b8;
      display: flex;
      writing-mode: vertical-lr;
      flex-direction: column;

      .greet {
        font-size: $font-size-lg;
        margin-bottom: 10rpx;
      }

      .note {
        font-size: x-large;
      }
    }
  }

  .content {
    padding: 0 30rpx;
  }

  .entrance {
    position: relative;
    margin-top: -60rpx;
    margin-bottom: 30rpx;
    border-radius: 10rpx;
    background-color: #fafafa;
    box-shadow: $box-shadow;
    padding: 30rpx 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35vh;
    .headerbar {
      .text {
        padding: 15rpx 0 0rpx 25rpx;
      }
      background-color: #fafafa;
      font-size: 14px;
      font-weight: 300;
      border-radius: 10rpx 10rpx 0 10rpx;
      color: #4f6237;
      //opacity: 0.1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    .item {
      margin-top: 30rpx;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;

      &:nth-child(1):after {
        content: '';
        position: absolute;
        width: 1rpx;
        background-color: #ddd;
        right: 0;
        height: 100%;
        transform: scaleX(0.5) scaleY(0.8);
      }

      .icon {
        width: 156rpx;
        height: 156rpx;
        margin: 20rpx;
      }

      .title {
        font-size: 40rpx;
        color: $color-primary;
        font-weight: 400;
      }
    }
  }

  .info {
    position: relative;
    margin-bottom: 30rpx;
    border-radius: 10rpx;
    background-color: #ffffff;
    box-shadow: $box-shadow;
    padding: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    .integral_section {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .top {
        display: flex;
        align-items: center;

        .title {
          color: $text-color-base;
          font-size: $font-size-base;
          margin-right: 10rpx;
        }
        .value {
          font-size: 44rpx;
          font-weight: bold;
        }
      }

      .bottom {
        font-size: $font-size-sm;
        color: $text-color-assist;
        display: flex;
        align-items: center;
      }
    }

    .qrcode_section {
      color: $color-primary;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: $font-size-sm;

      image {
        width: 40rpx;
        height: 40rpx;
        margin-bottom: 10rpx;
      }
    }
  }

  .navigators {
    width: 100%;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    background-color: #ffffff;
    box-shadow: $box-shadow;
    padding: 20rpx;
    display: flex;
    align-items: stretch;

    .left {
      width: 340rpx;
      margin-right: 20rpx;
      display: flex;
      padding: 0 20rpx;
      flex-direction: column;
      font-size: $font-size-sm;
      color: $text-color-base;
      background-color: #f2f2e6;

      .grid {
        height: 50%;
        display: flex;
      }
    }

    .right {
      width: 290rpx;
      display: flex;
      flex-direction: column;

      .tea-activity,
      .member-gifts {
        width: 100%;
        display: flex;
        padding: 20rpx;
        font-size: $font-size-sm;
        color: $text-color-base;
        align-items: center;
        position: relative;
      }

      .tea-activity {
        background-color: #fdf3f2;
        margin-bottom: 20rpx;
      }

      .member-gifts {
        background-color: #fcf6d4;
      }

      .right-img {
        flex: 1;
        position: relative;
        margin-left: 20rpx;
        margin-right: -20rpx;
        margin-bottom: -20rpx;
        display: flex;
        align-items: flex-end;

        image {
          width: 100%;
        }
      }
    }

    .mark-img {
      width: 30rpx;
      height: 30rpx;
      margin-right: 10rpx;
    }

    .yzclh-img {
      height: 122.96rpx;
      width: 214.86rpx;
    }
  }

  .member-news {
    width: 100%;
    margin-bottom: 30rpx;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 0;

      .title {
        font-size: $font-size-lg;
        font-weight: bold;
      }

      .iconfont {
        font-size: 52rpx;
        color: $text-color-assist;
      }
    }

    .list {
      width: 100%;
      display: flex;
      flex-direction: column;

      .item {
        width: 100%;
        height: 240rpx;
        position: relative;

        image {
          width: 100%;
          height: 100%;
          border-radius: 8rpx;
        }

        .title {
          position: relative;
          font-size: 32rpx;
          font-weight: 500;
          width: 100%;
          top: -70rpx;
          left: 16rpx;
          color: #ffffff;
        }
      }
    }
  }
</style>
