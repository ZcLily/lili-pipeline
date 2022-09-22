const panelList = [
  {
    name: '源',
    children: [
      {
        stage_name: 'stage-grq4z',
        steps: [
          {
            name: 'git',
            arguments: [
              {
                key: 'url',
                value: {
                  isLiteral: true,
                  value: 'https://github.com/lanyulei/ferry.git',
                },
              },
              {
                key: 'credentialsId',
                value: {
                  isLiteral: true,
                  value: 'git',
                },
              },
              {
                key: 'branch',
                value: {
                  isLiteral: true,
                  value: 'master',
                },
              },
              {
                key: 'changelog',
                value: {
                  isLiteral: true,
                  value: true,
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
          },
        ],
      },
      {
        stage_name: 'stage-qi7pn',
        steps: [
          {
            name: 'git',
            arguments: [
              {
                key: 'url',
                value: {
                  isLiteral: true,
                  value: 'https://github.com/lanyulei/ferry.git',
                },
              },
              {
                key: 'credentialsId',
                value: {
                  isLiteral: true,
                  value: 'git',
                },
              },
              {
                key: 'branch',
                value: {
                  isLiteral: true,
                  value: 'master',
                },
              },
              {
                key: 'changelog',
                value: {
                  isLiteral: true,
                  value: true,
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
          },
        ],
      },
    ],
  },

  {
    name: '测试',
    children: [
      {
        stage_name: 'stage-8fcte',
        steps: [
          {
            name: 'container',
            arguments: {
              isLiteral: true,
              value: '3232',
            },
            children: [
              {
                name: 'archiveArtifacts',
                arguments: [
                  {
                    key: 'artifacts',
                    value: {
                      isLiteral: true,
                      value: 'er',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        stage_name: 'stage-9ve7e',
        steps: [
          {
            name: 'timeout',
            arguments: [
              {
                key: 'unit',
                value: {
                  isLiteral: true,
                  value: 'MINUTES',
                },
              },
              {
                key: 'activity',
                value: {
                  isLiteral: true,
                  value: true,
                },
              },
              {
                key: 'time',
                value: {
                  isLiteral: true,
                  value: 30,
                },
              },
            ],
            children: [
              {
                name: 'echo',
                arguments: [
                  {
                    key: 'message',
                    value: {
                      isLiteral: true,
                      value: '21',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  {
    name: '编译',
    children: [
      {
        stage_name: 'stage-9fcte',
        steps: [
          {
            name: 'echo',
            arguments: [
              {
                key: 'message',
                value: {
                  isLiteral: true,
                  value: '999999999',
                },
              },
            ],
          },
        ],
      },
    ],
  },

  {
    name: '部署',
    children: [
      {
        stage_name: 'stage-0ve7e',
        steps: [
          {
            name: 'script',
            arguments: [
              {
                key: 'scriptBlock',
                value: {
                  isLiteral: true,
                  value: 'wwwww',
                },
              },
            ],
          },
        ],
      },
      {
        stage_name: 'stage-3fcte',
        steps: [
          {
            name: 'echo',
            arguments: [
              {
                key: 'message',
                value: {
                  isLiteral: true,
                  value: '999999999',
                },
              },
            ],
          },
        ],
      },
    ],
  },

  {
    name: '部署1',
    children: [
      {
        stage_name: 'stage-2ve7e',
        steps: [
          {
            name: 'script',
            arguments: [
              {
                key: 'scriptBlock',
                value: {
                  isLiteral: true,
                  value: 'wwwww',
                },
              },
            ],
            conditions: [
              {
                name: 'branch',
                arguments: {
                  isLiteral: true,
                  value: 'master',
                },
              },
            ],
          },
        ],
      },
      {
        stage_name: 'stage-1fcte',
        steps: [
          {
            name: 'container',
            arguments: {
              isLiteral: true,
              value: '3232',
            },
            children: [
              {
                name: 'archiveArtifacts',
                arguments: [
                  {
                    key: 'artifacts',
                    value: {
                      isLiteral: true,
                      value: 'er',
                    },
                  },
                ],
              },
            ],
            conditions: [
              {
                name: 'branch',
                arguments: {
                  isLiteral: true,
                  value: 'master',
                },
              },
            ],
          },
        ],
      },
      {
        stage_name: 'stage-3ve7e',
        steps: [
          {
            name: 'timeout',
            arguments: [
              {
                key: 'unit',
                value: {
                  isLiteral: true,
                  value: 'MINUTES',
                },
              },
              {
                key: 'activity',
                value: {
                  isLiteral: true,
                  value: true,
                },
              },
              {
                key: 'time',
                value: {
                  isLiteral: true,
                  value: 30,
                },
              },
            ],
            children: [
              {
                name: 'echo',
                arguments: [
                  {
                    key: 'message',
                    value: {
                      isLiteral: true,
                      value: '21',
                    },
                  },
                ],
              },
            ],
            conditions: [
              {
                name: 'branch',
                arguments: {
                  isLiteral: true,
                  value: 'master',
                },
              },
            ],
          },
        ],
      },
    ],
  },
]
export { panelList }
