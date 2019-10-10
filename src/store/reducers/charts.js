import { handleActions } from 'redux-actions';
import { charts as actions } from '../actions/index';

const initialState = {};
const { setData, updateData } = actions;

export const reducer = handleActions(
	{
		[ setData ]: ( state, { payload } ) => {
			// payload is the data retrieved for the selected metric(s)
			const { length } = payload;

			if ( !length ) {
				return {};
			} else if ( length > 6 ) {
				return {
					[ payload[ 0 ].metric ]: payload.splice( length - 1080 )
				};
			} else {
				const metrics = {};

				for ( const { measurements } of payload ) {
					metrics[ measurements[ 0 ].metric ] =
						measurements.splice( measurements.length - 1080 );
				}
				return { ...metrics };
			}
		},
		[ updateData ]: ( state, { payload } ) => {
			const { metric } = payload;

			// validate that the metric is still there
			if ( !state[ metric ] ) {
				return { ...state };
			}
			return {
				...state,
				[ metric ]: [ ...state[ metric ], payload ]
			}
		}
	},
	initialState
);
export const selectors = {
	getChartsData: state => state.charts
};