import {
  groupList,
  groupStudentList,
  downStage1GroupStuden,
  delGroupStudent,
  allUserList,
  addUserToGroup,
  updateRenameOrStatus,
  deleteGroup,
  getCode,
  getSignCode,
  getTestCode,
  getSignParams,
  getTestParams,
  getTransitionList,
  getTransitionGroupList,
  changeWeekStatus,
  changeAllow,
  changeAllows,
  delTransition,
  noTransitionGroup,
  addTransitionGroup,
  addTransitionStatus,
  delTransitionGroup,
  downTransition,
  getStageList,
  editStage,
  saveStage,
  delStage,
  lookStageOneResult,
  downPersonResult,
  newAddUserToGroup,
  newAddTransitionGroup
} from "@/services/api";

export default {
  namespace: "stageManage",
  state: {
    groupList: [],
    groupTotal: 0,
    groupStudentList: [],
    allUserList: [],
    codeData: {},
    testCode: "",
    signCode: "",
    groupDetail: "",

    transitionList: [],
    getTransitionGroupList: [],
    noTransitionGroup: [],

    stageList: [],
    editStageData: "",
    lookStageOneResult: ""
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(groupList, payload);
      yield put({
        type: "save",
        payload: {
          groupList: response.data || []
        }
      });
    },
    *groupStudentList({ payload, callback }, { call, put }) {
      const response = yield call(groupStudentList, payload);
      yield put({
        type: "save",
        payload: {
          groupStudentList: response.data || [],
          groupDetail: response.total || {}
        }
      });
      if (callback) callback(response);
    },
    *allUserList({ payload, callback }, { call, put }) {
      const response = yield call(allUserList, payload);
      yield put({
        type: "save",
        payload: {
          allUserList: response.data || []
        }
      });
      if (callback) callback(response);
    },
    *lookStageOneResult({ payload, callback }, { call, put }) {
      const response = yield call(lookStageOneResult, payload);
      yield put({
        type: "save",
        payload: {
          lookStageOneResult: response.data || []
        }
      });
      if (callback) callback(response);
    },
    *getCode({ payload, callback }, { call, put }) {
      const response = yield call(getCode, payload);
      yield put({
        type: "save",
        payload: {
          signCode: response.data ? response.data.surl : "",
          testCode: response.data ? response.data.url : ""
        }
      });
      if (callback) callback(response);
    },
    *getSignCode({ payload, callback }, { call, put }) {
      const response = yield call(getSignCode, payload);
      yield put({
        type: "save",
        payload: {
          signCode: response.data
        }
      });
      if (callback) callback(response);
    },
    *noTransitionGroup({ payload, callback }, { call, put }) {
      const response = yield call(noTransitionGroup, payload);
      yield put({
        type: "save",
        payload: {
          noTransitionGroup: response.data || []
        }
      });
      if (callback) callback(response);
    },
    *getTestCode({ payload, callback }, { call, put }) {
      const response = yield call(getTestCode, payload);
      yield put({
        type: "save",
        payload: {
          testCode: response.data
        }
      });
      if (callback) callback(response);
    },
    *getTransitionList({ payload, callback }, { call, put }) {
      const response = yield call(getTransitionList, payload);
      yield put({
        type: "save",
        payload: {
          transitionList: response.data
        }
      });
      if (callback) callback(response);
    },
    *getTransitionGroupList({ payload, callback }, { call, put }) {
      const response = yield call(getTransitionGroupList, payload);
      yield put({
        type: "save",
        payload: {
          getTransitionGroupList: response.data
        }
      });
      if (callback) callback(response);
    },
    *getStageList({ payload, callback }, { call, put }) {
      console.log(payload);
      const response = yield call(getStageList, payload);
      yield put({
        type: "save",
        payload: {
          stageList: response.data
        }
      });
      if (callback) callback(response);
    },
    *editStage({ payload, callback }, { call, put }) {
      const response = yield call(editStage, payload);
      yield put({
        type: "save",
        payload: {
          editStageData: response.data
        }
      });
      if (callback) callback(response);
    },
    *addTransitionGroup({ payload, callback }, { call, put }) {
      const response = yield call(addTransitionGroup, payload);
      if (callback) callback(response);
    },
    *addUserToGroup({ payload, callback }, { call, put }) {
      const response = yield call(addUserToGroup, payload);
      if (callback) callback(response);
    },
    *newAddUserToGroup({ payload, callback }, { call, put }) {
      const response = yield call(newAddUserToGroup, payload);
      if (callback) callback(response);
    },
    *newAddTransitionGroup({ payload, callback }, { call, put }) {
      const response = yield call(newAddTransitionGroup, payload);
      if (callback) callback(response);
    },
    *updateRenameOrStatus({ payload, callback }, { call, put }) {
      const response = yield call(updateRenameOrStatus, payload);
      if (callback) callback(response);
    },
    *delGroupStudent({ payload, callback }, { call, put }) {
      const response = yield call(delGroupStudent, payload);
      if (callback) callback(response);
    },
    *getSignParams({ payload, callback }, { call, put }) {
      const response = yield call(getSignParams, payload);
      if (callback) callback(response);
    },
    *getTestParams({ payload, callback }, { call, put }) {
      const response = yield call(getTestParams, payload);
      if (callback) callback(response);
    },
    *deleteGroup({ payload, callback }, { call, put }) {
      const response = yield call(deleteGroup, payload);
      if (callback) callback(response);
    },
    *delTransitionGroup({ payload, callback }, { call, put }) {
      const response = yield call(delTransitionGroup, payload);
      if (callback) callback(response);
    },
    *addTransitionStatus({ payload, callback }, { call, put }) {
      const response = yield call(addTransitionStatus, payload);
      if (callback) callback(response);
    },
    *changeWeekStatus({ payload, callback }, { call, put }) {
      const response = yield call(changeWeekStatus, payload);
      if (callback) callback(response);
    },
    *changeAllow({ payload, callback }, { call, put }) {
      const response = yield call(changeAllow, payload);
      if (callback) callback(response);
    },
    *changeAllows({ payload, callback }, { call, put }) {
      const response = yield call(changeAllows, payload);
      if (callback) callback(response);
    },
    *delTransition({ payload, callback }, { call, put }) {
      const response = yield call(delTransition, payload);
      if (callback) callback(response);
    },
    *saveStage({ payload, callback }, { call, put }) {
      const response = yield call(saveStage, payload);
      if (callback) callback(response);
    },
    *delStage({ payload, callback }, { call, put }) {
      const response = yield call(delStage, payload);
      if (callback) callback(response);
    },
    *downStage1GroupStuden({ payload, callback }, { call, put }) {
      downStage1GroupStuden(payload);
    },
    *downTransition({ payload, callback }, { call, put }) {
      downTransition(payload);
    },
    *downPersonResult({ payload, callback }, { call, put }) {
      downPersonResult(payload);
    }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  }
};
