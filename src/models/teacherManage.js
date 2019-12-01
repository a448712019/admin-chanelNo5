import { getTeacherList, delTeacher, tyepList, teacherDetail, editPassword, confirm, confirmEditUser } from '@/services/api';

export default {
    namespace: 'teacher',
    state: {
      list: [],
      typeList: [],
      teacherDetail: '',
      editPasswordDetail: ''
    },
    effects: {
        *fetch({payload}, { call, put }) {
          const response = yield call(getTeacherList, payload);
          yield put({
            type: 'save',
            payload: {
                list: response.data || []
            },
          });
        },
        *del({payload, callback}, { call }) {
            console.log(payload)
            const response = yield call(delTeacher, payload);
            if(callback)callback(response)
        },
        *getTypeList({payload}, { call, put }) {
            const response = yield call(tyepList, payload);
            yield put({
              type: 'save',
              payload: {
                  typeList: response.data || []
              },
            });
        },
        *getTeacherDetail({payload, callback}, { call, put }) {
            const response = yield call(teacherDetail, payload);
            yield put({
              type: 'save',
              payload: {
                  teacherDetail: response.data || ''
              },
            });
            if(callback)callback(response)
        },
        *editPassword({payload, callback}, { call, put }) {
            const response = yield call(editPassword, payload);
            yield put({
              type: 'save',
              payload: {
                  editPasswordDetail: response.data || ''
              },
            });
            if(callback)callback(response)
        },
        *confirm({payload, callback}, { call, put }) {
            const response = yield call(confirm, payload);
            if(callback)callback(response)
        },
        *confirmEditUser({payload, callback}, { call, put }) {
            const response = yield call(confirmEditUser, payload);
            if(callback)callback(response)
        },

    },
    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            };
          },
    }
}