<template>
  <view v-if="!loading">
    <view class="tabbar">
      <view class="tab" :class="{ active: activeTabIndex == index }" v-for="(item, index) in tabs" :key="index" @tap="handleTab(index)">
        <view class="title">{{ item.title }}</view>
      </view>
    </view>
    <TakeFoods :isUpdate="isUpdate" v-if="activeTabIndex == '0'" />
    <HistoryOrders :isSon="true" :myorders="orders" v-if="activeTabIndex == '1'" />
  </view>
  <view class="loading" v-else>
    <image src="/static/images/loading.gif"></image>
  </view>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
  import TakeFoods from './take-foods.vue';
  import HistoryOrders from '../orders/orders.vue';
  export default {
    components: {
      TakeFoods,
      HistoryOrders,
    },
    data() {
      return {
        tabs: [
          { title: '当前订单', value: 'current' },
          { title: '历史订单', value: 'history' },
        ],
        activeTabIndex: '0',
        orders: [
          {
            coupon_name: '',
            receive_at: 0,
            pay_mode: '微信支付',
            pay_user_name: 'tinypuppet',
            updated_at: 1588937139,
            goods_num: 2,
            completed_at: 1588937139,
            created_at: 1588936782,
            invoice_status: 1,
            sended_time: 0,
            status_text: '已完成',
            remark: '',
            coupon_amount: 0,
            mobile: '18666600000',
            user_name: 'tinypuppet',
            payed_at: 1588936805,
            total_amount: '50.00',
            // 店铺信息
            store: {
              address: '广东省深圳市宝安区深圳市宝安区福海街道宝安大道6259号 L1 层55/56号商铺',
              longitude: '113.804601',
              latitude: '22.678654',
              mobile: '075523224859',
              name: '融侨观邸店',
            },
            // 送达状态
            send_status: 0,
            discount: [],
            status: 5,
            completed_time: '2020-05-08 19:25:39',
            amount: '50.00',
            multi_store: '融侨观邸店',
            productioned_time: '2020-05-08 19:24:37',
            postscript: '打包',
            sort_num: '8093',
            order_no: 'ABCDEFGHIJKLMN0001',
            id: 1,
            typeCate: 1,
            // goods购物车商品内容
            goods: [
              {
                number: 1,
                originAmount: '28.00',
                price: '28.00',
                unit: '件',
                property: '去冰,标准糖',
                image: 'https://img-shop.qmimg.cn/s23107/2020/03/19/630a810c8c7201c112.jpg',
                amount: '28.00',
                name: '霸气葡萄',
              },
              {
                number: 1,
                originAmount: '22.00',
                price: '22.00',
                unit: '件',
                property: '标准冰,标准糖',
                image: 'https://img-shop.qmimg.cn/s23107/2020/03/27/8d4a1edb7c9e2d6554.jpg',
                amount: '28.00',
                name: '霸气葡萄',
              },
            ],
          },
          // 外卖模拟订单
          {
            coupon_name: '',
            receive_at: 0,
            pay_mode: '微信支付',
            pay_user_name: 'tinypuppet',
            updated_at: 1588682566,
            goods_num: 3,
            completed_at: 1588682566,
            created_at: 1588682001,
            invoice_status: 0,
            sended_time: 0,
            status_text: '已完成',
            remark: '',
            coupon_amount: 0,
            mobile: '18666600000',
            user_name: 'tinypuppet',
            payed_at: 1588682014,
            total_amount: '73.00',
            store: {
              address: '广东省深圳市宝安区深圳市宝安区福海街道宝安大道6259号 L1 层55/56号商铺',
              longitude: '113.804601',
              latitude: '22.678654',
              mobile: '075523224859',
              name: '融侨观邸店',
            },
            send_status: 0,
            discount: [],
            status: 5,
            completed_time: '2020-05-05 20:42:46',
            amount: '73.00',
            multi_store: '融侨观邸店',
            productioned_time: '2020-05-05 20:38:49',
            postscript: '打包',
            sort_num: '8145',
            order_no: 'ABCDEFGHIJKLMN0002',
            id: 2,
            typeCate: 2,
            goods: [
              {
                number: 1,
                originAmount: '27.00',
                price: '27.00',
                unit: '件',
                property: '标准,标准（冰沙）,标准糖',
                image: 'https://img-shop.qmimg.cn/s23107/2020/04/26/79187a01f23e6f1e66.jpg',
                amount: '27.00',
                name: '杨枝甘露宝藏茶',
              },
              {
                number: 1,
                originAmount: '29.00',
                price: '29.00',
                unit: '件',
                property: '标准(芝士),标准冰,标准糖',
                image: 'https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg',
                amount: '29.00',
                name: '霸气芝士芒果',
              },
              {
                number: 1,
                originAmount: '17.00',
                price: '17.00',
                unit: '件',
                property: '去冰,标准糖',
                image: 'https://img-shop.qmimg.cn/s23107/2019/04/26/333b43719bd81f4e00.jpg',
                amount: '17.00',
                name: '霸气绿柠檬',
              },
            ],
          },
        ],
        isUpdate: false,
      };
    },
    async onLoad() {
      await this.init();
    },
    onShow() {
      console.log('展示订单页面');
      this.isUpdate = true;
    },
    onHide() {
      this.isUpdate = false;
    },
    mounted() {},
    computed: {},
    watch: {
      activeTabIndex: async function (val) {
        const type = this.tabs[val].value;
        await this.getCoupons(type);
      },
    },
    methods: {
      ...mapMutations(['SET_ORDER_TYPE']),
      ...mapActions(['getStore']),
      handleTab(index) {
        this.activeTabIndex = index;
        console.log('this.activeTabIndex', this.activeTabIndex);
      },
      async getCoupons(type) {
        console.log('当前选择', type);
        // uni.showToast({
        //   title: `${type}`,
        //   icon: 'success',
        //   mask: true,
        // });
        if (type == 'all') {
        } else {
        }
      },

      async init() {
        //页面初始化
        console.log('start');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .tabbar {
    flex-shrink: 0;
    width: 100%;
    height: 120rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    .tab {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: $font-size-base;
      color: $text-color-base;
      position: relative;

      .title {
        padding: 15rpx 0;
      }

      &.active {
        color: $color-primary;

        .title {
          border-bottom: 5rpx solid $color-primary;
        }
      }
    }
  }
  .notice {
    display: flex;
    flex-direction: column;
    background-color: #ffff;
  }
</style>
