<template>
  <div>
    <div class="container">
      <div class="box" @click="handleClick">
        <span v-if="!isClicked">xx</span>
      </div>
      <div class="box2" :class="[{ slideOutLeft: isClicked, slideOutRight: isClicked2 }]" @click="handleClick">handleClick</div>
      <div class="box3" @click="removeClass">removeClass</div>
    </div>
    <div class="A">
      <div class="A1">xx</div>
      <div class="A2">ee</div>
      <div class="A3">vv</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isClicked: false,
        isClicked2: false,
      };
    },
    methods: {
      handleClick() {
        this.isClicked2 = false;
        this.isClicked = true;
        setTimeout(() => {}, 500);
      },
      removeClass() {
        // 延迟一段时间后重置 isClicked 状态，以便再次触发动画
        this.isClicked2 = true;
        this.isClicked = false;
        setTimeout(() => {}, 500);
      },
    },
  };
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    & .box {
      flex: 1;
      height: 100%;
      background-color: #f00;
      cursor: pointer;
    }
    & .box2 {
      flex: 2;
      height: 100%;
      background-color: #e81;
    }
    & .box3 {
      width: 150px;
      height: 100%;
      background-color: rgba(34, 238, 136, 0.863);
    }
  }

  .slideOutLeft {
    animation-name: slideOutLeft;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }
  .hideCard {
    animation-name: hideCard;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }
  @keyframes hideCard {
    /* from表示动画的开始位置，也可以使用0%来表示。 */
    from {
    }
    /* to表示动画的结束位置，也可以使用100%来表示。 */
    to {
      flex: 0;
    }
  }
  .showCard {
    animation-name: showCard;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }
  @keyframes showCard {
    /* from表示动画的开始位置，也可以使用0%来表示。 */
    from {
      flex: 0;
    }
    /* to表示动画的结束位置，也可以使用100%来表示。 */
    to {
      flex: 1;
    }
  }
  @keyframes slideOutLeft {
    from {
      transform: translate3d(0, 0, 0);
    }

    to {
      flex: 12;
      transform: translate3d(-100%, 0, 0);
    }
  }
  @keyframes slideOutRight {
    from {
      transform: translate3d(-100%, 0, 0);
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  .slideOutRight {
    animation-name: slideOutRight;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }
</style>
