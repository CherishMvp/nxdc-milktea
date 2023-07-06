<template>
  <view class="classify-container">
    <view class="container-header">
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff">
        <swiper-item v-for="(item, index) in 8" :key="index">
          <view class="swiper-item">
            <image class="swiper-img" src="https://yanxuan.nosdn.127.net/static-union/16805163298d320c.jpg" mode="aspectFill"></image>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view class="container" :style="'height:' + rightScrollMain + 'px;'">
      <view class="main" :style="'height:' + rightScrollMain + 'px;'">
        <view class="main_left">
          <view v-for="(item, index) in allData" :key="id" class="left_item" :class="mainLeftIndex == index ? 'left_item_active' : ''" @click="mainLeftItemTap(index)">
            {{ item.name }}
          </view>
        </view>
        <scroll-view class="main_right" scroll-y scroll-with-animation :style="'height:' + rightScrollMain + 'px;'" :scroll-into-view="intoViewId" @scroll="rightScroll">
          <view class="main_right_box" v-for="(item, index) in allData" :key="item.id" :id="'scroll' + item.id">
            <view class="right_tap">
              {{ item.name }}
            </view>
            <view class="right_item" v-for="(item, index) in item.list" :key="listId">
              <view class="item_img_box">
                <image class="item_img" :src="item.phoneImg" mode="" />
              </view>
              <view class="item_right">
                <view class="right_title">{{ item.title }}</view>
                <view class="right_price"> ￥{{ item.price }} </view>
                <view class="right_bottom">
                  <view class="bottom_left"> 5折 </view>
                  <view class="bottom_right">+</view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        allData: [
          {
            name: 'Xiaomi手机',
            id: 1111,
            list: [
              {
                title: 'Xiaomi 13',
                price: 4999,
                listId: 1523,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202211292343_1fb2e2ce696643e2e9e863f69cdaf781.png',
              },
              {
                title: 'Xiaomi 13 限量定制色',
                price: 3999,
                listId: 1523,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202211292351_92aba2c69123166a74ba2e2b525b1ae2.png',
              },
              {
                title: 'Xiaomi 12S Ultra',
                price: 4999,
                listId: 1523,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202207011810_86ad513472d1423a3fdec8d7d5107038.png',
              },
              {
                title: 'Xiaomi 12S Pro',
                price: 5999,
                listId: 23,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202207012000_0b9df066c110f201154013ac373df1d9.png',
              },
              {
                title: 'Xiaomi 12S',
                price: 4099,
                listId: 14,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202211292351_92aba2c69123166a74ba2e2b525b1ae2.png',
              },
              {
                title: 'Xiaomi 12 Pro 天玑版',
                price: 4199,
                listId: 13,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/eac4850d9dbc5305b1298b8c1c686c17.png',
              },
              {
                title: 'Xiaomi 12 Pro',
                price: 3199,
                listId: 112,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/bec639601906ed7649970c6ab311f992.png',
              },
            ],
          },
          {
            name: 'Redmi手机',
            id: 2222,
            list: [
              {
                title: 'Redmi K60 Pro',
                price: 3299,
                listId: 15223,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202212261456_d20c10733b97c9395bd05c97092a4120.png',
              },
              {
                title: 'Redmi K60',
                price: 2499,
                listId: 223,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202212261429_eb1f972370482850735ca16e2121dd08.png',
              },
              {
                title: 'Redmi K50 Pro',
                price: 2699,
                listId: 124,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/bfe68c63caca6622d1673efa7d7e7a7d.png',
              },
              {
                title: 'Redmi K50',
                price: 2099,
                listId: 133,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/268eb39e48af6bb86e448e143a119eea.png',
              },
              {
                title: 'Redmi K40S',
                price: 100,
                listId: 13132,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8705d355125196baa7f8c2df87936290.png',
              },
            ],
          },
          {
            name: '游戏手机',
            id: 3333,
            list: [
              {
                title: '黑鲨5/黑鲨5 高能版',
                price: 2599,
                listId: 15233,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ef619ad3807b50ab8f6d12656fcc3721.png',
              },
              {
                title: '黑鲨5 Pro',
                price: 4199,
                listId: 233,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/29d255503783b6838beee713dd5630ec.png',
              },
              {
                title: '黑鲨5 RS',
                price: 2799,
                listId: 144,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f77f2b5c0a09d53f739e1cffe3394ca3.png',
              },
              {
                title: 'K50 电竞版',
                price: 3299,
                listId: 135,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f5d5806d6807671fd2a28d9a944b5358.png',
              },
              {
                title: '黑鲨5/黑鲨5 高能版',
                price: 2599,
                listId: 1124,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f77f2b5c0a09d53f739e1cffe3394ca3.png',
              },
              {
                title: '黑鲨5 Pro',
                price: 4199,
                listId: 233,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f77f2b5c0a09d53f739e1cffe3394ca3.png',
              },
              {
                title: '黑鲨5 RS',
                price: 4199,
                listId: 233,
                phoneImg: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f77f2b5c0a09d53f739e1cffe3394ca3.png',
              },
            ],
          },
        ], // 所有产品数据
        mainLeftIndex: 0, // 左边高亮下标
        intoViewId: null, // 滚动到指定位置id
        mainDistance: 0, // 存放滚动的高度
        heightArr: [], // 存放每个类目的高度
        heightNumber: 0, // 一次递增的累积高度
        windowHeight: 0,
        rightScrollMain: 0,
      };
    },
    methods: {
      // 获取所有商品数据
      getProductAllData() {
        let heightArr = [];
        let heightNumber = 0; // 一次递增的累积高度
        const _dataLength = this.allData.length; // 类目数量
        for (let i = 0; i < _dataLength; i++) {
          // 50 为类目的标题高度 200 为每个产品的高度
          let height = 50 + 200 * this.allData[i].list.length;
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
      // 导航左边点击
      mainLeftItemTap(idx) {
        this.mainLeftIndex = idx;
        this.intoViewId = 'scroll' + this.allData[idx].id;
      },
      // 右侧滚动触发
      rightScroll(e) {
        const { scrollTop } = e.detail;
        let _index = this.mainLeftIndex; // 左边的高亮下标
        if (scrollTop > this.mainDistance) {
          // 如果大于mainDistance表示用户上滑
          if (_index + 1 < this.heightArr.length && scrollTop >= this.heightArr[_index]) {
            this.mainLeftIndex = _index + 1;
          }
        } else {
          // 用户下滑
          // 先判断下标-1要大于0（左边标签第一个时就不减了）
          // 再判断用户滚动高度是否小于下标上一个总高度，如果小于就-1
          if (_index - 1 >= 0 && scrollTop < this.heightArr[_index - 1]) {
            this.mainLeftIndex = _index - 1;
          }
        }
        this.mainDistance = scrollTop; // 最后我们才赋值
      },
    },
    onLoad() {
      this.getProductAllData();
    },
    onReady() {
      const query = uni.createSelectorQuery();
      query
        .select('.container-header')
        .boundingClientRect((data) => {
          uni.getSystemInfo({
            success: (res) => {
              console.log('res.windowHeight', res.windowHeight); // 可使用窗口高度，不包含导航栏
              this.windowHeight = res.windowHeight;
              this.rightScrollMain = this.windowHeight - data.height;
            },
          });
          console.log('data: ', data, 'this.windowHeight');
          // this.rightScrollMain = 500;

          console.log('this.rightScrollMain', this.rightScrollMain);
        })
        .exec();
    },
  };
</script>
<style lang="scss">
  .classify-container {
    .container-header {
      swiper {
        width: 100%;
        height: 360rpx;
      }

      .swiper-img {
        width: 100%;
        height: 360rpx;
      }
    }
  }

  .container {
    --borderColor: rgba(230, 224, 224, 0.733);
    border-radius: 10rpx 10rpx 0 0;
    margin-top: -10rpx;
    background-color: #fff;
    font-size: 32rpx;

    .cont_title {
      width: 140rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-bottom: 6rpx solid #000;
      margin: 0 auto;
      font-weight: 500;
      font-size: 36rpx;
      box-sizing: border-box;
    }

    .cont_info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 20rpx;
      box-sizing: border-box;
      height: 80rpx;
      line-height: 80rpx;
      border-bottom: 2rpx solid var(--borderColor);

      .info_left {
        color: gray;
      }

      .info_right {
        color: rgb(50, 36, 247);
        height: 100%;
        line-height: 80rpx;

        .right_img {
          width: 30rpx;
          height: 30rpx;
          margin-top: -6rpx;
          vertical-align: middle;
        }
      }
    }

    .main {
      width: 100%;
      // height: calc(100vh - 80rpx - 80rpx - 300rpx + 10rpx);
      display: flex;
      font-size: 32rpx;

      .main_left {
        width: 200rpx;
        border-right: 2rpx solid var(--borderColor);
        color: gray;
        height: 100%;

        .left_item {
          width: 100%;
          height: 120rpx;
          line-height: 120rpx;
          padding: 20rpx;
          box-sizing: border-box;
          font-size: 24rpx; // overflow: hidden;
        }

        .left_item_active {
          color: #000;
          font-weight: 500;
          position: relative;

          &::before {
            content: '';
            position: absolute;
            width: 10rpx;
            height: 40rpx;
            background-color: red;
            top: 50%;
            left: 0;
            transform: translateX(-50%);
          }
        }
      }

      .main_right {
        flex: 1;
        padding: 10rpx;
        box-sizing: border-box;

        .right_tap {
          width: 100%;
          height: 50rpx;
          line-height: 50rpx;
          font-weight: 700;
          font-size: 30rpx;
          position: sticky;
          top: 0;
          background-color: #fff;
        }

        .right_item {
          display: flex;
          font-size: 36rpx;

          .item_img_box {
            width: 200rpx;
            height: 200rpx;
            padding: 10rpx;
            box-sizing: border-box;
            flex-shrink: 0;

            .item_img {
              width: 100%;
              height: 100%;
            }
          }

          .item_right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 10rpx;
            box-sizing: border-box;

            .right_title {
              font-weight: 500;
              font-size: 26rpx;
            }

            .right_price {
              color: rgb(226, 51, 51);
              font-weight: 500;
            }

            .right_bottom {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 300rpx;

              .bottom_left {
                border: 3rpx solid red;
                font-size: 24rpx;
                color: red;
                height: 30rpx;
                line-height: 30rpx;
                padding: 0 6rpx;
              }

              .bottom_right {
                background-color: red;
                color: #fff;
                border-radius: 6rpx;
                width: 40rpx;
                height: 40rpx;
                line-height: 34rpx;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
</style>
