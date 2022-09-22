<template>
  <el-dialog
    title="超时"
    :visible.sync="visible"
    width="700px"
    @close="handleClose"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px">
      <el-form-item label="时间" prop="time">
        <el-input v-model="ruleForm.time"></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-select v-model="ruleForm.unit">
          <el-option
            v-for="item in unitOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="activity">
        <el-radio-group v-model="ruleForm.activity">
          <el-radio :label="true">此区块代码无日志输出后开始计算超时</el-radio>
          <el-radio :label="false">代码块所用的绝对时间</el-radio>
        </el-radio-group>
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
  },
  data() {
    return {
      visible: false,
      ruleForm: {
        time: '',
        unit: 'MINUTES',
        activity: true,
      },
      rules: {},
      unitOptions: [
        {
          value: 'NANOSECONDS',
          label: '纳秒',
        },
        {
          value: 'MICROSECONDS',
          label: '微秒',
        },
        {
          value: 'MILLISECONDS',
          label: '毫秒',
        },
        {
          value: 'SECONDS',
          label: '秒',
        },
        {
          value: 'MINUTES',
          label: '分钟',
        },
        {
          value: 'HOURS',
          label: '小时',
        },
        {
          value: 'DAYS',
          label: '天',
        },
      ],
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
              value: key === 'time' ? Number.parseInt(this.ruleForm[key], 10) : this.ruleForm[key],
            },
          }))
          const task = {
            name: 'timeout',
            arguments: _arguments.filter((arg) => arg.value.value !== ''),
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
