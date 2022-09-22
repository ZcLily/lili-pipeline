<template>
  <div class="steps-wrapper">
    <div class="steps-container">
      <div class="steps-header">
        <i class="steps-return" @click="stepsReturn"></i>
        添加步骤
      </div>
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <el-tab-pane
          :label="tab.tabLabel"
          :name="tab.tabName"
          v-for="(tab, index) in PIPELINE_TASKS"
          :key="index"
        >
          <div class="steps-task-list">
            <div
              class="task-container"
              v-for="(task, taskIndex) in tab.tasks"
              :key="taskIndex + 'task'"
              @click="addTasks(task)"
            >
              <div class="task-icon">
                <i class="el-icon-setting"></i>
              </div>
              <div class="task-info">
                <div class="task-name">{{ task.taskLabel }}</div>
                <div class="task-des">{{ taskDescs[task.taskName] }}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { PIPELINE_TASKS, taskDescs } from './config'
import { stepsDes } from './cicd.js'
export default {
  props: {
    stepsData: {
      type: Array,
    },
  },
  data() {
    return {
      activeName: 'All',
      PIPELINE_TASKS,
      taskDescs,
      stepsDes,
    }
  },
  methods: {
    tabClick() {
      // console.log(this.activeName)
    },
    stepsReturn() {
      this.$emit('steps-return')
    },
    addTasks(task) {
      this.$store.dispatch('toggleTask', task.taskName)
    },
  },
}
</script>
<style lang="less">
.steps-wrapper {
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

  .steps-container {
    margin: 20px;

    .steps-header {
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

    .el-tabs__nav-wrap {
      padding-left: 30px;
    }
  }

  .steps-task-list {
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

      .task-info {
      }
    }
  }
}
</style>
