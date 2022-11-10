<template>
  <div id="app">
    <v-create-pipeline
      :data="pipelineData"
      @cancle-create="cancleCreate"
      @save-pipeline="savePipeline"
    ></v-create-pipeline>
  </div>
</template>

<script>
import createPipeline from '@/components/Pipeline/index.vue'

export default {
  name: 'App',
  components: {
    'v-create-pipeline': createPipeline,
  },
  data() {
    return {
      pipelineData: [],
    }
  },
  methods: {
    cancleCreate() {},
    savePipeline() {},
  },
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
    '微软雅黑', Arial, sans-serif;
}
html body{
  height: 100%;
  width: 100%;
  font-size: 14px;
}
ul li {
  list-style:none;
}
</style>
