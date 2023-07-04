<template>
  <view class="container">
    <view class="intro">
      <image src="/static/images/logo.png"></image>
      <view class="tips">
        一杯好茶，一口软欧包
        <br />
        在桑格利亚遇见两种美好
      </view>
    </view>
    <view class="bottom">
      <!-- #ifdef H5 -->
      <button type="primary" size="default" class="login-btn" @tap="login"> 登录 </button>
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      <button type="primary" size="default" class="login-btn" open-type="getUserInfo" lang="zh_CN" @tap="getUserInfo">
        <image src="/static/images/mine/wechat.png"></image>
        微信一键登录
      </button>
      <!-- #endif -->
      <!-- #ifdef MP-ALIPAY -->
      <button type="default" style="background-color: #adb838" size="default" class="login-btn" open-type="getUserInfo" lang="zh_CN" @tap="getUserInfo">
        <image src="/static/images/mine/ali.png"></image>
        支付宝一键登录
      </button>
      <!-- #endif -->
      <view class="d-flex flex-column justify-content-evenly align-items-center text-center" style="height: 30vh">
        <view class="w-100 font-size-base text-color-assist">新用户登录即加入会员，享会员权益</view>
        <view class="w-100 row d-flex just-content-around align-items-center font-size-sm text-color-assist">
          <view class="grid">
            <image src="/static/images/mine/rhyl.png"></image>
            <view>入会有礼</view>
          </view>
          <view class="grid">
            <image src="/static/images/mine/jfdh.png"></image>
            <view>积分兑换</view>
          </view>
          <view class="grid">
            <image src="/static/images/mine/sjtq.png"></image>
            <view>升级特权</view>
          </view>
          <view class="grid">
            <image src="/static/images/mine/srtq.png"></image>
            <view>生日特权</view>
          </view>
          <view class="grid">
            <image src="/static/images/mine/nxbz.png"></image>
            <view>桑格利亚宝藏</view>
          </view>
        </view>
        <view class="font-size-base text-color-primary">会员权益说明</view>
      </view>
    </view>
  </view>
</template>

<script>
  import Member from '@/api/member';
  import { mapMutations } from 'vuex';

  export default {
    data() {
      return {
        memberInfo: '',
      };
    },
    methods: {
      ...mapMutations(['SET_MEMBER']),
      async getUserInfo1(e) {
        console.log('e', e);
        const { errMsg, userInfo } = e.detail;
        if (errMsg !== 'getUserInfo:ok') {
          uni.showModal({
            title: '提示',
            content: '您取消了授权登录，请重新授权',
            showCancel: false,
          });
          uni.navigateBack();
          //没有授权登录就用默认的用户信息
          // this.SET_MEMBER(Member);
          return;
        } else {
          const { avatarUrl: avatar, city, country, gender, nickName: nickname, province } = userInfo;
          const member = Object.assign(Member, { avatar, city, country, gender, nickname, province });
          setTimeout(() => {
            uni.showToast({
              title: '登录成功',
              showCancel: false,
            });
          }, 500);
          uni.navigateBack();
          this.SET_MEMBER(member);
        }
      },
      async getUserInfo() {
        console.log('getUserProfile');
        // 防止出现this指向错误的问题
        var that = this;
        uni.getUserProfile({
          provider: 'weixin',
          desc: '个人信息',
          success: (info) => {
            // mock data
            // 这里可以调用一个位置信息
            console.log('info', info);
            info.userInfo.country = '中国';
            info.userInfo.province = '福建';
            // 这里的Member通过后端api获取
            const { avatarUrl: avatar, city, country, gender, nickName: nickname, province } = info.userInfo;
            that.memberInfo = Object.assign(Member, { avatar, city, country, gender, nickname, province });

            console.log('this.member', that.memberInfo);
            uni.setStorageSync('userinfo', that.memberInfo);
            uni.login({
              provider: 'weixin',
              success: (res) => {
                const query = {
                  code: res.code,
                  encryptedData: info.encryptedData,
                  iv: info.iv,
                  rawData: info.rawData,
                  signature: info.signature,
                };
                console.log('query', query);
                uni.request({
                  // url: ProductApi.BASE_URL + '/user/code',
                  url: 'https://nest.ai0626.online/user/code',
                  method: 'POST',
                  data: query,
                  complete() {
                    uni.showToast({
                      title: '登录成功',
                      icon: 'success',
                      duration: 3000,
                      success(result) {
                        uni.navigateBack();
                        that.SET_MEMBER(that.memberInfo);

                        // 去tabbar的页面（shopcar）直接就是不带返回
                        // uni.reLaunch({ url: '/pages/index/shopcar?hasBack=false' });
                      },
                    });
                    // 存入本地缓存，防止
                  },
                  success(result) {
                    console.log('result', result);

                    // mock返回的数据
                    // 将token存入pinia中
                    // 登录成功后，要调用nest接口，将openId作为用户唯一标识写入数据库
                    // URI.createUser(result.data.openid);
                    // 桑格利亚这里可以改为获取用户订单数据
                    uni.request({
                      // url: ProductApi.BASE_URL + `/product/${result.data.openid}`,
                      url: 'https://nest.ai0626.online/shengxian/product/' + result.data.openid,
                      method: 'POST',
                    });
                  },
                  fail(err) {
                    console.log('err', err);
                    uni.showToast({ title: '登录失败', icon: 'error' });
                  },
                });
              },
            });
          },
          fail(result) {
            if (result.errMsg === 'getUserProfile:fail auth deny')
              return uni.showToast({
                title: '取消授权',
              });
          },
        });
      },
      login() {
        this.SET_MEMBER(Member);
        uni.navigateBack();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .intro {
    width: 100%;
    height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    font-size: $font-size-base;
    color: $text-color-assist;

    image {
      width: 165rpx;
      height: 165rpx;
    }

    .tips {
      line-height: 72rpx;
      text-align: center;
    }
  }

  .bottom {
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 40rpx;

    .login-btn {
      width: 100%;
      border-radius: 50rem !important;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10rpx 0;

      image {
        width: 36rpx;
        height: 30rpx;
        margin-right: 10rpx;
      }
    }

    .row {
      .grid {
        width: 20%;
        image {
          width: 60rpx;
          height: 60rpx;
          margin-bottom: 10rpx;
        }
      }
    }
  }
</style>
