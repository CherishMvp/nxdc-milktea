<template>
  <view class="container">
    <view class="form-box">
      <view class="form">
        <list-cell :hover="false">
          <view class="form-input">
            <view class="label">收货人</view>
            <input class="input" placeholder="请输入收货人" v-model="form.accept_name" placeholder-class="text-color-assist" />
          </view>
        </list-cell>
        <list-cell :hover="false">
          <view class="form-input">
            <view class="label">性别</view>
            <view class="radio-group">
              <view class="radio" :class="{ checked: !form.sex }" style="margin-right: 10rpx" @tap="form.sex = 0">先生</view>
              <view class="radio" :class="{ checked: form.sex }" @tap="form.sex = 1">女士</view>
            </view>
          </view>
        </list-cell>
        <list-cell :hover="false">
          <view class="form-input">
            <view class="label">联系方式</view>
            <input class="input" placeholder="请输入收货人联系方式" v-model="form.mobile" placeholder-class="text-color-assist" />
          </view>
        </list-cell>
        <list-cell :hover="false">
          <view class="form-input">
            <view class="label">收货地址</view>
            <input class="input" placeholder="请选择收货地址" v-model="form.street" placeholder-class="text-color-assist" />
          </view>
        </list-cell>
        <list-cell :hover="false">
          <view class="form-input">
            <view class="label">门牌号</view>
            <input class="input" placeholder="请输入收货人详细地址" v-model="form.door_number" placeholder-class="text-color-assist" />
          </view>
        </list-cell>
      </view>
      <view class="btn-section">
        <!-- #ifdef MP-WEIXIN -->
        <button class="bgcolor-default" size="mini" @click="setAddress"> 导入微信地址 </button>
        <!-- #endif -->
        <!-- #ifdef MP-ALIPAY -->
        <button class="bgcolor-default" size="mini" @click="setAddress"> 导入支付宝地址 </button>
        <!-- #endif -->
        <button class="bgcolor-default" size="mini" @tap="save">保存</button>
      </view>
    </view>
  </view>
</template>

<script>
  import listCell from '@/components/list-cell/list-cell';
  import { mapState, mapMutations } from 'vuex';

  export default {
    components: {
      listCell,
    },
    data() {
      return {
        form: {
          id: '',
          accept_name: '',
          sex: 0,
          mobile: '',
          street: '',
          door_number: '',
        },
      };
    },
    async onLoad({ id }) {
      //为了方便演示，这里用本地缓存
      console.log('id', id);
      if (id) {
        this.form = this.$store.state.addresses.find((item) => item.id == id);
      }
    },
    computed: {
      ...mapState(['addresses']),
    },
    methods: {
      ...mapMutations(['SET_ADDRESS', 'SET_ADDRESSES']),
      save() {
        console.log('current address', this.form);
        // this.SET_ADDRESSES(this.form);
        uni.navigateBack();
      },
      async setAddress() {
        var that = this;
        const res = await uni.chooseAddress();
        console.log('res: ', res);
        // #ifdef MP-WEIXIN
        if (res[1].errMsg === 'chooseAddress:ok') {
          //   address.value = res;
          that.form.street = res[1].cityName + res[1].countyName + res[1].detailInfo;
          that.form.accept_name = res[1].userName;
          that.form.mobile = res[1].telNumber;
          console.log('res-address', res);
          console.log('this address', that.addresses);
          let id = that.addresses.length;
          that.form.id = id + 1;
          //   const index = that.addresses.findIndex((item) => item.id == id);
          const addresses = JSON.parse(JSON.stringify(that.addresses));
          console.log('final address form', that.form);
          addresses.splice(id, 0, that.form);
          that.SET_ADDRESSES(addresses);
          //   uni.setStorageSync('address', res[1]);
        }
        // #endif
        // #ifdef MP-ALIPAY
        if (res[1].errMsg === '9000') {
          console.log('response', res[1]);
          that.form.street = res[1].cityName + res[1].countyName + res[1].detailInfo;
          that.form.accept_name = res[1].userName;
          that.form.mobile = res[1].telNumber;
          console.log('res-address', res);
          console.log('this address', that.addresses);
          let id = that.addresses.length;
          that.form.id = id + 1;
          //   const index = that.addresses.findIndex((item) => item.id == id);
          const addresses = JSON.parse(JSON.stringify(that.addresses));
          console.log('final address form', that.form);
          addresses.splice(id, 0, that.form);
          that.SET_ADDRESSES(addresses);
        } else if (res[1].errMsg === '6001') {
          uni.showToast({ title: '用户未选择地址' });
        }
        // #endif
      },
    },
  };
</script>

<style lang="scss" scoped>
  .container {
    width: 100vw;
    height: 100vh;
  }
  .form-box {
    width: 100%;
    height: 100%;
    padding: 30rpx;
    display: flex;
    flex-direction: column;
    color: $text-color-base;

    .form-input {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .label {
      width: 200rpx;
      font-size: $font-size-lg;
      color: $text-color-base;
      font-weight: 500;
    }

    .input {
      flex: 1;
      display: flex;
      align-items: center;
    }

    .radio-group {
      display: flex;
      justify-content: flex-start;

      .radio {
        padding: 10rpx 30rpx;
        border-radius: 6rpx;
        border: 2rpx solid $text-color-assist;
        color: $text-color-assist;
        font-size: $font-size-base;

        &.checked {
          background-color: $color-primary;
          color: $text-color-white;
          border: 2rpx solid $color-primary;
        }
      }
    }

    .btn-section {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      button {
        margin-bottom: 30rpx;
        font-size: $font-size-base;
        height: 90rpx;
        border-radius: 50rem !important;
        width: 85%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>
