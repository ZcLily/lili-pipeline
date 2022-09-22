<template>
  <el-dialog
    title="邮件"
    :visible.sync="visible"
    width="700px"
    @close="handleClose"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="收件人" prop="to">
        <el-input v-model="ruleForm.to"></el-input>
      </el-form-item>
      <el-form-item label="抄送" prop="cc">
        <el-input v-model="ruleForm.cc"></el-input>
      </el-form-item>
      <el-form-item label="主题" prop="subject">
        <el-input v-model="ruleForm.subject"></el-input>
      </el-form-item>
      <el-form-item label="body" prop="body">
        <el-input type="textarea" :rows="2" v-model="ruleForm.body"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
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
      this.setTaskData()
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
        to: '',
        cc: '',
        subject: '',
        body: '',
      },
      rules: {
        subject: [
          {
            required: true,
            message: '请输入主题',
            trigger: 'blur',
          },
        ],
        subject: [
          {
            required: true,
            message: '请输入body',
            trigger: 'blur',
          },
        ],
      },
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
              value: this.ruleForm[key],
            },
          }))
          const task = {
            name: 'mail',
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
<style lang="less"></style>
