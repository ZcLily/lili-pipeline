<template>
  <div class="pipeline-wrapper">
    <div class="pipeline-container">
      <div class="pipeline-edit" v-show="operation !== 'empty'">
        <div class="pipeline-header" v-show="operation === 'view'">
          <el-button
            round
            type="primary"
            class="el-icon-edit"
            @click="editPipeline"
          >
            编辑流水线
          </el-button>
        </div>
        <div
          :class="['pipeline-panel', ableVal ? 'fold' : '']"
          data-container="pipeline"
          @mousedown="handleMouseDown"
          @mousemove="handleContentMove"
          @mouseup="handleMouseUp"
          @mouseleave="handleMouseLeave"
          ref="container"
        >
          <div class="pipeline-content" :style="{ transform: panelStyle }">
            <div class="Card-pipeline_column" v-if="!panelList.length">
              <Connects
                :index="0"
                @add-connect="addConnects"
                :operation="operation"
              ></Connects>
            </div>

            <div
              class="Card-pipeline_column"
              v-for="(block, index) in panelList"
              :key="index"
            >
              <Connects
                :index="index"
                @add-connect="addConnects"
                :operation="operation"
              ></Connects>
              <div class="Card-pipeline_column" v-if="panelList.length">
                <div
                  v-for="(stage, index1) in block.children"
                  :key="index1 + 'abc'"
                  :class="[
                    operation === 'view' && index1 + 1 === block.children.length
                      ? ''
                      : 'PipelineCard-edit-column',
                  ]"
                  @click.capture="editStage(stage)"
                >
                  <div class="PipelineCard-edit">
                    <div class="Card-pipelineCard-title">
                      {{ stage.stage_name }}
                    </div>
                    <div
                      :class="[
                        'Card-pipelineCard-content',
                        curStageName === stage.stage_name ? 'active' : '',
                      ]"
                    >
                      <div
                        class="Card-pipelineCard-conditions"
                        v-if="stage.conditions.length"
                      >
                        <p>条件</p>
                        <div
                          class="Card-pipelineCard-item"
                          v-for="(condition, index2) in stage.conditions"
                          :key="index2"
                        >
                          <div class="Item-title">
                            {{
                              stepsDes[condition.name]
                                ? stepsDes[condition.name]
                                : condition.name
                            }}
                          </div>
                          <div
                            class="Item-content"
                            v-if="Array.isArray(condition.arguments)"
                          >
                            <div
                              v-for="(item, index3) in condition.arguments"
                              :key="index3 + 'cdf'"
                            >
                              <div
                                v-if="
                                  ![
                                    'changelog',
                                    'poll',
                                    'credentialsId',
                                  ].includes(item.key)
                                "
                              >
                                <p>
                                  <span>
                                    {{
                                      stepsDes[item.key]
                                        ? stepsDes[item.key]
                                        : item.key
                                    }}
                                  </span>
                                  <span>{{ item.value.value }}</span>
                                </p>
                              </div>
                            </div>
                          </div>

                          <div class="Item-content" v-else>
                            <div>
                              <p>
                                <span>{{ condition.arguments.value }}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="Card-pipelineCard-item"
                        v-for="(step, index2) in stage.steps"
                        :key="index2"
                      >
                        <div class="Item-title">
                          {{
                            stepsDes[step.name]
                              ? stepsDes[step.name]
                              : step.name
                          }}
                        </div>
                        <div
                          class="Item-content"
                          v-if="Array.isArray(step.arguments)"
                        >
                          <div
                            v-for="(item, index3) in step.arguments"
                            :key="index3 + 'cdf'"
                          >
                            <div
                              v-if="
                                ![
                                  'changelog',
                                  'poll',
                                  'credentialsId',
                                ].includes(item.key)
                              "
                            >
                              <div v-if="item.key === 'scm'">
                                <div>
                                  <span>{{ stepsDes["remote"] }}</span>
                                  <span>{{
                                    item.value.value | getValue("remote")
                                  }}</span>
                                </div>
                                <div>
                                  <span>{{ stepsDes["credentialsId"] }}</span>
                                  <span>{{
                                    item.value.value | getValue("credentialsId")
                                  }}</span>
                                </div>
                              </div>
                              <div v-else>
                                <span>
                                  {{
                                    stepsDes[item.key]
                                      ? stepsDes[item.key]
                                      : item.key
                                  }}
                                </span>
                                <span>{{ item.value.value }}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="Item-content" v-else>
                          <div>
                            <p>
                              <span>{{ step.arguments.value }}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        class="Card-addSteps"
                        @click.stop="addSteps('add', stage.steps)"
                        v-if="operation === 'edit'"
                      >
                        <i class="el-icon-plus"></i>
                        添加步骤
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="PipelineCard-add-column"
                  @click="addEidts(block.children)"
                  v-if="operation === 'edit'"
                >
                  <div style="margin-left: 10px">
                    <i class="el-icon-plus"></i>
                    添加并行阶段
                  </div>
                </div>
              </div>
              <Connects
                :operation="operation"
                :index="index + 1"
                :className="'right'"
                @add-connect="addConnects"
                v-if="panelList.length && index === panelList.length - 1"
              ></Connects>
            </div>
          </div>
          <div class="pipeline-slider">
            <el-slider
              v-model="scale"
              :min="0"
              :max="1"
              :step="0.05"
              :show-tooltip="false"
              vertical
              height="100px"
            ></el-slider>
          </div>
        </div>
        <Stage
          v-if="ableVal === 'stages'"
          :stageData="stageData"
          @stage-commit="stageCommit"
          @add-steps="addSteps"
          @add-conditions="addConditions"
          @delete-stage="deleteStage"
        ></Stage>
        <Steps v-if="ableVal === 'steps'" @steps-return="returnStages"></Steps>
        <Conditions
          v-if="ableVal === 'conditions'"
          @conditions-return="returnStages"
        ></Conditions>
      </div>
      <div class="pipeline-add" v-show="operation === 'empty'">
        <div class="empty-card">
          <img src="../../../static/pipeline/empty-card.svg" />
        </div>
        <div class="empty-desc">
          <p>当前 Pipeline 中并没有找到相关配置文件</p>
          <el-button
            round
            type="primary"
            class="el-icon-edit"
            @click="editPipeline"
          >
            编辑流水线
          </el-button>
        </div>
      </div>
    </div>

    <div class="pipeline-footer">
      <div v-if="operation === 'edit'">
        <el-button round @click="cancle">取消</el-button>
        <el-button round type="primary" @click="save">保存</el-button>
      </div>
      <div v-else>
        <el-button round type="primary" @click="cancle">返回</el-button>
      </div>
    </div>

    <StepsSelector
      v-if="activeTask"
      :stageData="stageData"
      @steps-return="returnStages"
    ></StepsSelector>
  </div>
