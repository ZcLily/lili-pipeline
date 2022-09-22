<template>
  <el-dialog
    title="消息"
    :visible.sync="visible"
    width="700px"
    @close="handleClose"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="消息" prop="message">
        <el-input v-model="ruleForm.message"></el-input>
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
  computed: {
    activeTaskData() {
      return this.$store.state.pipeline.activeTaskData
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
  data() {
    return {
      visible: false,
      ruleForm: {
        message: '',
      },
      rules: {
        message: [
          {
            required: true,
            message: '请输入message',
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
              value: this.ruleForm[key].trim(),
            },
          }))
          const task = {
            name: 'echo',
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
