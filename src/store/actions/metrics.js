import { createAction } from 'redux-actions';
import { metrics } from '../Types';

const {
	METRICS_RECEIVED,
	SET_METRICS_SELECTED,
	NEW_METRICS
} = metrics;

export const setMetricsReceived = createAction( METRICS_RECEIVED );
export const setMetricsSelected = createAction( SET_METRICS_SELECTED );
export const newMetrics = createAction( NEW_METRICS );