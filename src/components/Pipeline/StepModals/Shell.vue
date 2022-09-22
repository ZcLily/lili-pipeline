<template>
  <el-dialog
    title="shell"
    :visible.sync="visible"
    width="700px"
    @close="handleClose"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
  >
    <v-code-mirror v-model="value" :options="shellOptions" :height="500"></v-code-mirror>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import codemirror from '@/components/CodeMirror'
export default {
  props: {
    formVisable: {
      type: Boolean,
    },
  },
  components: {
    'v-code-mirror': codemirror,
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
      value: '',
      shellOptions: {
        // 自动聚焦
        autofocus: true,
      },
    }
  },
  methods: {
    setTaskData(data) {
      if (data) {
        data.arguments.forEach((item) => {
          if (item.key === 'script') {
            this.value = item.value.value
          }
        })
      }
    },
    submit() {
      const task = {
        name: 'sh',
        arguments: [
          {
            key: 'script',
            value: { isLiteral: true, value: this.value },
          },
        ],
      }
      this.$emit('emit-task', task)
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