</template>
<script>
import { stepsDes } from "./cicd.js";
import { isString, pick } from "lodash";
import { groovyToJS } from "./utils";
import Stage from "./stage.vue";
import Steps from "./steps.vue";
import Connects from "./connects.vue";
import Conditions from "./conditions.vue";
import StepsSelector from "./StepsSelector/index.vue";
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    Stage,
    Steps,
    Connects,
    Conditions,
    StepsSelector,
  },
  filters: {
    getValue(value, key) {
      if (isString(value) && value.startsWith("[")) {
        let obj = groovyToJS(value);
        obj = pick(obj, [key]);
        return obj[key];
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      operation: "",
      translateX: 30,
      translateY: 30,
      scale: 1,
      stepsDes,
      ableVal: "",
      panelList: [],
      stageData: null,
      stepsData: [],
      curStageName: "",
    };
  },
  computed: {
    panelStyle() {
      return `translate3d(${this.translateX}px, ${this.translateY}px, 0px) scale(${this.scale})`;
    },
    activeTask() {
      return this.$store.state.pipeline.activeTask;
    },
  },
  created() {
    this.initData();
  },
  mounted() {
    this.addEvent();
  },
  methods: {
    addEvent() {
      const { container } = this.$refs;
      if (!container) return;
      this.removeEvent();
      container.addEventListener("wheel", this.handleWheel);
    },
    removeEvent() {
      const { container } = this.$refs;
      if (!container) return;
      container.removeEventListener("wheel", this.handleWheel, false);
    },
    initData() {
      this.initPosition = {
        x: 30,
        y: 30,
      };
      this.lastPosition = {
        x: 30,
        y: 30,
      };
      this.panelList = this.data;
      this.operation = this.panelList.length ? "view" : "empty";
    },
    // 获取唯一uid
    getUid() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    addConnects(index) {
      const item = {
        name: "",
        children: [
          {
            stage_name: "stage-" + this.getUid(),
            steps: [],
            conditions: [],
          },
        ],
      };
      this.panelList.splice(index, 0, item);
    },
    addEidts(stage) {
      const item = {
        stage_name: "stage-" + this.getUid(),
        steps: [],
        conditions: [],
      };
      stage.push(item);
    },
    addSteps(operation, steps) {
      this.ableVal = "steps";
      this.$store.dispatch("toggleOperation", operation);

      if (steps) {
        this.stepsData = steps;
      }
    },
    addConditions() {
      this.ableVal = "conditions";
    },
    returnStages() {
      this.ableVal = "stages";
    },
    editStage(stage) {
      if (this.operation !== "edit") {
        return;
      }
      this.ableVal = "stages";

      this.stageData = stage;

      this.curStageName = stage.stage_name;
    },
    stageCommit() {
      this.ableVal = "";
      this.curStageName = "";
    },
    deleteStage(stageName) {
      this.panelList.forEach((block, outIndex) => {
        if (block.children) {
          const index = block.children.findIndex((stage) => {
            return stage.stage_name === stageName;
          });
          if (index > -1) {
            block.children.splice(index, 1);
            if (!block.children.length) {
              this.panelList.splice(outIndex, 1);
            }
          }
        }
      });
      this.ableVal = "";
      this.curStageName = "";
    },
    editPipeline() {
      this.operation = "edit";
    },
    save() {
      this.$emit("save-pipeline", this.panelList);
    },
    cancle() {
      this.$emit("cancle-create");
    },
    handleMouseDown(e) {
      e.preventDefault();
      if (e.button !== 0) {
        return;
      }
      this.initPosition = {
        x: e.clientX,
        y: e.clientY,
      };
      this.DragContent = true;
    },
    handleContentMove(e) {
      if (this.DragContent) {
        this.translateX = e.clientX - this.initPosition.x + this.lastPosition.x;
        this.translateY = e.clientY - this.initPosition.y + this.lastPosition.y;
      }
    },
    handleMouseUp(e) {
      if (!this.DragContent) return;
      this.deltaX = e.clientX - this.initPosition.x;
      this.deltaY = e.clientY - this.initPosition.y;
      this.translateX = this.deltaX + this.lastPosition.x;
      this.translateY = this.deltaY + this.lastPosition.y;
      this.lastPosition = {
        x: this.translateX,
        y: this.translateY,
      };
      this.DragContent = false;
    },
    handleMouseLeave(e) {
      if (e.currentTarget.dataset.container === "pipeline") {
        this.lastPosition = {
          x: this.translateX,
          y: this.translateY,
        };
        this.DragContent = false;
      }
    },
    handleWheel(e) {
      e.preventDefault();
      e.stopPropagation();

      const direction = e.deltaY > 0 ? 1 : -1;
      const clientY = e.clientY;
      const clientX = e.clientX;
      const deltaScale =
        -0.01 * (Math.abs(e.deltaY) > 5 ? direction * 5 : e.deltaY);
      const _scale = this.scale + deltaScale;

      if (_scale <= 1 && _scale > 0.2) {
        if (clientX < this.translateX) {
          this.translateX = this.translateX;
        } else {
          this.translateX =
            -(deltaScale * (clientX - this.translateX)) / this.scale +
            this.translateX;
        }
        if (clientY < this.translateY) {
          this.translateY = this.translateY;
        } else {
          this.translateY =
            (-deltaScale * (clientY - this.translateY)) / this.scale +
            this.translateY;
        }
        this.scale = _scale;
        this.lastPosition = {
          x: this.translateX,
          y: this.translateY,
        };
      }
    },
  },
  beforeDestroy() {
    this.removeEvent();
  },
};
</script>
<style lang="less" scoped>
.pipeline-wrapper {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  z-index: 1100;
  background-color: rgba(35, 45, 65, 0.7);
  padding: 30px 20px;
}

