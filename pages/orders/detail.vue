<template>
  <view class="container" style="padding: 20rpx">
    <view style="padding-bottom: 100rpx">
      <!-- mno bg-coloor white -->
      <view class="bg-white1">
        <view class="section border">
          <!-- store info begin -->
          <list-cell :hover="false" v-if="false">
            <view class="w-100 d-flex align-items-center">
              <view class="d-flex flex-column w-60">
                <view class="w-100 font-size-lg text-color-base text-truncate mb-10">{{ order.store.name || '融侨官邸店' }}</view>
                <view class="w-100 d-flex align-items-center overflow-hidden">
                  <image src="/static/images/order/location.png" class="flex-shrink-0" style="width: 30rpx; height: 30rpx"></image>
                  <view class="text-truncate font-size-sm text-color-assist">{{ order.store.address }}</view>
                </view>
              </view>
              <view class="d-flex justify-content-end align-items-center w-40">
                <image src="/static/images/order/mobile.png" style="width: 60rpx; height: 60rpx; margin-right: 30rpx"></image>
                <image src="/static/images/order/navigation.png" style="width: 60rpx; height: 60rpx"></image>
              </view>
            </view>
          </list-cell>
          <!-- store info end -->
          <!-- goods begin -->
          <list-cell :hover="false" padding="50rpx 30rpx">
            <view class="w-100 d-flex flex-column position-relative" style="margin-bottom: -40rpx">
              <view class="w-100 d-flex align-items-center mb-40" v-for="(good, index) in order.orderDetail" :key="index">
                <view class="d-flex flex-column w-60 overflow-hidden">
                  <view class="font-size-lg text-color-base mb-10 text-truncate">{{ good.name }}</view>
                  <view class="font-size-sm text-color-assist text-truncate">{{ good.property }}</view>
                </view>
                <view class="d-flex w-40 align-items-center justify-content-between pl-30">
                  <view class="font-size-base text-color-base">x{{ good.number }}</view>
                  <view class="font-size-base text-color-base font-weight-bold">￥{{ good.price }}</view>
                </view>
              </view>
            </view>
          </list-cell>
          <!-- goods end -->
        </view>
        <view class="section border">
          <!-- payment and amount begin -->
          <list-cell :hover="false" padding="50rpx 30rpx">
            <view class="w-100 d-flex flex-column">
              <view class="pay-cell">
                <view>支付方式</view>
                <view class="font-weight-bold">{{ order.paymentway }}</view>
              </view>
              <view class="pay-cell">
                <view>金额总计</view>
                <view class="font-weight-bold">￥{{ order.totalPrice }}</view>
              </view>
            </view>
          </list-cell>
          <!-- payment and amount end -->
        </view>
        <view class="section border">
          <!-- order info begin -->
          <list-cell :hover="false" padding="50rpx 30rpx">
            <view class="w-100 d-flex flex-column">
              <view class="pay-cell">
                <view>下单时间</view>
                <view class="font-weight-bold">{{ $util.myFormatTime(order.createdAt) }}</view>
              </view>
              <view class="pay-cell">
                <view>下单门店</view>
                <view class="font-weight-bold">{{ order.store.name || '融侨官邸' }}</view>
              </view>
              <view class="pay-cell">
                <view>支付方式</view>
                <view class="font-weight-bold">{{ order.paymentway }}</view>
              </view>
              <view class="pay-cell">
                <view>订单号</view>
                <view class="font-weight-bold">{{ order.orderNo }}</view>
              </view>
            </view>
          </list-cell>
          <!-- order info end -->
        </view>
        <!-- order other info begin -->
        <view class="section border">
          <list-cell :hover="false" padding="50rpx 30rpx 20rpx" last>
            <view class="w-100 d-flex flex-column">
              <view class="pay-cell">
                <view>取单号</view>
                <view class="font-weight-bold">{{ order.takeNo }}</view>
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
                <view>备注</view>
                <view class="font-weight-bold">{{ order.postscript || '无' }}</view>
              </view>
            </view>
          </list-cell>
        </view>
        <!-- order other info end -->
      </view>
      <view class="position-relative w-100" v-if="false">
        <image src="/static/images/order/bottom.png" mode="widthFix" class="w-100"></image>
        <view class="invote-box" v-if="!order.invoice_status">
          <view class="font-size-base text-color-primary" @tap="goToInvoice">去开发票</view>
          <image src="/static/images/order/right.png"></image>
        </view>
      </view>
    </view>
    <view class="btn-box" v-if="false">
      <view class="item" v-if="order.invoice_status > 0"><button type="primary">查看发票</button></view>
      <view class="item"><button type="primary" plain @tap="review">去评价</button></view>
      <view class="item"><button type="primary">再来一单</button></view>
    </view>
  </view>
</template>

<script>
  import Orders from '@/api/orders';
  import listCell from '@/components/list-cell/list-cell';

  export default {
    components: {
      listCell,
    },
    data() {
      return {
        order: {},
      };
    },
    async onLoad({ id }) {
      console.log('orderNo', id);
      this.order = JSON.parse(id);
      console.log(' this.order', this.order);
    },
    methods: {
      // 直接从上一个页面传参接受即可，减少一次请求
      getCurOrderNo(id) {
        return new Promise((resolve, reject) => {
          uni.request({
            url: this.$baseUrl + `/order/getOrderInfo/${id}`,
            method: 'GET',
            success: ({ data, statusCode, header }) => {
              resolve(data.data);
            },
            fail: (error) => {},
          });
        });
      },
      review() {
        const date = this.order.completed_time.split(' ')[0];
        uni.navigateTo({
          url: '/pages/review/review?storename=' + this.order.store.name + '&typeCate=' + this.order.typeCate + '&date=' + date,
        });
      },
      goToInvoice() {
        uni.navigateTo({
          url: '/pages/invoice/invoice',
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
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
  .border {
    border-radius: 12px;
    margin: 5px;
    overflow: hidden;
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

  .invote-box {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    image {
      width: 30rpx;
      height: 30rpx;
    }
  }

  .btn-box {
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120rpx;
    box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.1);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    z-index: 11;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20rpx 10rpx;
      flex: 1;
      flex-shrink: 0;

      button {
        width: 100%;
        border-radius: 50rem !important;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }
    }
  }
</style>
