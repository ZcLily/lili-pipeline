<template>
  <el-dialog
    title="代码质量检查(SonarQube)"
    :visible.sync="visible"
    width="700px"
    @close="handleClose"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
  >
    <v-reminder :iconClass="'warning'">
      代码质量检查标准来源于SonarQube的 Quality Gate (质量阈)，如果需要自定义检查标准请前往
      SonarQube 设置
    </v-reminder>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="检查结果是否影响后续任务" prop="abortPipeline">
        <el-select v-model="ruleForm.abortPipeline">
          <el-option
            v-for="item in abortOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Reminder from '@/components/Reminder/index.vue'
export default {
  components: {
    'v-reminder': Reminder,
  },
  props: {
    formVisable: {
      type: Boolean,
    },
  },
  watch: {
    formVisable() {
      this.visible = this.formVisable
    },
    activeTaskData(data) {
      this.setTaskData(data)
    },
  },
  computed: {
    activeTaskData() {
      return this.$store.state.pipeline.activeTaskData
    },
  },
  data() {
    return {
      visible: false,
      ruleForm: {
        abortPipeline: 'true',
      },
      rules: {},
      abortOptions: [
        {
          label: '检查结果不影响后续任务',
          value: 'false',
        },
        {
          label: '检查通过后开始后续任务',
          value: 'true',
        },
      ],
    }
  },
  methods: {
    setTaskData(data) {
      if (data) {
        data.arguments.forEach((item) => {
          if (this.ruleForm[item.key] !== undefined) {
            this.ruleForm[item.key] = item.value.value
          }
        })
      }
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _arguments = Object.keys(this.ruleForm).map((key) => ({
            key,
            value: {
              isLiteral: true,
              value: this.ruleForm[key].trim(),
            },
          }))
          const task = {
            name: 'waitForQualityGate',
            arguments: [..._arguments.filter((arg) => arg.value.value !== '')],
          }
          this.$emit('emit-task', task)
        } else {
          return false
        }
      })
    },
    handleClose() {
      this.$emit('emit-task', null)
    },
  },
  mounted() {
    this.visible = this.formVisable
    if (this.activeTaskData) {
      this.setTaskData(this.activeTaskData)
    }
  },
}
</script>
<style lang="less" scoped>
.el-form-item {
  display: inline-block;
  width: 75%;
}
</style>
