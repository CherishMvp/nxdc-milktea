<template>
  <view class="container w-100 h-100" v-if="!loading">
    <view class="d-flex flex-column w-100" style="padding: 30rpx; padding-bottom: -34rpx; margin-bottom: 150rpx">
      <view class="d-flex align-items-center bg-white" style="padding: 30rpx; height: 220rpx; margin-bottom: 34rpx; border-radius: 8rpx" v-for="(item, index) in packages" :key="index" @tap="pay(item.id)">
        <image :src="item.image" style="width: 200rpx; height: 160rpx; margin-right: 20rpx"></image>
        <view class="d-flex flex-fill flex-column justify-content-between" style="height: 160rpx">
          <view class="font-size-lg text-color-base">{{ item.title }}</view>
          <view class="d-flex justify-content-between align-items-center">
            <view class="font-size-sm">￥{{ item.amount }}</view>
            <button size="mini" class="pay-btn bgcolor-default">去购买</button>
          </view>
        </view>
      </view>
    </view>
    <view class="d-flex position-fixed bg-base fixed-bottom text-color-primary font-size-base align-items-center just-content-center w-100" style="height: 150rpx">
      <text>购买记录</text>
    </view>
  </view>
  <loading v-else></loading>
</template>

<script>
  import loading from '@/components/loading';

  export default {
    components: {
      loading,
    },
    data() {
      return {
        loading: true,
        packages: [],
      };
    },
    async onLoad() {
      await this.getPackages();
    },
    async onPullDownRefresh() {
      await this.getPackages();
    },
    methods: {
      async getPackages() {
        console.log('下拉刷新获取内容');
        this.loading = true;
        this.packages = await this.$api('packages');
        if (this.packages.length) {
          setTimeout(() => {
            uni.stopPullDownRefresh({
              success: (result) => {
                console.log('stop refresh');
              },
            });
          }, 2000);
        }
        this.loading = false;
      },
      pay(id) {
        uni.navigateTo({
          url: '/pages/packages/detail?id=' + id,
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .container {
    padding-bottom: -150rpx;
  }

  .pay-btn {
    height: 50rpx;
    width: 120rpx;
    font-size: $font-size-sm;
    border-radius: 50rpx;
    padding: 0;
    line-height: 50rpx;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffff;
  }
</style>
