<template>
  <el-dialog
    title="Git"
    :visible.sync="visible"
    width="700px"
    @close="handleClose"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="Git" prop="url">
        <el-input v-model="ruleForm.url"></el-input>
      </el-form-item>
      <el-form-item label="凭证ID" prop="credentialsId">
        <el-input v-model="ruleForm.credentialsId"></el-input>
      </el-form-item>
      <el-form-item label="分支" prop="branch">
        <el-input v-model="ruleForm.branch"></el-input>
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
        url: '',
        credentialsId: '',
        branch: '',
      },
      rules: {
        url: [
          {
            required: true,
            message: '请输入url',
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
            name: 'git',
            arguments: [
              ..._arguments.filter((arg) => arg.value.value !== ''),
              {
                key: 'changelog',
                value: {
                  isLiteral: true,
                  value: true,
                },
              },
              {
                key: 'poll',
                value: {
                  isLiteral: true,
                  value: false,
                },
              },
            ],
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
