import { handleActions } from 'redux-actions';
import { charts as actions } from '../actions/index';

const initialState = {};
const { setData, updateData } = actions;

export const reducer = handleActions(
	{
		[ setData ]: ( state, { payload } ) => {
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
			//metric not ok
			if ( !state[ metric ] ) {
				return { ...state };
			}
			//metric is ok
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
