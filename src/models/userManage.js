import {
  userList,
  userDetail,
  userUpdate,
  leaveUser,
  downTemplete,
  downAll,
  downStage1,
  downStage2,
  downStage3,
  uploadUser,
  submitUser
} from "@/services/api";

export default {
  namespace: "userManage",
  state: {
    list: [],
    total: 0,
    detail: "",
    uploadUser: []
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(userList, payload);
      yield put({
        type: "save",
        payload: {
          list: response.data || [],
          total: response.totle
        }
      });
    },
    *detail({ payload, callback }, { call, put }) {
      const response = yield call(userDetail, payload);
      yield put({
        type: "save",
        payload: {
          detail: response.data || []
        }
      });
      if (callback) callback(response);
    },
    *uploadUser({ payload, callback }, { call, put }) {
      const response = yield call(uploadUser, payload);
      yield put({
        type: "save",
        payload: {
          uploadUser: response.data || []
        }
      });
      if (callback) callback(response);
    },

    *update({ payload, callback }, { call, put }) {
      const response = yield call(userUpdate, payload);
      if (callback) callback(response);
    },
    *leaveUser({ payload, callback }, { call, put }) {
      const response = yield call(leaveUser, payload);
      if (callback) callback(response);
    },
    *submitUser({ payload, callback }, { call, put }) {
      const response = yield call(submitUser, payload);
      if (callback) callback(response);
    },
    *downTemplete({ payload }, { call, put }) {
      downTemplete(payload);
    },
    *downAll({ payload }, { call, put }) {
      downAll(payload);
    },
    *downStage1({ payload }, { call, put }) {
      downStage1(payload);
    },
    *downStage2({ payload }, { call, put }) {
      downStage2(payload);
    },
    *downStage3({ payload }, { call, put }) {
      downStage3(payload);
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
