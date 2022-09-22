<template>
  <el-dialog
    title="Sonarqube 配置"
    :visible.sync="visible"
    width="700px"
    @close="handleClose"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
  >
    <v-reminder :iconClass="'warning'">将 Jenkins 中的 sonarqube 配置加载到流水线中</v-reminder>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="配置名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
        <p>流水线运行状态中将会展示此消息</p>
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
    activetaskData: {
      type: Object | undefined,
    },
    formVisable: {
      type: Boolean,
    },
  },
  watch: {
    formVisable() {
      this.visible = this.formVisable
    },
  },
  data() {
    return {
      visible: false,
      ruleForm: {
        name: 'sonar',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const task = {
            name: 'withSonarQubeEnv',
            arguments: {
              isLiteral: true,
              value: this.ruleForm.name,
            },
            children: [],
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
  },
}
</script>
<style lang="less"></style>
