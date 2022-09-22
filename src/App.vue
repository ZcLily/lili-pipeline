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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
