<template>
  <codemirror
    v-model="cmValue"
    :options="cmOptions"
    :style="{ height: height + 'px' }"
  ></codemirror>
</template>
<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/panda-syntax.css'

import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

import 'codemirror/addon/selection/active-line' //光标行背景高亮，配置里面也需要styleActiveLine设置为true

import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
export default {
  components: {
    codemirror,
  },
  props: {
    // 编辑器值
    value: {
      type: String,
      default: '',
    },
    // 其他属性
    options: {
      type: Object,
      default: {},
    },
    // 高度设置
    height: {
      type: Number,
      default: 500,
    },
  },
  watch: {
    value() {
      this.$emit('input', this.cmValue)
      this.cmValue = this.value
    },
    // 同步value值
    cmValue(val) {
      this.$emit('input', this.cmValue)
    },
  },
  data() {
    return {
      cmValue: '',
      cmOptions: {
        tabSize: 4, // 制表符宽度
        mode: 'application/json',
        theme: 'panda-syntax',
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
        lineNumbers: true,
        styleActiveLine: true,
      },
    }
  },
  created() {
    Object.assign(this.cmOptions, this.options)
  },
}
</script>
<style lang="less" scoped>
/deep/ .CodeMirror {
  height: 100%;
  border-radius: 4px;
}
</style>