.pipeline-container {
  position: relative;
  width: 100%;
  height: 100%;
  -ms-flex-positive: 1;
  flex-grow: 1;
  overflow: hidden;
  background-color: #eff4f9;
  background-repeat: repeat;
  cursor: grab;
  cursor: -webkit-grab;
  -ms-touch-action: none;
  touch-action: none;
  border-radius: 4px;

  .pipeline-header {
    height: 52px;
    line-height: 52px;
    background-color: #f9fbfd;
    -webkit-box-shadow: 0 1px 0 0 #e3e9ef;
    box-shadow: 0 1px 0 0 #e3e9ef;
    text-align: right;
    width: 100%;

    .el-button {
      margin-right: 10px;
    }
  }

  .pipeline-panel {
    position: relative;

    &.fold {
      width: calc(100vw - 440px);
    }

    height: calc(100vh - 60px);
    width: calc(100vw - 40px);

    .pipeline-slider {
      position: absolute;
      right: 0;
      top: 20px;
    }
  }

  .pipeline-content {
    display: inline-block;
    white-space: nowrap;
    transform-origin: 0 0;

    .Card-pipeline_column {
      position: relative;
      display: inline-block;
      margin: 10px 0 10px 31px;
      vertical-align: top;
      font-size: 12px;

      &:first-child {
        .PipelineCard-edit-column {
          &::before {
            border-left: 2px solid #dcd8d8;
          }
        }
      }

      &:last-child {
        .PipelineCard-edit-column {
          &::before {
            border-right: 2px solid #dcd8d8;
          }
        }
      }

      .PipelineCard-edit-column {
        position: relative;

        &::before {
          content: "";
          position: absolute;
          height: 100%;
          box-sizing: border-box;
          width: 320px;
          top: 60px;
          left: -32px;
          border-left: 2px solid #dcd8d8;
          border-right: 2px solid #dcd8d8;
          border-bottom: 2px solid #dcd8d8;
        }
      }

      .PipelineCard-edit {
        width: 256px;
        text-align: center;
        position: relative;
        z-index: 3;

        .Card-pipelineCard-title {
          display: inline-block;
          position: relative;
          top: 18px;
          padding-left: 20px;
          padding-right: 20px;
          height: 32px;
          max-width: 100%;
          font-size: 12px;
          font-weight: 500;
          line-height: 32px;
          color: #fff;
          border-radius: 16px;
          background-color: #242e42;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-wrap: normal;
          overflow: hidden;
        }

        .Card-pipelineCard-content {
          &.active {
            border: 1px solid #55bc8a;
          }

          padding: 22px 12px 20px;
          text-align: left;
          border-radius: 4px;
          background-color: #fff;
          border: 1px solid transparent;

          .Card-pipelineCard-conditions {
            background-color: rgba(255, 239, 177, 0.31);
            padding: 2px 8px 8px;
            margin-bottom: 10px;
          }

          .Card-pipelineCard-item {
            padding: 4px 12px;
            margin-bottom: 8px;
            line-height: 20px;
            border-radius: 4px;
            background-color: #f9fbfd;
            border: 4px solid #fff;
            word-break: break-all;
            white-space: normal;

            .Item-title {
              font-weight: 500;
              color: #329dce;
            }

            .Item-content {
              color: #242e42;

              p {
                span {
                  &:last-child {
                    margin-left: 10px;
                  }
                }
              }
            }
          }

          .Card-addSteps {
            padding: 4px 12px;
            line-height: 20px;
            border-radius: 4px;
            background-color: #f9fbfd;
            border: 1px dashed #dcd8d8;

            &:hover {
              cursor: pointer;
              border: 1px dashed #51a6d3;
              background-color: #eff4f9;
            }
          }
        }
      }

      .PipelineCard-add-column {
        position: relative;
        padding: 10px 0;
        margin-top: 40px;
        text-align: left;
        width: 256px;
        border-radius: 4px;
        background-color: #fff;
        // -webkit-box-shadow: 0 4px 8px 0 rgb(36 46 66 / 6%);
        // box-shadow: 0 4px 8px 0 rgb(36 46 66 / 6%);
        border: 1px dashed #dcd8d8;

        &:hover {
          border: 1px dashed #51a6d3;
        }
      }
    }
  }
}

.pipeline-add {
  padding: 38px 72px;
  border-radius: 4px;
  background-color: #fff;
  -webkit-box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  text-align: center;
  .empty-card {
    img {
      margin-bottom: 20px;
    }
  }
  .empty-desc {
    p {
      margin-bottom: 12px;
      line-height: 20px;
      text-align: center;
      color: #242e42;
    }
  }
}

.pipeline-footer {
  position: absolute;
  bottom: 60px;
  right: 50px;
}
</style>
