export default {
  namespace: 'opproval',
  state: {

  },
  effects: {
    *deleteGoodsFavoritesEFF({ val }, { put, call, select }) {
      const searchParam = yield select(state => state.order);
      const data = yield call(getPersonOrderList, { ...searchParam.searchParam, ...val });

      if (data.result == 1) {
        yield put({ type: 'PersonOrderList', favListData: data, total: data.total });
      } else {
        message.error(data.msg, 1.5, () => { });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname == '/personOrder/order') {
          // dispatch({ type: 'personOrderListEFF' });
        }
      })
    }
  },
  reducers: {
    PersonOrderList(state, { favListData, total }) {
      const { data } = favListData
      return {
        ...state,
        favListData: data,
        orderListTotal: total
      }
    },
  }
}