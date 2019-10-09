import { handleActions } from 'redux-actions';
import { metrics as actions } from "../actions/index";

const initialState = {
	metrics: [],
	metricsSelected: [],
	current: {}
};
const { setMetricsReceived, setMetricsSelected, newMetrics } = actions;

export const reducer = handleActions(
	{
		[ setMetricsReceived ]: ( state, { payload } ) => ( {
				...state,
				metrics: payload
		} ),
		[ setMetricsSelected ] : ( state, { payload } ) => {
			return ( {
			...state,
			metricsSelected: payload
		} ) },
		[ newMetrics ]: ( state, { payload } ) => {
			const { metric } = payload;
			return ( {
				...state,
				current: {
					...state.current,
					[ metric ]: payload
				}
			} );
		}
	},
	initialState
);

const getMetrics = state => state.metrics;

export const selectors = {
	getMetrics: state => getMetrics( state ).metrics,
	getCurrent: state => getMetrics( state ).current,
	getSelectedMetrics: state => getMetrics( state ).metricsSelected,
};