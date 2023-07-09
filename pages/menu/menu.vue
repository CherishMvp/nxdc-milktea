<template>
  <view class="container" v-if="!loading">
    <!-- #ifdef MP-WEIXIN||MP-ALIPAY -->
    <uni-nav-bar :border="false" :height="calculateStatusBarHeight"></uni-nav-bar>
    <!-- #endif -->
    <view class="main" :style="{ height: calculateWindowHeight }" v-if="goods.length">
      <view class="nav">
        <view class="header">
          <view class="left" v-if="orderType == 'takein'">
            <view class="store-name">
              <view class="right">
                <view class="dinein" :class="{ active: orderType == 'takein' }" @click="SET_ORDER_TYPE('takein')">
                  <text>自取</text>
                </view>
                <view class="takeout" :class="{ active: orderType == 'takeout' }" @click="takout">
                  <text>外卖</text>
                </view>
              </view>
            </view>
            <view class="store-location">
              <image src="/static/images/index/shop.png" style="width: 30rpx; height: 30rpx" class="mr-10"></image>
              <text>{{ store.name }}</text>
              <view class="iconfont iconarrow-right"></view>
            </view>
            <view class="store-location">
              <image src="/static/images/order/location.png" style="width: 30rpx; height: 30rpx" class="mr-10"></image>
              <text>距离您 {{ store.distance_text }}</text>
            </view>
          </view>
          <view class="left overflow-hidden" v-else>
            <view class="store-name">
              <view class="right">
                <view class="dinein" :class="{ active: orderType == 'takein' }" @click="SET_ORDER_TYPE('takein')">
                  <text>自取</text>
                </view>
                <view class="takeout" :class="{ active: orderType == 'takeout' }" @click="takout">
                  <text>外卖</text>
                </view>
              </view>
            </view>
            <view class="d-flex align-items-center overflow-hidden">
              <image src="/static/images/order/location.png" style="width: 30rpx; height: 30rpx" class="mr-10"></image>
              <view class="font-size-medium text-color-base font-weight-bold text-truncate">
                {{ address.street }}
              </view>
            </view>
            <view class="font-size-sm text-color-assist overflow-hidden text-truncate">
              由
              <text class="text-color-base" style="margin: 0 10rpx"> {{ store.name }}</text
              >配送
            </view>
          </view>
        </view>
        <!-- 横幅公告 -->
        <view class="coupon" @click="buyCard">
          <text class="title">"霸气mini卡"超级购券活动，赶紧去购买</text>
          <view class="iconfont iconarrow-right"></view>
        </view>
      </view>
      <!-- 整个下方内容区 -->
      <view class="content">
        <!-- 左侧菜单menu -->
        <scroll-view class="menus" :scroll-anchoring="true" :scroll-top="mainDistance" :scroll-into-view="menuScrollIntoView" :scroll-animation-duration="2000" :show-scrollbar="false" scroll-with-animation scroll-y>
          <view class="wrapper">
            <view class="list">
              <!-- 此处要注意 currentCateId和item.id都要为number类型；apifox设为了string-->
              <view class="menu" :id="`menu-${item.id}`" :class="{ current: index == currentCateId, sticky: index == currentCateId }" v-for="(item, index) in goods" :key="index" @click.stop="handleMenuTap(item.id, index)">
                <text>{{ item.name }}</text>
                <view class="dot" v-if="menuCartNum(item.id)">{{ menuCartNum(item.id) }}</view>
              </view>
            </view>
          </view>
        </scroll-view>
        <!-- goods list begin -->
        <!-- 右侧商品列表 -->
        <scroll-view :scroll-anchoring="true" class="goods" :scroll-into-view="scrollIntoView" :show-scrollbar="false" :scroll-animation-duration="1000" scroll-with-animation scroll-y @scroll="rightScroll" scrolltolower="scrollToBottom">
          <view class="wrapper">
            <!-- 商品列表最上方的广告轮播图 -->
            <swiper class="ads" :id="'ads'" autoplay :interval="3000" indicator-dots>
              <swiper-item v-for="(item, index) in ads" :key="index">
                <image :src="item.image" fade-show="true" @click="goImageDetail(item)"></image>
              </swiper-item>
            </swiper>
            <!-- 右侧商品列表 -->
            <view class="list">
              <!-- category begin -->
              <view class="category" v-for="(item, index) in goods" :key="index" :id="`cate-${item.id}`">
                <!-- 每种商品的商品头 -->
                <view class="title">
                  <text>{{ item.name }}</text>
                  <image :src="item.icon" class="icon"></image>
                </view>
                <!-- 详细内容 -->
                <view class="items">
                  <!-- 商品 begin -->
                  <view class="good" v-for="(good, key) in item.goods_list" :key="key">
                    <image :src="good.images" class="image" @click="showGoodDetailModal(item, good)"></image>
                    <view class="right">
                      <text class="name">{{ good.name }}</text>
                      <text class="tips">{{ good.content }}</text>
                      <view class="price_and_action">
                        <text class="price">￥{{ good.price }}</text>
                        <!-- 判断是否是添加了购物车内容的状态 -->
                        <!-- 如果未选择，则显示选规格等操作 -->
                        <!-- 2023-05-23 23:23:25 这里应该是判断是否打烊，可以判断是否可以进行商品挑选的 -->
                        <div v-if="!isclose">
                          <view class="btn-group" v-if="good.use_property">
                            <!-- <span>{{ good.use_property }}</span> -->
                            <button type="default" class="btn property_btn" hover-class="none" size="mini" @click="showGoodDetailModal(item, good)"> 选规格 </button>
                            <view class="dot" v-if="goodCartNum(good.id)">{{ goodCartNum(good.id) }}</view>
                          </view>
                          <!-- 进行商品添加增删 -->
                          <view class="btn-group" v-else>
                            <!-- 左侧减少商品按钮 -->
                            <uni-icons v-if="goodCartNum(good.id)" type="minus" size="60rpx" color="#919293" @click="handleReduceFromCart(item, good)"></uni-icons>
                            <view class="number" v-if="goodCartNum(good.id)">{{ goodCartNum(good.id) }}</view>
                            <!-- 右侧增加商品按钮,初始化时默认给1 -->
                            <uni-icons type="plus-filled" size="60rpx" color="#adb838" @click="handleAddToCart(item, good, 1)"></uni-icons>
                          </view>
                        </div>
                      </view>
                    </view>
                  </view>
                  <!-- 商品 end -->
                </view>
              </view>
              <!-- category end -->
            </view>
          </view>
        </scroll-view>
        <!-- goods list end -->
      </view>
      <!-- content end -->
      <!-- 购物车栏 begin -->
      <view v-if="isclose" class="toolbar">
        <div>
          <span>休息中（营业时间：9:00-21:00）</span>
        </div>
      </view>
      <view v-else>
        <!-- 吸底工具栏 -->
        <view class="toolbar" v-if="cart.length > 0">
          <view :class="[{ hideCard: !isFreeCard, showCard: isFreeCard }]" @click="clickCard" class="isfree-card">
            <uni-icons type="gift-filled" color="#fab714" size="30" />
            卡券{{ cardNumber }}张
          </view>
          <view class="leftContainer">
            <view class="mark">
              <image src="/static/images/menu/cart.png" class="cart-img" @click="openCartPopup"></image>
              <view class="tag">{{ getCartGoodsNumber }}</view>
            </view>
            <view class="price">
              ￥{{ getCartGoodsPrice }}
              <view style="font-size: 30rpx; font-weight: 300; text-decoration: line-through; margin-left: 8rpx">￥{{ 457 }}</view>
            </view>
          </view>
          <button type="default" style="background-color: #adb838" class="pay-btn" @click="toPay" :disabled="disabledPay">
            {{ disabledPay ? `差${spread}元起送` : '去结算' }}
          </button>
        </view>
      </view>

      <!-- 购物车栏 end -->
    </view>
    <!-- 商品详情模态框 begin -->
    <myModal :show="goodDetailModalVisible" color="#5A5B5C" width="90%" custom padding="0rpx" radius="12rpx">
      <view class="good-detail-modal">
        <view class="cover">
          <image v-if="good.images" :src="good.images" class="image"></image>
          <view class="btn-group">
            <image src="/static/images/menu/share-good.png"></image>
            <image src="/static/images/menu/close.png" @click="closeGoodDetailModal"></image>
          </view>
        </view>
        <scroll-view class="detail" scroll-y>
          <view class="wrapper">
            <view class="basic">
              <view class="name">{{ good.name }}</view>
              <view class="tips">{{ good.content }}</view>
            </view>
            <view class="properties" v-if="good.use_property">
              <view class="property" v-for="(item, index) in good.property" :key="index">
                <view class="title">
                  <text class="name">{{ item.name }}</text>
                  <view class="desc" v-if="item.desc">({{ item.desc }})</view>
                </view>
                <view class="values">
                  <view class="value" v-for="(value, key) in item.values" :key="key" :class="{ default: value.is_default }" @click="changePropertyDefault(index, key)">
                    {{ value.value }}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
        <div v-if="!isclose">
          <view class="action">
            <view class="left">
              <view class="price">￥{{ good.price }}</view>
              <view class="props" v-if="getGoodSelectedProps(good)">
                {{ getGoodSelectedProps(good) }}
              </view>
            </view>
            <!-- 同样的，打烊后不许操作购物内容 -->
            <view class="btn-group">
              <uni-icons type="minus" size="60rpx" color="#919293" @click="handlePropertyReduce"></uni-icons>
              <view class="number">{{ good.number }}</view>
              <uni-icons type="plus-filled" size="60rpx" color="#adb838" @click="handlePropertyAdd"></uni-icons>
            </view>
          </view>
          <view class="add-to-cart-btn" @click="handleAddToCartInModal">
            <view>加入购物车</view>
          </view>
        </div>
      </view>
    </myModal>
    <!-- 商品详情模态框 end -->
    <!-- 购物车详情popup -->
    <uni-popup type="bottom" background-color="#fff" ref="popup" :mask-click="true" @maskClick="closePopup">
      <view class="cart-popup">
        <view class="top" @click="handleCartClear">
          <uni-icons type="trash" color="#adb838" size="26"></uni-icons>
          <text>清空</text>
        </view>
        <scroll-view class="cart-list" scroll-y>
          <view class="wrapper">
            <view class="good" v-for="(good, key) in cart" :key="key">
              <image :src="good.image" class="image" />
              <view class="right">
                <text class="name">{{ good.name }}</text>
                <text v-if="good.use_property" class="tips">{{ good.props_text }}</text>
                <view class="price_and_action">
                  <text class="price">￥{{ good.price }}</text>
                  <!-- 进行商品添加增删 -->
                  <view class="btn-group">
                    <!-- 左侧减少商品按钮 -->
                    <uni-icons type="minus" size="60rpx" color="#919293" @click="handleCartItemReduce(key)"></uni-icons>
                    <!-- <view class="number">{{ goodCartNum(good.id) }}</view> -->
                    <!-- 右侧增加商品按钮,初始化时默认给1 -->
                    <view class="number">{{ good.number }}</view>
                    <uni-icons type="plus-filled" size="60rpx" color="#adb838" @click="handleCartItemAdd(key)"></uni-icons>
                  </view>
                </view>
              </view>
              <hr />
            </view>
            <view class="item" v-if="orderType == 'takeout' && store.packing_fee">
              <view class="left">
                <view class="name">包装费</view>
              </view>
              <view class="center">
                <text>￥{{ parseFloat(store.packing_fee) }}</text>
              </view>
              <view class="right invisible">
                <button type="default" plain size="mini" class="btn" hover-class="none">
                  <view class="iconfont iconsami-select"></view>
                </button>
                <view class="number">1</view>
                <button type="default" class="btn" size="min" hover-class="none">
                  <view class="iconfont iconadd-select"></view>
                </button>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </uni-popup>
  </view>
  <view class="loading" v-else>
    <image src="/static/images/loading.gif"></image>
  </view>
