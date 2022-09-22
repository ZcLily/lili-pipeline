const PIPELINE_TASKS = [
  {
    tabName: 'All',
    tabLabel: '全部',
    tasks: [
      {
        taskName: 'git',
        taskLabel: 'git',
      },
      {
        taskName: 'checkout',
        taskLabel: 'checkout',
      },
      {
        taskName: 'echo',
        taskLabel: '打印消息',
      },
      {
        taskName: 'mail',
        taskLabel: '邮件',
      },
      {
        taskName: 'sh',
        taskLabel: 'shell',
      },
      //   {
      //     taskName: 'withCredentials',
      //     taskLabel: '添加凭证'
      //   },
      // {
      //   taskName: 'container',
      //   taskLabel: '指定容器'
      // },
      {
        taskName: 'archiveArtifacts',
        taskLabel: '保存制品',
      },
      // {
      //   taskName: 'input',
      //   taskLabel: '审核'
      // },
      //    {
      //     taskName: 'kubernetesDeploy',
      //     taskLabel: 'kubernetesDeploy'
      //   },
      //   children
      //   {
      //     taskName: 'timeout',
      //     taskLabel: '超时'
      //   },
      //   children
      //   {
      //     taskName: 'withSonarQubeEnv',
      //     taskLabel: 'Sonarqube 配置'
      //   },
      {
        taskName: 'waitForQualityGate',
        taskLabel: '代码质量检查(SonarQube)',
      },
      {
        taskName: 'script',
        taskLabel: 'script',
      },
    ],
  },
  {
    tabName: 'Normal',
    tabLabel: '通用',
    tasks: [
      {
        taskName: 'echo',
        taskLabel: '打印消息',
      },
      {
        taskName: 'sh',
        taskLabel: 'shell',
      },
      {
        taskName: 'mail',
        taskLabel: '邮件',
      },
      //    {
      //     taskName: 'withCredentials',
      //     taskLabel: '添加凭证'
      //   },
      // {
      //   taskName: 'container',
      //   taskLabel: '指定容器'
      // },
      {
        taskName: 'archiveArtifacts',
        taskLabel: '保存制品',
      },
      //    {
      //     taskName: 'kubernetesDeploy',
      //     taskLabel: 'kubernetesDeploy'
      //   },
      //   children
      //   {
      //     taskName: 'timeout',
      //     taskLabel: '超时'
      //   },
      {
        taskName: 'script',
        taskLabel: 'script',
      },
    ],
  },
  {
    tabName: 'SCM',
    tabLabel: '代码仓库',
    tasks: [
      {
        taskName: 'git',
        taskLabel: 'git',
      },
      {
        taskName: 'checkout',
        taskLabel: 'checkout',
      },
    ],
  },
  {
    tabName: 'Review',
    tabLabel: '审核',
    tasks: [
      // {
      //   taskName: 'input',
      //   taskLabel: '审核'
      // },
      //   children
      //   {
      //     taskName: 'withSonarQubeEnv',
      //     taskLabel: 'Sonarqube 配置'
      //   },
      {
        taskName: 'waitForQualityGate',
        taskLabel: '代码质量检查(SonarQube)',
      },
    ],
  },
]

const PIPELINE_CONDITIONS = [
  'branch',
  'environment',
  'expression',
  //   'not',
  //   'allOf',
  //   'anyOf'
]

const taskDescs = {
  git: '通过Git拉取代码',
  sh: '可以在构建中执行 shell 命令或者 windows 的 batch 命令',

  container: '指定容器，可添加嵌套任务在容器内执行',

  echo: '可以在构建中发送消息',
  mail: '可以通过邮件发送消息',
  checkout: '拉取代码，常用于拉取非 Git 代码，例如 SVN 等等',
  dir: '更改当前目录',
  archiveArtifacts: '保存制品',
  cleanWs: '清理企业空间',
  input: '流水线运行至此任务将会暂停，审核后可选择继续或终止',
  withCredentials: '加载凭证到环境变量',
  kubernetesDeploy: '将资源部署到 kubernetes 集群',
  timeout: '使用确定的超时限制执行块内的代码.',
  branch: '当前分支名需符合输入值',
  environment: '运行流水线前输入的环境变量与当前值一致',
  expression: '输入一个表达式',
  not: '否定前缀',
  allOf: '内部嵌套的条件需全部满足',
  anyOf: '内部嵌套的条件只需符合一个',
  withSonarQubeEnv: '快速的定位代码中潜在的或者明显的错误',
  waitForQualityGate: '在执行代码分析后执行',
  script: '执行groovy脚本',
}

export { PIPELINE_TASKS, taskDescs, PIPELINE_CONDITIONS }
