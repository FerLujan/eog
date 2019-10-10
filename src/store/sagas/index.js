// import ApiErrors from "./ApiErrors";
import { fork } from 'redux-saga/effects';
import { saga as ApiCharts } from './ApiCharts';

function* rootSaga () {
	yield fork( ApiCharts );
}

export default rootSaga;

//
