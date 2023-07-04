<template>
  <view style="padding: 30rpx; background-color: #faf">
    <u-navbar title="演示" :is-back="false" />
    <button style="margin-top: 100rpx" open-type="getAuthorize" scope="userInfo" @getAuthorize="getOpenUserInfo" @error="getInfoError"> 个人信息授权 </button>
    <button style="margin-top: 100rpx" open-type="getAuthorize" scope="phoneNumber" @getAuthorize="getPhoneNumber" error="getPhoneError"> 手机号码授权 </button>
    <!-- 吸底工具栏 -->
    <view class="toolbar" :style="{ paddingBottom: calculateMarginBottom }">
      <view class="total-pay symbol">
        <text class="number">99.00</text>
      </view>
      <view class="button" :class="{ disabled: true }"> 提交订单 </view>
    </view>
  </view>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        authCode: '',
        // 获取屏幕边界到安全区域距离
        safeAreaInsets: '',
      };
    },
    computed: {
      calculateMarginBottom() {
        return this.safeAreaInsets?.bottom + 'px'; // 设置底部外边距的数值
      },
    },
    methods: {
      // 触发
      getOpenUserInfo() {
        uni.getOpenUserInfo({
          success: (res) => {
            let userinfo = JSON.parse(res.response).response;
            console.log(userinfo);
            uni.showToast({
              title: '授权个人信息成功',
            });
          },
          fail: (res) => {
            uni.showToast({
              title: '授权个人信息失败',
            });
          },
        });
      },
      // 授权失败回调
      getInfoError() {
        uni.showToast({
          title: '取消授权个人信息',
        });
      },
      getPhoneNumber() {
        // #ifdef MP-ALIPAY
        my.getAuthCode({
          scopes: ['auth_user'],
          // 主动授权：auth_user，静默授权：auth_base或者其它scope。如需同时获取用户多项授权，可在 scopes 中传入多个 scope 值。
          success: (res) => {
            if (res.authCode) {
              // 认证成功
              // 调用自己的服务端接口，让服务端进行后端的授权认证，并且利用session，需要解决跨域问题
              console.log('auth code: ', res.authCode);
              this.authCode = res.authCode;
            }
          },
        });

        // #endif
        my.getPhoneNumber({
          scopes: 'auth_user',
          success: (res) => {
            let encryptedData = JSON.parse(res.response);
            console.log('encryptedData', encryptedData);
            uni.showToast({
              title: '获得手机号码加密数据成功',
            });
            uni.request({
              url: 'http://127.0.0.1:3000/getMemberMobile',
              data: encryptedData,
            });
          },
          fail: (res) => {
            uni.showToast({
              title: '授权手机号码失败',
            });
          },
        });
      },
      getPhoneError() {
        uni.showToast({
          title: '取消手机号码授权',
        });
      },
    },
    watch: {},

    // 页面周期函数--监听页面加载
    onLoad() {},
    mounted() {
      this.safeAreaInsets = uni.getSystemInfoSync().safeAreaInsets;
      console.log('safeAreaInsets', this.safeAreaInsets?.bottom);
    },
    // 页面周期函数--监听页面初次渲染完成
    onReady() {},
    // 页面周期函数--监听页面显示(not-nvue)
    onShow() {},
    // 页面周期函数--监听页面隐藏
    onHide() {},
    // 页面周期函数--监听页面卸载
    onUnload() {},
    // 页面处理函数--监听用户下拉动作
    // onPullDownRefresh() { uni.stopPullDownRefresh(); },
    // 页面处理函数--监听用户上拉触底
    // onReachBottom() {},
    // 页面处理函数--监听页面滚动(not-nvue)
    // onPageScroll(event) {},
    // 页面处理函数--用户点击右上角分享
    // onShareAppMessage(options) {},
  };
</script>

<style scoped lang="scss">
  /* 吸底工具栏 */
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: calc(var(--window-bottom));
    z-index: 1;

    background-color: #fff;
    height: 100rpx;
    padding: 0 20rpx;
    border-top: 1rpx solid #eaeaea;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: content-box;

    .total-pay {
      font-size: 40rpx;
      color: #cf4444;

      .decimal {
        font-size: 75%;
      }
    }

    .button {
      width: 220rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
      background-color: #27ba9b;
    }

    .disabled {
      opacity: 0.6;
    }
  }
</style>
