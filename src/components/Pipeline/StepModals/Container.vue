<template>
  <el-dialog
    title="指定容器"
    :visible.sync="visible"
    width="700px"
    @close="handleClose"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
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
    activetaskData(data) {
      if (data) {
        data.arguments.forEach((item) => {
          if (this.ruleForm[item.key] !== undefined) {
            this.ruleForm[item.key] = item.value.value
          }
        })
      }
    },
  },
  data() {
    return {
      visible: false,
      ruleForm: {
        name: '',
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
          const _arguments = Object.keys(this.ruleForm).map((key) => ({
            key,
            value: {
              isLiteral: true,
              value: this.ruleForm[key],
            },
          }))
          const task = {
            name: 'container',
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
  },
}
</script>
<style lang="less"></style>
