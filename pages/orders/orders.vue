<template>
  <view class="container">
    <view class="orders-list d-flex flex-column w-100" style="padding: 20rpx; padding-bottom: 0">
      <view class="order-item" v-for="(item, index) in orders" :key="index" style="margin-bottom: 30rpx; border-radius: 20px; overflow: hidden" @tap="detail(item.orderNo)">
        <list-cell :hover="false">
          <view class="w-100 d-flex align-items-center">
            <view class="flex-fill d-flex flex-column">
              <view class="font-size-lg text-color-base" style="margin-bottom: 20rpx">
                {{ item.store.name || '融侨官邸店' }}
              </view>
              <view class="font-size-sm text-color-assist">订单编号：{{ item.orderNo }}</view>
            </view>
            <view class="font-size-lg text-color-primary"> {{ $util.transPayState(item.payStatus) }} </view>
          </view>
        </list-cell>
        <list-cell :hover="false" last>
          <view class="w-100 d-flex flex-column">
            <view class="w-100 text-truncate font-size-lg text-color-base" style="margin-bottom: 20rpx">
              <view style="display: flex; overflow: scroll">
                <view v-for="(good, index) in item.orderDetail" :key="index" style="display: flex; flex-direction: column">
                  <image style="width: 100rpx; height: 100rpx; margin: 5px" :src="imageSrc + good.image" class="arrow" />
                  <span style="overflow: hidden; text-overflow: ellipsis; width: 100rpx; margin: 0px 5px">{{ good.name }}</span>
                </view>
              </view>
              <!-- {{ orderGoodsName(item.orderDetail) }} -->
            </view>
            <view class="d-flex justify-content-between align-items-center" style="margin-bottom: 30rpx">
              <view class="font-size-sm text-color-assist">
                {{ $util.myFormatTime(item.createdAt) }}
              </view>
              <view class="d-flex font-size-sm text-color-base align-items-center">
                <view style="margin-right: 10rpx; display: none">共{{ item.totalGoods }}件商品</view>
                <view class="font-size-lg">实付 ￥{{ item.totalPrice }}</view>
              </view>
            </view>
            <view class="d-flex align-items-center justify-content-end" v-if="false">
              <view style="margin-right: 10rpx">
                <button type="primary" plain size="mini" v-if="item.invoice_status > 0">查看发票</button>
                <button type="primary" plain size="mini" v-else @tap.stop="goToInvoice">开发票</button>
              </view>
              <view>
                <button type="primary" plain size="mini" @tap.stop="review(item)">去评价</button>
              </view>
            </view>
          </view>
        </list-cell>
      </view>
    </view>
  </view>
</template>

<script>
  import listCell from '@/components/list-cell/list-cell';

  export default {
    props: ['myorders', 'isSon'],
    components: {
      listCell,
    },
    data() {
      return {
        page: 1,
        pageSize: 5,
        orders: [],
        phoneNumber: '1897845468468',
        imageSrc: 'https://miniprogram.ai0626.online/', //图片前缀
      };
    },
    computed: {
      orderGoodsName() {
        return (goods) => {
          let arr = [];
          goods.forEach((good) => arr.push(good.name + '*' + good.number));
          return arr.join('，');
        };
      },
    },
    // 2023-07-29 18:26:42 改组件变成了子组件使用的话，需要将onload函数的内容转成在mounted里处理
    async mounted() {
      if (!this.$store.getters.isLogin) {
        uni.navigateTo({ url: '/pages/login/login' });
      }
      console.log('this.son', this.isSon);

      if (this.isSon) {
        // this.orders = this.myorders;
        this.orders = await this.getCurUserOrder(this.phoneNumber);
        setTimeout(() => {
          uni.hideLoading();
        }, 1000);
        // 通过手机号码等唯一标识读取数据库该用户下的所有信息
      } else this.getOrders(false);
    },
    async onLoad() {},
    async onReachBottom() {
      await this.getOrders(false);
    },
    async onPullDownRefresh() {
      await this.getCurUserOrder(this.phoneNumber);
    },
    methods: {
      async getCurUserOrder(phoneNumber) {
        uni.showLoading({
          title: '加载中',
        });
        return new Promise((resolve) => {
          uni.request({
            url: `http://localhost:4000/order/userOrder/${phoneNumber}`,
            method: 'GET',
            success: ({ data }) => {
              this.orders = data.data;
              console.log('orders', this.orders);
              resolve(this.orders);
            },
            fail: (error) => {},
          });
        });
      },
      async getOrders(isRefresh = false) {
        // let orders = await this.$api('orders');
        let orders = this.myorders;
        console.log('orders: ', orders);

        orders = orders.slice(this.pageSize * (this.page - 1), this.pageSize * this.page);
        if (orders.length) {
          this.orders = this.orders.concat(orders);
          this.page += 1;
        }
      },
      detail(id) {
        const curItem = this.orders.find((item) => item.orderNo == id);
        uni.navigateTo({
          url: '/pages/orders/detail?id=' + JSON.stringify(curItem),
        });
      },
      review(order) {
        const date = order.completed_time.split(' ')[0];
        uni.navigateTo({
          url: '/pages/review/review?storename=' + order.store.name + '&typeCate=' + order.typeCate + '&date=' + date,
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

<style lang="scss" scoped></style>
