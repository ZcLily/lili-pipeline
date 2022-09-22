<template>
  <div class="remind-container">
    <i :class="iconName" style="color:#2191ca;"></i>
    <span>
			<slot></slot>
		</span>
  </div>
</template>
<script>
export default {
	name: 'reminder',
	props: {
		iconClass: {
      type: String,
      required: true
    },
	},
	computed: {
		iconName() {
      return `el-icon-${this.iconClass}`
    },
	}
}
</script>
<style lang="less" scoped>
.remind-container {
    background-color: rgba(199, 222, 239, .65);
    color: #326e93;
    padding: 10px;
    margin-bottom: 20px;
  }
</style>

