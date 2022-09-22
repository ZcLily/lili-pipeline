<template>
  <div class="stage-wrapper">
    <div class="stage-container">
      <div class="stage-tilte">
        阶段
        <i class="el-icon-delete" @click="deleteStages"></i>
      </div>
      <div class="stage-name">
        <p>名称</p>
        <el-input v-model="stageData.stage_name"></el-input>
      </div>
      <div class="stage-condition">
        <p style="margin-bottom: 10px">
          <span>条件</span>
          执行当前阶段所需要满足的条件 （可选）
        </p>
        <p></p>
        <div class="condition-container" v-if="conditionsData.length">
          <ul>
            <li v-for="(condition, index) in conditionsData" :key="index">
              <div class="s-w-button">
                <span
                  class="el-icon-delete"
                  @click="deleteConditions(conditionsData, index)"
                ></span>
              </div>
              <div class="s-w-title">
                <i class="el-icon-menu"></i>
                {{ stepsDes[condition.name] ? stepsDes[condition.name] : condition.name }}
              </div>
              <div v-if="Array.isArray(condition.arguments)">
                <div
                  class="s-w-form"
                  v-for="(item, itemIndex) in condition.arguments"
                  :key="itemIndex + 'item'"
                >
                  <div v-if="!['changelog', 'poll', 'credentialsId'].includes(item.key)">
                    <div>
                      {{
                        stepsDes[item.key] ? stepsDes[item.key] : item.key
                      }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.value.value }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div>{{ condition.arguments.value }}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="s-w-add" @click="addConditions">
          <i class="el-icon-plus"></i>
          添加条件
        </div>
      </div>
      <div class="stage-steps">
        <p style="margin-bottom: 10px"><span>任务</span></p>
        <div class="steps-container" v-if="stepsData.length">
          <ul>
            <li v-for="(step, index) in stepsData" :key="index">
              <div class="s-w-button">
                <span
                  class="el-icon-edit"
                  @click="editTask(step, index)"
                  v-if="step.editable"
                ></span>
                <span
                  class="el-icon-delete"
                  @click="deleteTask(stepsData, index)"
                  v-if="step.can_delete"
                ></span>
              </div>
              <div class="s-w-title">
                <i class="el-icon-menu"></i>
                {{ stepsDes[step.name] ? stepsDes[step.name] : step.name }}
              </div>
              <div v-if="Array.isArray(step.arguments)">
                <div
                  class="s-w-form"
                  v-for="(item, itemIndex) in step.arguments"
                  :key="itemIndex + 'item'"
                >
                  <div v-if="!['changelog', 'poll', 'credentialsId'].includes(item.key)">
                    <div v-if="item.key === 'scm'">
                      <div>
                        {{ 'remote' }}&nbsp;&nbsp;&nbsp;&nbsp;{{
                          item.value.value | getValue('remote')
                        }}
                      </div>
                      <div>
                        {{ 'credentialsId' }}&nbsp;&nbsp;&nbsp;&nbsp;{{
                          item.value.value | getValue('credentialsId')
                        }}
                      </div>
                    </div>
                    <div v-else>
                      {{
                        stepsDes[item.key] ? stepsDes[item.key] : item.key
                      }}&nbsp;&nbsp;&nbsp;&nbsp;{{ item.value.value }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="s-w-form">
                  <div>
                    {{ step.arguments.value }}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="s-w-add" @click="addSteps">
          <i class="el-icon-plus"></i>
          添加步骤
        </div>
      </div>
    </div>
    <div class="stage-footer">
      <el-button round type="primary" @click="stageCommit">确认</el-button>
    </div>
  </div>
</template>
<script>
import { stepsDes } from './cicd.js'
import { isString, pick } from 'lodash'
import { groovyToJS } from './utils'
export default {
  props: {
    stageData: {
      type: Object,
      default: null,
    },
  },
  filters: {
    getValue(value, key) {
      if (isString(value) && value.startsWith('[')) {
        let obj = groovyToJS(value)
        obj = pick(obj, [key])
        return obj[key]
      } else {
        return ''
      }
    },
  },
  data() {
    return {
      stepsDes,
      stepsData: [],
      conditionsData: [],
    }
  },
  watch: {
    stageData(stage) {
      if (stage) {
        this.getStageData()
      }
    },
  },
  methods: {
    deleteStages() {
      this.$emit('delete-stage', this.stageData.stage_name)
    },
    stageCommit() {
      this.$emit('stage-commit')
    },
    getStageData() {
      this.stepsData = this.stageData.steps
      this.conditionsData = this.stageData.conditions
    },
    addSteps() {
      this.$emit('add-steps', 'add')
    },
    editTask(step, index) {
      this.$store.dispatch('toggleOperation', 'edit')
      this.$store.dispatch('toggleTask', step.name)
      this.$store.dispatch('toggleTaskData', step)
      this.$store.dispatch('toggleTaskIndex', index)
    },
    deleteTask(stepsData, index) {
      stepsData.splice(index, 1)
    },
    addConditions() {
      this.$emit('add-conditions')
    },
    deleteConditions(conditions, index) {
      conditions.splice(index, 1)
    },
  },
  mounted() {
    this.getStageData()
  },
}
</script>
<style lang="less" scoped>
.stage-wrapper {
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

  .stage-container {
    margin: 20px;

    .stage-tilte {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;

      i {
        color: #329dce;
        margin-left: 300px;
        cursor: pointer;
      }
    }

    .el-input {
      margin: 4px 0;
    }

    div {
      span {
        font-size: 16px;
        font-weight: bold;
        margin-right: 10px;
      }
    }

    .stage-condition,
    .stage-steps,
    .condition-container,
    .steps-container {
      margin: 10px 0;
    }

    .s-w-add {
      height: 32px;
      border-radius: 4px;
      padding: 5px;
      background-color: #fff;
      border: 1px dashed #d8dee5;

      &:hover {
        cursor: pointer;
        border: 1px dashed #51a6d3;
        background-color: #eff4f9;
      }
    }

    .condition-container,
    .steps-container {
      ul {
        li {
          padding: 4px 12px;
          margin-bottom: 8px;
          line-height: 20px;
          border-radius: 4px;
          border: 4px solid #fff;
          background-color: #f9fbfd;
          word-break: break-all;
          white-space: normal;
        }
      }
    }

    .s-w-button {
      color: #329dce;
      font-size: 14px;
      float: right;

      span {
        margin-right: 10px;
        cursor: pointer;
      }
    }

    .s-w-title {
      color: #329dce;

      i {
        margin-right: 10px;
      }
    }
  }
}

.stage-footer {
  margin: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
