<template>
  <div class="Edges-connects-colunm">
    <div :class="`Connect-btn-${className}`">
      <div
        v-if="operation === 'edit'"
        :class="`Connect-add Connect-add-${className === 'left' ? 'first' : 'last'}`"
        @click="addConnects"
      >
        +
      </div>
      <div
        v-else
        :class="`Connect-view Connect-add-${className === 'left' ? 'first' : 'last'}`"
      ></div>
      <div class="Connect-garden Left-garden"></div>
      <div :class="`Connect-line Connect-line-${className === 'left' ? 'first' : 'last'}`"></div>
      <div class="Connect-garden Right-garden"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    className: {
      type: String,
      default: 'left',
    },
    operation: {
      type: String,
    },
  },
  methods: {
    addConnects() {
      this.$emit('add-connect', this.index)
    },
  },
}
</script>
<style lang="less" scoped>
.Edges-connects-colunm {
  position: absolute;
  top: 62px;
  left: -80px;
  height: 30px;
  width: 120px;
  .Connect-garden {
    position: absolute;
    top: 4px;
    width: 10px;
    height: 10px;
    background-color: #329dce;
    border-radius: 50%;
  }

  .Connect-line {
    position: absolute;
    top: 9px;
    width: 31px;
    height: 2px;
    background: #5d5b5b;
  }

  .Connect-add {
    position: absolute;
    top: 0px;
    z-index: 1;
    width: 18px;
    height: 18px;
    background: white;
    border: 1px dashed #329dce;
    border-radius: 50%;

    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    text-align: center;
    color: black;

    &:hover {
      cursor: pointer;
      border: 1px dashed #5accbd;
    }
  }

  .Connect-view {
    position: absolute;
    top: 0px;
    z-index: 1;
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 50%;
    background: #329dce;
  }

  .Connect-btn-left {
    .Left-garden {
      left: 55px;
    }

    .Right-garden {
      left: 96px;
    }

    .Connect-line-first {
      left: 65px;
    }

    .Connect-add-first {
      left: 71px;
    }
  }

  .Connect-btn-right {
    .Left-garden {
      left: 373px;
    }

    .Right-garden {
      left: 415px;
    }

    .Connect-line-last {
      left: 383px;
    }

    .Connect-add-last {
      left: 390px;
      z-index: 1;
    }
  }
}
</style>
