import { 
    getYear,
    getTime,
    getCity,
    getDayData,
    exportDayData,
    getGroup,
    errorTop5List,
    sortList,
    downError,
    errorSelData,
    questionDetail,
    defaulltRecordData,
} from '@/services/api';
export default {
    namespace: 'record',
    state: {
        dayData: '',
        yearList: [],
        timeList: [],
        cityList: [],
        groupList: [],
        top5List: [],
        sortList: [],
        sortData: '',
        questionDetail: '',
        errorSelData: '',

        transitionRecordData: '',
    },
    effects: {
        *fetch({payload, callback}, { call, put }) {
            const response = yield call(getDayData, payload);
            console.log(response)
            if(response.status === 1){
                yield put({
                    type: 'save',
                    payload: {
                        dayData: response.data || []
                    },
                });
            }
            if(callback)callback(response)
        },
        *transitionFetch({payload, callback}, { call, put }) {
            const response = yield call(getDayData, payload);
            console.log(response)
            if(response.status === 1){
                yield put({
                    type: 'save',
                    payload: {
                        transitionRecordData: response.data || []
                    },
                });
            }
            if(callback)callback(response)
        },
        *defaulltTransitionRecordData({payload, callback}, { call, put }) {
            const response = yield call(defaulltRecordData, payload);
            console.log(response)
            if(response.status === 1){
                yield put({
                    type: 'save',
                    payload: {
                        transitionRecordData: response.data || []
                    },
                });
            }
            if(callback)callback(response)
        },
        *defaulltDayRecordData({payload, callback}, { call, put }) {
            const response = yield call(defaulltRecordData, payload);
            console.log(response)
            if(response.status === 1){
                yield put({
                    type: 'save',
                    payload: {
                        dayData: response.data || []
                    },
                });
            }
            if(callback)callback(response)
        },
        *getYear({payload}, { call, put }) {
            const response = yield call(getYear, payload);
            yield put({
              type: 'save',
              payload: {
                  yearList: response.data || []
              },
            });
        },
        *getTime({payload}, { call, put }) {
            const response = yield call(getTime, payload);
            yield put({
              type: 'save',
              payload: {
                  timeList: response.data || []
              },
            });
        },
        *getCity({payload}, { call, put }) {
            const response = yield call(getCity, payload);
            yield put({
              type: 'save',
              payload: {
                  cityList: response.data || []
              },
            });
        },
        *getStatus({payload, callback}, { call, put }) {
            const response = yield call(getDayData, payload);
            if(callback)callback(response)
        },
        *exportDayData({payload, callback}, { call, put }) {
            console.log(payload)
            exportDayData(payload);
        },
        *getGroup({payload}, { call, put }) {
            const response = yield call(getGroup, payload);
            yield put({
              type: 'save',
              payload: {
                  groupList: response.data || []
              },
            });
        },
        *errorTop5List({payload}, { call, put }) {
            const response = yield call(errorTop5List, payload);
            yield put({
              type: 'save',
              payload: {
                  top5List: response.data || []
              },
            });
        },
        *sortList({payload}, { call, put }) {
            const response = yield call(sortList, payload);
            yield put({
              type: 'save',
              payload: {
                  sortList: response.data.alltotal || [],
                  sortData: response.data || ''
              },
            });
        },
        *errorSelData({payload}, { call, put }) {
            const response = yield call(errorSelData, payload);
            yield put({
              type: 'save',
              payload: {
                    errorSelData: response || '',
              },
            });
        },
        *questionDetail({payload}, { call, put }) {
            const response = yield call(questionDetail, payload);
            yield put({
              type: 'save',
              payload: {
                questionDetail: response.data || '',
              },
            });
        },
        *downError({payload}, { call, put }) {
            downError(payload);
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