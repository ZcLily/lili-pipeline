<template>
  <div>
    <Git :formVisable="activeTask === 'git'" @emit-task="emitSteps"></Git>
    <Checkout :formVisable="activeTask === 'checkout'" @emit-task="emitSteps"></Checkout>
    <Echo :formVisable="activeTask === 'echo'" @emit-task="emitSteps"></Echo>
    <mail :formVisable="activeTask === 'mail'" @emit-task="emitSteps"></mail>
    <Shell :formVisable="activeTask === 'sh'" @emit-task="emitSteps"></Shell>
    <Container :formVisable="activeTask === 'container'" @emit-task="emitSteps"></Container>
    <ArchiveArtifacts
      :formVisable="activeTask === 'archiveArtifacts'"
      @emit-task="emitSteps"
    ></ArchiveArtifacts>
    <v-input :formVisable="activeTask === 'input'" @emit-task="emitSteps"></v-input>
    <Timeout :formVisable="activeTask === 'timeout'" @emit-task="emitSteps"></Timeout>
    <Sonarqube :formVisable="activeTask === 'withSonarQubeEnv'" @emit-task="emitSteps"></Sonarqube>
    <WaitForQualityGate
      :formVisable="activeTask === 'waitForQualityGate'"
      @emit-task="emitSteps"
    ></WaitForQualityGate>
    <v-script :formVisable="activeTask === 'script'" @emit-task="emitSteps"></v-script>

    <Branch :formVisable="activeTask === 'branch'" @emit-task="emitCondtions"></Branch>
    <Environment
      :formVisable="activeTask === 'environment'"
      @emit-task="emitCondtions"
    ></Environment>
    <Expression :formVisable="activeTask === 'expression'" @emit-task="emitCondtions"></Expression>
  </div>
</template>
<script>
import Git from '../StepModals/Git.vue'
import Checkout from '../StepModals/Checkout.vue'
import Echo from '../StepModals/Echo.vue'
import mail from '../StepModals/Mail.vue'
import Shell from '../StepModals/Shell.vue'
import Container from '../StepModals/Container.vue'
import ArchiveArtifacts from '../StepModals/ArchiveArtifacts.vue'
import Input from '../StepModals/Input.vue'
import Timeout from '../StepModals/Timeout.vue'
import Sonarqube from '../StepModals/Sonarqube.vue'
import WaitForQualityGate from '../StepModals/WaitForQualityGate.vue'
import Script from '../StepModals/Script.vue'

import Branch from '../StepModals/Branch.vue'
import Environment from '../StepModals/Environment.vue'
import Expression from '../StepModals/Expression.vue'
export default {
  components: {
    Git,
    Checkout,
    Echo,
    mail,
    Shell,
    Container,
    ArchiveArtifacts,
    'v-input': Input,
    Timeout,
    Sonarqube,
    WaitForQualityGate,
    'v-script': Script,

    Branch,
    Environment,
    Expression,
  },
  props: {
    stageData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      taskData: null,
      conditionsData: [],
    }
  },
  computed: {
    activeTask() {
      return this.$store.state.pipeline.activeTask
    },
    operation() {
      return this.$store.state.pipeline.operation
    },
    activeTaskIndex() {
      return this.$store.state.pipeline.activeTaskIndex
    },
  },
  watch: {
    activeTask(val) {
      if (val) {
        this.getStepsData()
      }
    },
  },
  mounted() {
    this.conditionsData = this.stageData.conditions
    this.getStepsData()
  },
  methods: {
    getStepsData() {
      this.taskData = this.stageData.steps
    },
    emitSteps(formData) {
      if (formData) {
        if (this.operation === 'add') {
          formData.editable = true
          formData.can_delete = true
          this.taskData.push(formData)
          this.$emit('steps-return')
        } else {
          this.taskData.splice(this.activeTaskIndex, 1, formData)
        }
      }
      this.$store.dispatch('toggleTask', '')
      this.$store.dispatch('toggleTaskData', null)
    },
    emitCondtions(formData) {
      if (formData) {
        this.conditionsData.push(formData)
        this.$emit('steps-return')
      }
      this.$store.dispatch('toggleTask', '')
      this.$store.dispatch('toggleTaskData', null)
    },
  },
}
</script>
<style lang="less"></style>