</template>

<script>
  import { modal as myModal } from '@/components/modal/modal';
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

  export default {
    components: {
      myModal,
    },
    data() {
      return {
        isclose: false, //是否打烊
        h: -4,
        isFreeCard: true,
        cardNumber: 0,
        scrollTop: '',
        testGoods: ['http://dummyimage.com/600x900', 'http://dummyimage.com/600x1100'],
        goods: [], //所有商品
        // 右侧商品列表最上方轮播图广告图片链接
        ads: [
          { image: 'https://img-shop.qmimg.cn/s23107/2020/04/27/4ebdb582a5185358c4.jpg?imageView2/2/w/600/h/600' },
          { image: 'https://images.qmai.cn/s23107/2020/05/08/c25de6ef72d2890630.png?imageView2/2/w/600/h/600' },
          { image: 'https://img-shop.qmimg.cn/s23107/2020/04/10/add546c1b1561f880d.jpg?imageView2/2/w/600/h/600' },
          { image: 'https://images.qmai.cn/s23107/2020/04/30/b3af19e0de8ed42f61.jpg?imageView2/2/w/600/h/600' },
          { image: 'https://img-shop.qmimg.cn/s23107/2020/04/17/8aeb78516d63864420.jpg?imageView2/2/w/600/h/600' },
        ],
        loading: true,
        currentCateId: 0, //默认分类；默认分类设置为最上方的那个分类，设为88
        cateScrollTop: 0,
        menuScrollIntoView: null,
        cart: [], //购物车；可以考虑从缓存读取数据，若缓存没有再从服务器读取，同时考虑及时更新缓存内容
        goodDetailModalVisible: false, //是否饮品详情模态框
        good: {}, //当前饮品
        category: {}, //当前饮品所在分类
        cartPopupVisible: false,
        sizeCalcState: false,
        safeAreaInsets: '', //安全区域
        statusBar: '',
        windowHeight: '',
        surpluslHeight: '', //cartlist距离底部的距离
        mainDistance: 0, // 存放滚动的高度
        heightArr: [], // 存放每个类目的高度
        heightNumber: 0, // 一次递增的累积高度
        scrollIntoView: null,
        isClicked: false,
        isClicked2: false,
      };
    },
    async onLoad() {
      await this.init();
    },
    onShow() {
      // #ifdef MP-ALIPAY
      my.hideBackHome();
      // #endif
      // 获取本地时间与 UTC 时间的时间差（单位为分钟）
      const localOffset = new Date().getTimezoneOffset();
      // 计算目标时区与 UTC 时间的时间差
      const beijingOffset = -480; // 北京时间为东八区，UTC+8
      const offsetDiff = beijingOffset - localOffset;
      // 使用时间差来获取当前北京时间
      const now = new Date(Date.now() + offsetDiff * 60 * 1000);
      // 判断当前时间是否在早上 9 点到晚上 9 点之间
      const hour = now.getHours();
      const isBetween9and21 = hour >= 9 && hour < 23;
      if (isBetween9and21) {
        this.isclose = false;
        console.log('当前时间在早上9点到晚上9点之间！');
      } else {
        this.isclose = true;
        console.log('当前时间不在早上9点到晚上9点之间！');
      }
    },
    mounted() {
      this.safeAreaInsets = uni.getSystemInfoSync().safeAreaInsets;
      this.windowHeight = uni.getSystemInfoSync().windowHeight;
      let height = uni.getSystemInfoSync().safeArea?.height;
      console.log('screenHeight = ', this.windowHeight, 'height', height);
      this.statusBar = uni.getSystemInfoSync().statusBarHeight;
      console.log('safeAreaInsets', this.safeAreaInsets?.top, 'statusBar', this.statusBar);
      // 获取其他容器高度
    },
    computed: {
      ...mapState(['orderType', 'address', 'store']),
      ...mapGetters(['isLogin']),
      calculateMarginTop() {
        return this.safeAreaInsets?.top + 'px'; // 设置底部外边距的数值
      },
      calculateStatusBarHeight() {
        return this.statusBar + 'px'; // 设置底部外边距的数值
      },
      calculateWindowHeight() {
        return this.windowHeight - this.statusBar + 'px'; // 可使用窗口高度
      },
      goodCartNum() {
        //计算单个饮品添加到购物车的数量
        return (id) =>
          this.cart.reduce((acc, cur) => {
            if (cur.id === id) {
              return (acc += cur.number);
            }
            return acc;
          }, 0);
      },
      menuCartNum() {
        return (id) =>
          this.cart.reduce((acc, cur) => {
            if (cur.cate_id === id) {
              return (acc += cur.number);
            }
            return acc;
          }, 0);
      },
      getCartGoodsNumber() {
        //计算购物车总数
        return this.cart.reduce((acc, cur) => acc + cur.number, 0);
      },
      getCartGoodsPrice() {
        //计算购物车总价
        return this.cart?.reduce((acc, cur) => acc + cur.number * cur.price, 0) || 0;
      },
      disabledPay() {
        //是否达到起送价
        return this.orderType == 'takeout' && this.getCartGoodsPrice < this.store.min_price ? true : false;
      },
      spread() {
        //差多少元起送
        if (this.orderType != 'takeout') return;
        return parseFloat((this.store.min_price - this.getCartGoodsPrice).toFixed(2));
      },
      calAmination() {
        return this.isFreeCard ? 1 : 2;
      },
    },
    methods: {
      ...mapMutations(['SET_ORDER_TYPE']),
      ...mapActions(['getStore']),
      buyCard() {
        console.log(1);
        uni.navigateTo({ url: '/pages/giftcard/giftcard' });
      },
      goImageDetail(item) {
        console.log('前往轮播图活动页面', item);
      },
      async init() {
        //页面初始化
        this.loading = true;
        await this.getStore();
        // this.goods = await this.$api('goods');
        this.goods = await this.$api('def');
        this.loading = false;
        this.cart = uni.getStorageSync('cart') || [];
        this.getProductAllData();
      },
      takout() {
        if (this.orderType == 'takeout') return;
        if (!this.isLogin) {
          uni.navigateTo({ url: '/pages/login/login' });
          return;
        }
        uni.navigateTo({
          url: '/pages/address/address?is_choose=true',
        });
      },

      // 获取所有商品数据
      getProductAllData() {
        let heightArr = [];
        let heightNumber = 0; // 一次递增的累积高度
        const _dataLength = this.goods.length; // 类目数量
        for (let i = 0; i < _dataLength; i++) {
          // 100 为类目的标题高度 200 为每个产品的高度(230改为200,去除margin-bottom)
          let height = 100 + 200 * this.goods[i].goods_list.length;
          // 我们与上一个高度相加
          heightNumber += height;
          // +=  等于  heightNumber = heightNumber + height
          // 因为我们设置的是rpx，我们需要将rpx转成px
          heightArr.push(this.rpxTopx(heightNumber));
        }
        this.heightArr = heightArr;
      },
      // rpx转px
      rpxTopx(rpx) {
        const screenWidth = uni.getSystemInfoSync().screenWidth;
        return (screenWidth * Number.parseInt(rpx)) / 750;
      },
      // 右侧滚动触发
      rightScroll(e) {
        const { scrollTop } = e.detail;
        let _index = this.currentCateId; // 左边的高亮下标
        if (scrollTop > this.mainDistance) {
          // 如果大于mainDistance表示用户上滑
          if (_index + 1 < this.heightArr.length && scrollTop >= this.heightArr[_index]) {
            this.currentCateId = _index + 1;
          }
        } else {
          // 用户下滑
          // 先判断下标-1要大于0（左边标签第一个时就不减了）
          // 再判断用户滚动高度是否小于下标上一个总高度，如果小于就-1
          if (_index - 1 >= 0 && scrollTop < this.heightArr[_index - 1]) {
            this.currentCateId = _index - 1;
          }
        }
        this.mainDistance = scrollTop; // 最后我们才赋值
      },
      handleMenuTap(id, index) {
        this.currentCateId = index;
        this.scrollIntoView = 'cate-' + this.goods[index].id;
        console.log('scrollIntoView', this.scrollIntoView);
        return;
      },
      scrollToBottom() {
        console.log('onreachbottom');
      },
      handleGoodsScroll({ detail }) {
        //商品列表滚动事件
        if (!this.sizeCalcState) {
          this.calcSize();
        }
        // console.log('details', detail);
        const { scrollTop } = detail;
        console.log('scrollTop', scrollTop);
        this.scrollTop = scrollTop;
        if (scrollTop == 129) this.scrollTop = 0;
        // console.log('scrollTop detail', this.scrollTop);
        let init_tabs = this.goods.filter((item) => item.top);
        let tabs = this.goods.filter((item) => item.top <= scrollTop).reverse();

        // console.log('init tabs', init_tabs);
        console.log('tabs', tabs);

        // if (init_tabs.length - tabs.length == 1) {
        //   tabs.unshift(init_tabs[init_tabs.length]);
        //   // this.currentCateId = 97;
        //   // this.h = -180;
        // }
        // if (init_tabs.length - tabs.length == 0) {
        //   tabs = tabs;
        // }
        if (tabs.length > 0) {
          // 可以在这里加个限制，当滚动到大于页面的百分之几的时候，将tab赋值为menu中的最后一个就行了
          // 若当前的tabs和初始化时的tabs相差一，则显示初始化时的tabs的最后一个tabs
          this.currentCateId = tabs[0].id;
        }
      },
      calcSize() {
        let h = this.h;
        let view = uni.createSelectorQuery().select('#ads');
        view
          .fields(
            {
              size: true,
            },
            (data) => {
              console.log('datahei', data.height, data);
              h += Math.floor(data.height);
            },
          )
          .exec();

        this.goods.forEach((item) => {
          console.log('item', item);
          let view = uni.createSelectorQuery().select(`#cate-${item.id}`);
          view
            .fields(
              {
                size: true,
              },
              (data) => {
                item.top = h;
                h += data.height;
                item.bottom = h + 4;
              },
            )
            .exec();
        });
        this.sizeCalcState = true;
      },
      // 此处包含所有商品信息。有蛋糕和饮品
      handleAddToCart(cate, good, num) {
        console.log('cate', cate, 'good', good, 'num', num);
        //添加到购物车
        const index = this.cart.findIndex((item) => {
          if (good.use_property) {
            return item.id === good.id && item.props_text === good.props_text;
          } else {
            return item.id === good.id;
          }
        });
        if (index > -1) {
          this.cart[index].number += num;
        } else {
          // TODO:这个地方会做视频属性处理添加进购物车
          this.cart.push({
            id: good.id,
            cate_id: cate.id,
            name: good.name,
            price: good.price,
            number: num,
            image: good.images,
            use_property: good.use_property,
            props_text: good.props_text,
            props: good.props,
          });
        }
        console.log('totally good', this.cart);
        uni.setStorageSync('cart', JSON.parse(JSON.stringify(this.cart)));
        console.log('universe', uni.getStorageSync('cart'));
      },
      handleReduceFromCart(item, good) {
        const index = this.cart.findIndex((item) => item.id === good.id);
        this.cart[index].number -= 1;
        if (this.cart[index].number <= 0) {
          this.cart.splice(index, 1);
        }
      },
      showGoodDetailModal(item, good) {
        console.log('item: ' + item, 'good: ' + good);
        this.good = JSON.parse(JSON.stringify({ ...good, number: 1 }));
        this.category = JSON.parse(JSON.stringify(item));
        this.goodDetailModalVisible = true;
      },
      closeGoodDetailModal() {
        //关闭饮品详情模态框
        this.goodDetailModalVisible = false;
        this.category = {};
        this.good = {};
      },
      changePropertyDefault(index, key) {
        //改变默认属性值
        this.good.property[index].values.forEach((value) => this.$set(value, 'is_default', 0));
        this.good.property[index].values[key].is_default = 1;
        this.good.number = 1;
      },
      getGoodSelectedProps(good, type = 'text') {
        //计算当前饮品所选属性
        if (good.use_property) {
          let props = [];
          good.property.forEach(({ values }) => {
            console.log('values', values);
            values.forEach((value) => {
              if (value.is_default) {
                props.push(type === 'text' ? value.value : value.id);
              }
            });
          });
          return type === 'text' ? props.join('，') : props;
        }
        return '';
      },
      handlePropertyAdd() {
        this.good.number += 1;
      },
      handlePropertyReduce() {
        if (this.good.number === 1) return;
        this.good.number -= 1;
      },
      handleAddToCartInModal() {
        // 在弹出层，即modal中队商品进行增删改，即有选择规格加料等商品中
        const product = Object.assign({}, this.good, { props_text: this.getGoodSelectedProps(this.good), props: this.getGoodSelectedProps(this.good, 'id') });
        this.handleAddToCart(this.category, product, this.good.number);
        this.closeGoodDetailModal();
      },
      openCartPopup() {
        //打开购物车列表popup,同时不显示卡券
        this.isFreeCard ? this.$refs.popup.open('botom') : this.$refs.popup.close();
        this.isFreeCard = !this.isFreeCard;
        // 关闭之前的默认的弹出框
        // this.cartPopupVisible = !this.cartPopupVisible;
      },
      handleCartClear() {
        //清空购物车
        uni.showModal({
          title: '提示',
          content: '确定清空购物车么',
          success: ({ confirm }) => {
            if (confirm) {
              this.$refs.popup.close();
              this.isFreeCard = true;
              // this.cartPopupVisible = false;
              this.cart = [];
            }
          },
        });
      },
      handleCartItemAdd(index) {
        this.cart[index].number += 1;
      },
      handleCartItemReduce(index) {
        if (this.cart[index].number === 1) {
          this.cart.splice(index, 1);
        } else {
          this.cart[index].number -= 1;
        }
        if (!this.cart.length) {
          this.isFreeCard = true;
          this.$refs.popup.close();
          // this.cartPopupVisible = false;
        }
      },
      closePopup() {
        this.isFreeCard = true;
        this.$refs.popup.close();
      },
      clickCard() {
        uni.showToast({ title: '跳转到卡券页面' });
        // this.$refs.popup.open('bottom');
      },
      toPay() {
        // 点击去结算后，会缓存当前商品订单内容
        if (!this.isLogin) {
          uni.navigateTo({ url: '/pages/login/login' });
          return;
        }
        uni.showLoading({ title: '加载中' });
        uni.setStorageSync('cart', JSON.parse(JSON.stringify(this.cart)));
        uni.navigateTo({
          url: '/pages/pay/pay',
        });
        uni.hideLoading();
        // 取消loading
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import './menu.scss';
</style>
