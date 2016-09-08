/* eslint-disable no-constant-condition */

import { takeEvery, delay } from 'redux-saga'
import { put, call, fork, take } from 'redux-saga/effects'
import { createEventChannel } from 'redux-saga-coon'

export function* watchExternal(){
    const channel = createEventChannel({ channelName: 'counter-example'})
    while(true){
        const payload = yield take(channel)

        yield put(payload)
    }
}

export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({type: 'INCREMENT'})
}

export default function* rootSaga() {
  yield fork(watchExternal)
  yield* takeEvery('INCREMENT_ASYNC', incrementAsync)
}
