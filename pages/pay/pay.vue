<template>
  <view class="container position-relative">
    <view style="margin-bottom: 130rpx">
      <view class="section-1">
        <template v-if="orderType == 'takein'">
          <list-cell class="location">
            <view class="flex-fill d-flex justify-content-between align-items-center">
              <view class="store-name flex-fill">
                {{ store.name }}
              </view>
              <image src="/static/images/navigator-1.png" class="arrow"></image>
            </view>
          </list-cell>
        </template>
        <template v-else>
          <list-cell @click="chooseAddress">
            <view class="w-100 d-flex flex-column">
              <view class="d-flex align-items-center justify-content-between mb-10">
                <view class="font-size-extra-lg text-color-base">{{ address.street }}</view>
                <image src="/static/images/navigator-1.png" class="arrow"></image>
              </view>
              <view class="d-flex text-color-assist font-size-sm align-items-center">
                <view class="mr-10">{{ address.accept_name }}</view>
                <view class="mr-10">{{ !address.sex ? '先生' : '女士' }}</view>
                <view>{{ address.mobile }}</view>
              </view>
            </view>
          </list-cell>
        </template>
        <template v-if="orderType == 'takein'">
          <list-cell arrow class="meal-time">
            <view class="flex-fill d-flex justify-content-between align-items-center">
              <view class="title">取餐时间</view>
              <view class="time">立即用餐</view>
            </view>
          </list-cell>
          <!-- 这一步联系人获取可以开通读取手机号码权限后，将手机号码写入用户信息，直接读取 -->
          <list-cell class="contact" last :hover="false">
            <view class="flex-fill d-flex justify-content-between align-items-center">
              <view class="title flex-fill">联系电话</view>
              <view class="time">
                <input class="text-right" placeholder="请输入手机号码" v-model="form.phoneNumber" />
              </view>
              <view class="contact-tip font-size-sm" @click="getPhoneNumber">自动填写</view>
            </view>
          </list-cell>
        </template>
        <template v-else>
          <list-cell>
            <view class="w-100 d-flex flex-column">
              <view class="d-flex align-items-center font-size-base text-color-base">
                <view class="flex-fill">预计送达时间</view>
                <view style="font-size: medium" class="mr-10">{{ expTime }}</view>
                <image src="/static/images/navigator-1.png" class="arrow"></image>
              </view>
              <view class="font-size-base text-color-primary">请修改下方订单备注 </view>
            </view>
          </list-cell>
        </template>
      </view>
      <!-- 购物车列表 begin -->
      <view class="section-2">
        <view class="cart d-flex flex-column">
          <list-cell last v-for="(item, index) in cart" :key="index">
            <view style="border-bottom: 0.5px solid #e6e7e8" class="w-100 d-flex flex-column">
              <view class="d-flex mb-10" style="justify-content: flex-start; align-items: flex-start">
                <view style="flex: 1">
                  <image style="width: 120rpx; height: 120rpx" :src="imageSrc + item.image" class="arrow" />
                </view>
                <view style="width: 50%; margin-left: 12px" class="name-and-props">
                  <view class="text-color-base font-size-lg">
                    {{ item.name }}
                    <view style="font-size: 28rpx">x{{ item.number }}</view>
                    <!-- if not props_text no show -->
                    <view style="margin-bottom: 20rpx; white-space: nowrap" class="font-size-base text-color-assist">
                      {{ item.props_text || '' }}
                    </view>
                  </view>
                </view>
                <view style="flex: 1; justify-content: flex-end; margin-right: 8px" class="d-flex flex-fill align-items-center text-color-base font-size-lg">
                  <view>￥{{ item.price }}</view>
                </view>
              </view>
            </view>
          </list-cell>
          <template v-if="orderType == 'takeout'">
            <list-cell last v-if="store.packing_fee > 0">
              <view class="w-100 d-flex font-size-base align-items-center justify-content-between">
                <view>包装费</view>
                <view>￥{{ parseFloat(store.packing_fee) }}</view>
              </view>
            </list-cell>
            <list-cell last v-if="store.delivery_cost > 0">
              <view class="w-100 d-flex font-size-base align-items-center justify-content-between">
                <view>配送费</view>
                <view>￥{{ parseFloat(store.delivery_cost) }}</view>
              </view>
            </list-cell>
          </template>
        </view>
        <!-- 备注 begin -->
        <list-cell arrow last @click="goToRemark">
          <view class="d-flex flex-fill align-items-center justify-content-between overflow-hidden">
            <view class="flex-shrink-0 mr-20">备注</view>
            <view class="text-color-primary flex-fill text-truncate text-right">{{ form.remark || '点击填写备注' }}</view>
          </view>
        </list-cell>
        <!-- 备注 end -->
        <list-cell arrow @click="goToPackages">
          <view class="flex-fill d-flex justify-content-between align-items-center">
            <view class="text-color-base">桑格利亚券</view>
            <view class="text-color-primary">超值购买优惠券大礼包</view>
          </view>
        </list-cell>
        <list-cell arrow @click="goToGiftcard">
          <view class="flex-fill d-flex justify-content-between align-items-center">
            <view class="text-color-base">礼品卡</view>
            <view class="text-color-primary">请选择</view>
          </view>
        </list-cell>
        <list-cell last>
          <view class="flex-fill d-flex justify-content-end align-items-center">
            <view>总计￥{{ total }},实付</view>
            <view class="font-size-extra-lg font-weight-bold">￥{{ amount }}</view>
          </view>
        </list-cell>
      </view>
      <!-- 购物车列表 end -->
      <view class="d-flex align-items-center justify-content-start font-size-sm text-color-warning" style="padding: 20rpx 0">
        <view class="iconfont iconhelp line-height-100"></view>
        <view>优惠券不与满赠、满减活动共享</view>
      </view>
      <!-- 支付方式 begin -->
      <view class="payment">
        <list-cell last :hover="false">
          <text>支付方式</text>
        </list-cell>
        <radio-group @change="radioChange">
          <list-cell :hover="false">
            <view class="d-flex align-items-center justify-content-between w-100 disabled">
              <span class="iconfont iconbalance line-height-100 payment-icon"></span>
              <span class="flex-fill">{{ `余额支付（余额￥ (${currentSaveCount})` }}</span>
              <span class="font-size-sm" style="margin: 0 20rpx 0 40rpx" v-if="currentSaveCount < total">余额不足</span>
            </view>
            <radio :value="'wallet'" :checked="false" :disabled="currentSaveCount < total" />
          </list-cell>
          <list-cell last :hover="false">
            <view class="d-flex align-items-center justify-content-between w-100 disabled">
              <!-- #ifdef MP-WEIXIN -->
              <view>
                <span class="iconfont iconwxpay line-height-100 payment-icon" style="color: #7eb73a"></span>
                <span class="flex-fill">微信支付</span>
              </view>
              <!-- #endif -->
              <!-- #ifdef MP-ALIPAY -->
              <view>
                <span class="iconfont iconwxpay line-height-100 payment-icon" style="color: #2689d4"></span>
                <span class="flex-fill"> 支付宝支付</span>
              </view>
              <!-- #endif -->
              <radio :value="getPlatform" :checked="true" class="" />
            </view>
          </list-cell>
        </radio-group>
      </view>
      <!-- 支付方式 end -->
    </view>
    <!-- 付款栏 begin -->
    <view class="w-100v pay-box position-fixed fixed-bottom d-flex align-items-center justify-content-between bg-white">
      <view class="font-size-sm" style="margin-left: 28rpx">合计：</view>
      <view class="font-size-lg flex-fill">￥{{ amount }}</view>
      <view class="bg-primary h-100 d-flex align-items-center just-content-center text-color-white font-size-base" style="padding: 0 60rpx" @tap="submit"> 付款 </view>
      <view></view>
      <view></view>
    </view>
    <!-- 付款栏 end -->
    <modal :show="ensureAddressModalVisible" custom :mask-closable="false" :radius="'0'" width="90%">
      <view class="modal-content">
        <view class="d-flex justify-content-end">
          <image src="/static/images/pay/close.png" style="width: 40rpx; height: 40rpx" @tap="ensureAddressModalVisible = false"></image>
        </view>
        <view class="d-flex just-content-center align-items-center" style="margin-bottom: 40px">
          <view class="font-size-extra-lg text-color-base">请再次确认下单地址</view>
        </view>
        <view class="d-flex font-size-base text-color-base font-weight-bold align-items-center justify-content-between mb-20">
          <view>{{ address.accept_name }} {{ address.sex ? '女士' : '先生' }}</view>
          <view>{{ address.mobile }}</view>
        </view>
        <view class="d-flex font-size-sm text-color-assist align-items-center justify-content-between mb-40">
          <view>{{ address.street + address.door_number }}</view>
          <button type="primary" size="mini" plain class="change-address-btn">修改地址</button>
        </view>
        <button type="primary" class="pay_btn" @tap="pay">确认并付款</button>
      </view>
    </modal>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex';
  import listCell from '@/components/list-cell/list-cell';
  import modal from '@/components/modal/modal';
  import orders from '@/api/orders';

  export default {
    components: {
      listCell,
      modal,
    },
    data() {
      return {
        cart: [],
        expTime: '',
        form: {
          remark: '',
          phoneNumber: '189784546846833',
        },
        currentSaveCount: 1100,
        ensureAddressModalVisible: false,
        payway: uni.getSystemInfoSync().uniPlatform,
        // 暂时只提供微信接口支付，充值卡暂不考虑
        paywayObject: {
          'mp-weixin': '微信支付',
          'mp-alipay': '支付宝支付',
          wallet: '余额支付',
        },
        imageSrc: 'https://miniprogram.ai0626.online/', //图片前缀
        current: 0,
        orderInfos: null,
      };
    },
    computed: {
      ...mapState(['orderType', 'address', 'store']),
      total() {
        return this.cart.reduce((acc, cur) => acc + cur.number * cur.price, 0);
      },
      amount() {
        return this.cart.reduce((acc, cur) => acc + cur.number * cur.price, 0);
      },
      getPlatform() {
        return uni.getSystemInfoSync().uniPlatform;
      },
    },
    onLoad(option) {
      const { remark } = option;
      // this.cart = uni.getStorageSync('cart');
      // 改为从vuex获取
      this.cart = this.currentCart();
      remark && this.$set(this.form, 'remark', remark);
    },
    onShow() {
      this.getExpTime();
    },
    methods: {
      ...mapMutations(['SET_ORDER']),
      ...mapGetters(['currentCart']),

      radioChange(evt) {
        this.payway = evt.detail.value;
        console.log('event: ', evt);
      },
      goToRemark() {
        uni.navigateTo({
          url: '/pages/remark/remark?remark=' + this.form.remark,
        });
      },
      getPhoneNumber() {
        uni.showToast({
          title: '获取用户手机号码',
          icon: 'success',
          mask: true,
        });
      },
      chooseAddress() {
        uni.navigateTo({
          url: '/pages/address/address?is_choose=true&scene=pay',
        });
      },
      goToPackages() {
        uni.showToast({
          title: '敬请期待',
          icon: 'loading',
          mask: true,
        });
        // uni.navigateTo({
        //   url: '/pages/packages/index',
        // });
      },
      goToGiftcard() {
        uni.showToast({
          title: '暂不满足购买条件哦',
          icon: 'loading',
          mask: true,
        });
        // uni.navigateTo({
        //   url: '/pages/giftcard/giftcard',
        // });
      },
      getExpTime() {
        // 获取本地时间与 UTC 时间的时间差（单位为分钟）
        const localOffset = new Date().getTimezoneOffset();
        // 计算目标时区与 UTC 时间的时间差
        const beijingOffset = -480; // 北京时间为东八区，UTC+8
        const offsetDiff = beijingOffset - localOffset;
        // 使用时间差来获取当前北京时间
        const now = new Date(Date.now() + offsetDiff * 60 * 1000);
        // 加上50分钟后得到新时间
        const newTime = new Date(now.getTime() + 50 * 60 * 1000);
        // 将时间对象转换为字符串
        const timeStr = newTime.toLocaleTimeString('zh-CN', { hour12: false });
        // 对字符串进行处理，生成类似 '15:56' 的时间格式
        const hour = timeStr.split(':')[0];
        const minute = timeStr.split(':')[1];
        const time = `${hour}:${minute}`;
        this.expTime = time;
        console.log(`当前北京时间为 ${time}`);
      },
      submit() {
        // 如果商品为外卖类型和堂食两种情况
        if (this.orderType == 'takeout') {
          this.getExpTime();
          this.ensureAddressModalVisible = true;
        } else {
          this.pay();
        }
      },
      async getOrderInfo(orderInfo) {
        console.log('orderInfo', orderInfo);
        // 判断是否有修改商品内容或价格等,防止购物车内容错乱；当前处理方法直接清空即可
        let that = this;
        return new Promise((resolve, reject) => {
          uni.request({
            url: 'http://localhost:4000/order/createNewOrder',
            method: 'POST',
            data: orderInfo,
            success: ({ data }) => {
              data.remark = this.form.remark;
              that.SET_ORDER({ data });
              console.log('that.SET_ORDER', that.SET_ORDER);
              resolve(data); // 千万别忘写！！！
            },
            fail: (err) => {
              reject(err);
            },
          });
        });
      },
      // 调起支付接口，支付后跳转成功，此处可以设计两个接口，如支付宝和微信两个不同情况，同时也可以使用uni.payment支付
      // 这里要拿到当前的支付方式为余额还是alipay或者是wechat支付
      async pay() {
        let paymentway = this.paywayObject[this.payway];
        uni.showLoading({ title: `加载中，当前支付方式为${paymentway}` });

        // 此处猜测status为商品的制作状态。5为完成，1为刚刚开始的状态
        // 这一步直接将order写入数据库就行了，展示页直接读取数据库的信息
        // 2023-07-29 11:11:08发起接口请求，将数据交给后端处理
        const params = {
          orderDetail: this.cart,
          paymentway: paymentway,
          totalPrice: this.total,
          payStatus: 1, //0表示已下单,1表示制作中
          phoneNumber: this.form.phoneNumber,
          openId: 'zwt2675123sdf',
        };
        const orderInfo = await this.getOrderInfo(params);
        console.log('orderInfoorderInfo', orderInfo);
        this.orderInfos = orderInfo;
        this.SET_ORDER({ orderInfo });
        // 支付成功后清除缓存中的购物车:结算时暂时不清除购物车内容
        // uni.removeStorageSync('cart');
        // 2023-07-08 18:22:52 其实这一步应该跳转到结算界面，单独的一个结算界面，可以先在这个界面生成
        //  订单数据
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/take-foods/index',
          });
          uni.hideLoading();
        }, 3000);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .container {
    padding: 30rpx;
    overflow: auto;
  }

  .arrow {
    width: 50rpx;
    height: 50rpx;
    position: relative;
    margin-right: -10rpx;
  }

  .location {
    .store-name {
      font-size: $font-size-lg;
    }

    .iconfont {
      font-size: 50rpx;
      line-height: 100%;
      color: $color-primary;
    }
  }

  .section-1 {
    margin-bottom: 30rpx;
    overflow: hidden;
    border-radius: 15px;
    .contact {
      .contact-tip {
        margin-left: 10rpx;
        border: 2rpx solid $color-primary;
        padding: 6rpx 10rpx;
        color: $color-primary;
      }
    }
  }

  .section-2 {
    overflow: hidden;
    border-radius: 15px;
    .name-and-props {
      width: 65%;
    }
  }

  .payment {
    overflow: hidden;
    border-radius: 15px;
    margin-bottom: 30rpx;

    .disabled {
      color: $text-color-grey;
    }

    .payment-icon {
      font-size: 44rpx;
      margin-right: 10rpx;
    }

    .checkbox {
      font-size: 36rpx;
      margin-left: 10rpx;
    }

    .checked {
      color: $color-primary;
    }
  }

  .pay-box {
    box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
    height: 150rpx;
  }

  .modal-content {
    .change-address-btn {
      line-height: 2;
      padding: 0 1em;
    }
    .pay_btn {
      width: 100%;
      border-radius: 50rem !important;
      line-height: 3;
    }
  }
</style>
