<template>
  <view class="notice">
    <image class="left_icon" mode="aspectFit" src="/static/images/menu/notice-fill.png"> </image>
    <view class="right_notice">
      <swiper class="swiper" vertical easing-function="easeInOutCubic" autoplay interval="6000">
        <swiper-item class="switem" v-for="(item, index) in noticeList" :key="index" @click="itemClick(item)">
          <text class="text" :style="{ color: colors }">{{ item.title }}</text>
          <view class="righttext">
            <text :style="{ color: colors }">点击查看</text>
            <view class="iconfont iconarrow-down"></view>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return { show: false };
    },

    components: {},
    props: {
      colors: {
        type: String,
        default: '#333',
      },
      noticeList: {
        type: Array,
      },
    },
    methods: {
      showPopupBottom() {},
      itemClick(item) {
        // 吊起uview的popup
        // this.open();
        this.$emit('click', item);
      },
    },
  };
</script>
<style scoped lang="scss">
  .notice {
    height: 24px;
    display: flex;
    align-items: center;
    .left_icon {
      width: 15px;
      margin: 0 4px;
      height: 15px;
    }
    .right_notice {
      flex: 1;
      height: 100%;
      .swiper {
        height: 100%;
        .switem {
          height: 80%;
          text-align: center;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .text {
            width: 80%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: left;
          }
          .righttext {
            width: 30%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
</style>
