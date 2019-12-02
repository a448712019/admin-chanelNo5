import { routerRedux } from "dva/router";
import { stringify } from "querystring";
import { login, getFakeCaptcha, register } from "@/services/login";
import { setAuthority } from "@/utils/authority";
import { reloadAuthorized } from "@/utils/Authorized";
import { getPageQuery } from "@/utils/utils";

import cookie from "react-cookies";
const Model = {
  namespace: "login",
  state: {
    status: undefined
  },
  effects: {
    *login({ payload, callback }, { call, put }) {
      console.log(payload);
      const response = yield call(login, payload);
      if (response.state == 1) {
        yield put({
          type: "save",
          payload: response
        });
      } // Login successfully
      console.log(response);
      if (response.status === 1) {
        cookie.save(
          "currentUser",
          JSON.stringify({ ...response.data, status: response.status })
        );
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...response.data, status: response.status })
        );
        const urlParams = new URL(window.location.href);
        console.log(urlParams);
        const params = getPageQuery();
        console.log(params);
        let { redirect } = params;
        console.log(redirect);
        reloadAuthorized();
        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);
        //   console.log(redirectUrlParams)

        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);
        //     console.log(redirect)

        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //       console.log(redirect)
        //     }
        //   } else {
        // window.location.href = '/';
        //     return;
        //   }
        // }
        // console.log(redirect)
        // yield put(routerRedux.replace(redirect || '/'));
        // window.location.href = '/';
      }
      // location.reload()
      if (callback) callback(response);
    },
    *register({ payload }, { call }) {
      const response = yield call(register, payload);
      if (response.status === 1) {
        location.href = "/";
      }
    },

    *getCaptcha({ payload }, { call }) {
      console.log(111);
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect
      cookie.remove("currentUser");
      localStorage.removeItem("currentUser");
      if (window.location.pathname !== "/user/login" && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: "/user/login",
            search: stringify({
              redirect: window.location.href
            })
          })
        );
      }
    }
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
    save(state, { payload }) {
      return {
        ...state
      };
    }
  }
};
export default Model;
