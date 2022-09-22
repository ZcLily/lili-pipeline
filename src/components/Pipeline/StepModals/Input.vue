<template>
  <el-dialog
    title="审核"
    :visible.sync="visible"
    width="700px"
    @close="handleClose"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
  >
    <v-reminder :iconClass="'warning'">
      流水线运行至此任务将会暂停，创建者和被@的人可以选择继续或终止流水线
    </v-reminder>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="消息" prop="message">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="可以@某人来帮助审核"
          v-model="ruleForm.message"
        ></el-input>
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
        message: '',
      },
      rules: {
        message: [
          {
            required: true,
            message: '请输入信息',
            trigger: 'blur',
          },
        ],
      },
      submitter: ['admin'],
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
              value: this.ruleForm[key].trim(),
            },
          }))

          const task = {
            name: 'input',
            arguments: [
              ..._arguments.filter((arg) => arg.value.value !== ''),
              {
                key: 'submitter',
                value: {
                  isLiteral: true,
                  value: this.submitter.join(', '),
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
  },
}
</script>
<style lang="less"></style>
