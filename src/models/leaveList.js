import { 
    getLeaveList,
    delLeave
 } from '@/services/api';

export default {
    namespace: 'leaveList',
    state: {
      list: [],
      total: 0,

    },
    effects: {
        *fetch({payload}, { call, put }) {
          const response = yield call(getLeaveList, payload);
          yield put({
            type: 'save',
            payload: {
                list: response.data || []
            },
          });
        },
        *delLeave({payload, callback}, { call, put }) {
          const response = yield call(delLeave, payload);
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