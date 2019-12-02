import {
  themeList,
  getThemeStageList,
  getThemeDetail,
  uploadImage,
  updateTheme,
  delTheme,
  allTheme,
  saveStep,
  stepList,
  stepDetail,
  delStep,
  tyepOneList,
  saveTypeOne,
  typeOneDetail,
  delTypeOne,
  typeTwoSave,
  typeTwoList,
  typeTwoDetail,
  delTypeTwo,
  typeThreeList,
  typeThreeDetail,
  typeThreeSave,
  delTypeThree,
  typeFourList,
  addFour,
  fourDetail,
  updateFour,
  typeList,
  editTypeNum,
  addType,
  editType,
  delType
} from "@/services/api";

export default {
  namespace: "theme",
  state: {
    themeList: [],
    stageList: [],
    detail: "",
    allTheme: [],

    stepList: [],
    stepDetail,

    tyepOneList: [],
    typeOneDetail: "",

    typeTwoList: [],
    typeTwoDetail: "",

    typeThreeList: [],
    typeThreeDetail: "",

    typeFourList: [],
    fourDetail: "",
    typeList: []
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(themeList, payload);
      console.log(response);
      if (response.status === 1) {
        yield put({
          type: "save",
          payload: {
            themeList: response.data || []
          }
        });
      }
      if (callback) callback(response);
    },
    *typeList({ payload, callback }, { call, put }) {
      const response = yield call(typeList, payload);
      yield put({
        type: "save",
        payload: {
          typeList: response.data || []
        }
      });
      if (callback) callback(response);
    },
    *getThemeStageList({ payload, callback }, { call, put }) {
      const response = yield call(getThemeStageList, payload);
      console.log(response);
      if (response.status === 1) {
        yield put({
          type: "save",
          payload: {
            stageList: response.data || []
          }
        });
      }
      if (callback) callback(response);
    },
    *getThemeDetail({ payload, callback }, { call, put }) {
      const response = yield call(getThemeDetail, payload);
      console.log(response);
      if (response.status === 1) {
        yield put({
          type: "save",
          payload: {
            detail: response.data || ""
          }
        });
      }
      if (callback) callback(response);
    },
    *stepDetail({ payload, callback }, { call, put }) {
      const response = yield call(stepDetail, payload);
      console.log(response);
      if (response.status === 1) {
        yield put({
          type: "save",
          payload: {
            stepDetail: response.data || ""
          }
        });
      }
      if (callback) callback(response);
    },
    *allTheme({ payload, callback }, { call, put }) {
      const response = yield call(allTheme, payload);
      console.log(response);
      if (response.status === 1) {
        yield put({
          type: "save",
          payload: {
            allTheme: response.data || []
          }
        });
      }
      if (callback) callback(response);
    },
    *stepList({ payload, callback }, { call, put }) {
      const response = yield call(stepList, payload);
      console.log(response);
      if (response.status === 1) {
        yield put({
          type: "save",
          payload: {
            stepList: response.data ? response.data.data : []
          }
        });
      }
      if (callback) callback(response);
    },
    *tyepOneList({ payload, callback }, { call, put }) {
      const response = yield call(tyepOneList, payload);
      console.log(response);
      if (response.status === 1) {
        yield put({
          type: "save",
          payload: {
            tyepOneList: response.data ? response.data : []
          }
        });
      }
      if (callback) callback(response);
    },

    *uploadImage({ payload, callback }, { call, put }) {
      const response = yield call(uploadImage, payload);
      if (callback) callback(response);
    },
    *addType({ payload, callback }, { call, put }) {
      const response = yield call(addType, payload);
      if (callback) callback(response);
    },
    *editType({ payload, callback }, { call, put }) {
      const response = yield call(editType, payload);
      if (callback) callback(response);
    },
    *updateTheme({ payload, callback }, { call, put }) {
      const response = yield call(updateTheme, payload);
      if (callback) callback(response);
    },
    *delType({ payload, callback }, { call, put }) {
      const response = yield call(delType, payload);
      if (callback) callback(response);
    },
    *delTheme({ payload, callback }, { call, put }) {
      const response = yield call(delTheme, payload);
      if (callback) callback(response);
    },
    *saveStep({ payload, callback }, { call, put }) {
      const response = yield call(saveStep, payload);
      if (callback) callback(response);
    },
    *delStep({ payload, callback }, { call, put }) {
      const response = yield call(delStep, payload);
      if (callback) callback(response);
    },

    *tyepOneList({ payload, callback }, { call, put }) {
      const response = yield call(tyepOneList, payload);
      console.log(response);
      if (response.status === 1) {
        yield put({
          type: "save",
          payload: {
            tyepOneList: response.data ? response.data.data : []
          }
        });
      }
      if (callback) callback(response);
    },
    *typeOneDetail({ payload, callback }, { call, put }) {
      const response = yield call(typeOneDetail, payload);
      console.log(response);
      if (response.status === 1) {
        yield put({
          type: "save",
          payload: {
            typeOneDetail: response.data ? response.data : ""
          }
        });
      }
      if (callback) callback(response);
    },

    *saveTypeOne({ payload, callback }, { call, put }) {
      const response = yield call(saveTypeOne, payload);
      if (callback) callback(response);
    },
    *addFour({ payload, callback }, { call, put }) {
      const response = yield call(addFour, payload);
      if (callback) callback(response);
    },
    *updateFour({ payload, callback }, { call, put }) {
      const response = yield call(updateFour, payload);
      if (callback) callback(response);
    },
    *delTypeOne({ payload, callback }, { call, put }) {
      const response = yield call(delTypeOne, payload);
      if (callback) callback(response);
    },
    *delTypeTwo({ payload, callback }, { call, put }) {
      const response = yield call(delTypeTwo, payload);
      if (callback) callback(response);
    },
    *delTypeThree({ payload, callback }, { call, put }) {
      const response = yield call(delTypeThree, payload);
      if (callback) callback(response);
    },

    *typeTwoSave({ payload, callback }, { call, put }) {
      const response = yield call(typeTwoSave, payload);
      if (callback) callback(response);
    },
    *editTypeNum({ payload, callback }, { call, put }) {
      const response = yield call(editTypeNum, payload);
      if (callback) callback(response);
    },
    *typeThreeSave({ payload, callback }, { call, put }) {
      const response = yield call(typeThreeSave, payload);
      if (callback) callback(response);
    },
    *typeTwoList({ payload, callback }, { call, put }) {
      const response = yield call(typeTwoList, payload);
      console.log(response);
      if (response.status === 1) {
        yield put({
          type: "save",
          payload: {
            typeTwoList: response.data ? response.data.data : []
          }
        });
      }
      if (callback) callback(response);
    },
    *typeFourList({ payload, callback }, { call, put }) {
      const response = yield call(typeFourList, payload);
      console.log(response);
      if (response.status === 1) {
        yield put({
          type: "save",
          payload: {
            typeFourList: response.data ? response.data : []
          }
        });
      }
      if (callback) callback(response);
    },
    *typeThreeList({ payload, callback }, { call, put }) {
      const response = yield call(typeThreeList, payload);
      console.log(response);
      if (response.status === 1) {
        yield put({
          type: "save",
          payload: {
            typeThreeList: response.data ? response.data.data : []
          }
        });
      }
      if (callback) callback(response);
    },
    *typeTwoDetail({ payload, callback }, { call, put }) {
      const response = yield call(typeTwoDetail, payload);
      console.log(response);
      if (response.status === 1) {
        yield put({
          type: "save",
          payload: {
            typeTwoDetail: response.data ? response.data : ""
          }
        });
      }
      if (callback) callback(response);
    },
    *fourDetail({ payload, callback }, { call, put }) {
      const response = yield call(fourDetail, payload);
      console.log(response);
      if (response.status === 1) {
        yield put({
          type: "save",
          payload: {
            fourDetail: response.data ? response.data : ""
          }
        });
      }
      if (callback) callback(response);
    },
    *typeThreeDetail({ payload, callback }, { call, put }) {
      const response = yield call(typeThreeDetail, payload);
      console.log(response);
      if (response.status === 1) {
        yield put({
          type: "save",
          payload: {
            typeThreeDetail: response.data ? response.data : ""
          }
        });
      }
      if (callback) callback(response);
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
