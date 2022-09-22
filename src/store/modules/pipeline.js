const pipeline = {
  state: {
    activeTask: "",
    activeTaskData: null,
    activeTaskIndex: 0,
    operation: "add",
  },
  mutations: {
    SET_TASK: (state, task) => {
      state.activeTask = task;
    },
    SET_TASKDATA: (state, taskData) => {
      state.activeTaskData = taskData;
    },
    SET_TASKINDEX: (state, index) => {
      state.activeTaskIndex = index;
    },
    SET_OPERATION: (state, operation) => {
      state.operation = operation;
    },
  },
  actions: {
    toggleTask: ({ commit }, task) => {
      commit("SET_TASK", task);
    },
    toggleTaskData: ({ commit }, taskData) => {
      commit("SET_TASKDATA", taskData);
    },
    toggleTaskIndex: ({ commit }, index) => {
      commit("SET_TASKINDEX", index);
    },
    toggleOperation: ({ commit }, operation) => {
      commit("SET_OPERATION", operation);
    },
  },
};
export default pipeline;
