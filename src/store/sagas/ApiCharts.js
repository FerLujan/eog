import { all, takeLatest, select, call, put } from 'redux-saga/effects'
import { metrics as actions } from '../Types';
import { charts } from '../actions/index';
import { selectors } from '../reducers';
import { apimetrics } from '../api'

function* getCharts () {
	const metricsSelected = yield select( selectors.metrics.getSelectedMetrics );
	const { length } = metricsSelected;
	let measurements;

	if ( !length ) {
		return yield put( charts.setData( [] ) );
	} else if ( length > 1 ) {
		const data = metricsSelected.map( val => ( { metricName: val } ) );

		measurements = yield call( apimetrics.getMultipleMeasurements, data );
	} else {
		measurements = yield call( apimetrics.getMeasurements, ...metricsSelected );
	}

	if ( !measurements.ok ) {
		throw new Error( 'Could not retrieve charts data' );
	}

	const { data } = yield measurements.json();
	const { getMeasurements, getMultipleMeasurements } = data;

	yield put( charts.setData( getMeasurements || getMultipleMeasurements ) )
}

export function* saga () {
	yield all( {
		getCharts: takeLatest( actions.SET_METRICS_SELECTED, getCharts )
	} );
}