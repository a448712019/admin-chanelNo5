import { queryCurrent, query as queryUsers } from "@/services/user";
import { reloadAuthorized } from "@/utils/Authorized";
import cookie from "react-cookies";
const UserModel = {
  namespace: "user",
  state: {
    currentUser: {}
  },
  effects: {
    *fetch(payload, { call, put }) {
      console.log(123);
      const response = yield call(queryUsers);
      yield put({
        type: "save",
        payload: response
      });
    },

    *fetchCurrent(payload, { call, put }) {
      console.log(11);
      console.log(cookie.load("currentUser"));
      let currentUser = yield cookie.load("currentUser");

      console.log(currentUser);
      if (currentUser) {
        currentUser.status = true;
        yield put({
          type: "saveCurrentUser",
          payload: currentUser
        });
        // reloadAuthorized()
      } else {
        yield put({
          type: "saveCurrentUser",
          payload: ""
        });
        // location.href = "/user/login";
      }
      // const response = yield call(queryCurrent);
      // console.log(response)
      // yield put({
      //   type: 'saveCurrentUser',
      //   payload: response,
      // });
    }
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    save(state, action) {
      return {
        ...state,
        list: action.payload
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {}
      },
      action
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount
        }
      };
    }
  }
};
export default UserModel;
