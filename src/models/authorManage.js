import {
    authorList,
    authorDetail,
    addAuthor,
    updateAuthor,
    delAuthor,
} from '@/services/api';

export default {
    namespace: 'author',
    state: {
        list: [],
        detail: '',
    },
    effects: {
        *fetch({payload, callback}, { call, put }) {
            const response = yield call(authorList, payload);
            console.log(response)
            if(response.status === 1){
                yield put({
                    type: 'save',
                    payload: {
                        list: response.data || []
                    },
                });
            }
            if(callback)callback(response)
        },
        *authorDetail({payload, callback}, { call, put }) {
            const response = yield call(authorDetail, payload);
            console.log(response)
            if(response.status === 1){
                yield put({
                    type: 'save',
                    payload: {
                        detail: response.data || []
                    },
                });
            }
            if(callback)callback(response)
        },
        *addAuthor({payload, callback}, { call, put }) {
            const response = yield call(addAuthor, payload);
            if(callback)callback(response)
        },
        *updateAuthor({payload, callback}, { call, put }) {
            const response = yield call(updateAuthor, payload);
            if(callback)callback(response)
        },
        *delAuthor({payload, callback}, { call, put }) {
            const response = yield call(delAuthor, payload);
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