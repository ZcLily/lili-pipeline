<template>
  <el-dialog
    title="checkout(svn)"
    :visible.sync="visible"
    width="700px"
    @close="handleClose"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="凭证ID" prop="credentialsId">
        <el-input v-model="ruleForm.credentialsId"></el-input>
      </el-form-item>
      <el-form-item label="远程仓库地址" prop="remote">
        <el-input v-model="ruleForm.remote"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { isString, pick } from 'lodash'
import { groovyToJS } from '../utils'
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
        credentialsId: '',
        remote: '',
      },
      rules: {
        remote: [
          {
            required: true,
            message: '请输入远程仓库',
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
          if (item.key === 'scm') {
            if (isString(item.value.value) && item.value.value.startsWith('[')) {
              let obj = groovyToJS(item.value.value)
              obj = pick(obj, ['remote', 'credentialsId'])
              this.ruleForm['remote'] = obj['remote']
              this.ruleForm['credentialsId'] = obj['credentialsId']
            }
          }
        })
      }
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const task = {
            name: 'checkout',
            arguments: [
              {
                key: 'scm',
                value: {
                  isLiteral: false,
                  value: `[$class: 'SubversionSCM', locations: [[cancelProcessOnExternalsFail: true,  ${
                    this.ruleForm.credentialsId
                      ? `credentialsId: '${this.ruleForm.credentialsId}',`
                      : ''
                  } depthOption: 'infinity', ignoreExternalsOption: true, local: '.', remote: '${
                    this.ruleForm.remote
                  }']], quietOperation: true, workspaceUpdater: [$class: 'UpdateUpdater']]`,
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
