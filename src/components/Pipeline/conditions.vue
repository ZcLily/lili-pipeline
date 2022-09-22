<template>
  <div class="conditions-wrapper">
    <div class="conditions-container">
      <div class="conditions-header">
        <i class="conditions-return" @click="conditionsReturn"></i>
        添加条件
      </div>
      <div class="conditions-task-list">
        <div
          class="task-container"
          v-for="task in PIPELINE_CONDITIONS"
          :key="task"
          @click="addTasks(task)"
        >
          <div class="task-icon">
            <i class="el-icon-setting"></i>
          </div>
          <div class="task-info">
            <div class="task-name">{{ task }}</div>
            <div class="task-des">{{ taskDescs[task] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { PIPELINE_CONDITIONS, taskDescs } from './config'
export default {
  data() {
    return {
      PIPELINE_CONDITIONS,
      taskDescs,
    }
  },
  methods: {
    addTasks(task) {
      this.$store.dispatch('toggleTask', task)
    },
    conditionsReturn() {
      this.$emit('conditions-return')
    },
  },
}
</script>
<style lang="less" scoped>
.conditions-wrapper {
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 2;
  width: 400px;
  height: 100%;
  background-color: #fff;
  border-radius: 0 8px 8px 0;
  overflow: hidden;
  box-shadow: -2px 0 4px 0 rgba(36, 46, 66, 0.1);
  cursor: auto;

  .conditions-container {
    margin: 20px;

    .conditions-header {
      line-height: 50px;
      font-size: 16px;
      font-weight: bold;

      i {
        display: inline-block;
        height: 32px;
        width: 32px;
        margin-right: 20px;
        vertical-align: text-bottom;
        cursor: pointer;
        background: url('../../../static/pipeline/return.png');
      }
    }
  }

  .conditions-task-list {
    height: calc(100vh - 200px);
    overflow: auto;
    margin: 0 -4px;
    padding: 0 20px;

    .task-container {
      display: flex;
      padding: 12px 12px 12px 24px;
      border-radius: 4px;
      background-color: #fff;
      border: 1px solid #e3e9ef;
      margin-bottom: 8px;
      color: #242e42;
      cursor: pointer;

      .task-icon {
        flex-basis: 48px;
        min-width: 48px;
        line-height: 38px;

        i {
          font-size: 24px;
          color: #4a6d80;
        }
      }
    }
  }
}
</style>
