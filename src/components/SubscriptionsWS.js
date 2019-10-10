import { useEffect } from 'react'
import { gql } from 'apollo-boost';
import { useSubscription } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../store/reducers';
import {
	metrics as metricActions,
	charts as chartsActions
} from '../store/actions/index';

const NEW_MEASUREMENT_SUBSCRIPTION = gql`
subscription {
	newMeasurement {
		metric
		at
		value
		unit
	}
}`;

export default function SubscriptionWS () {
	const data = useSelector( selectors.charts.getChartsData );
	const dispatch = useDispatch();
	const {
		data: { newMeasurement } = {},
		loading
	} = useSubscription( NEW_MEASUREMENT_SUBSCRIPTION );

	useEffect(
		() => {
			return function () {
				if ( !newMeasurement ) {
					return;
				}

				const metrics = Object.keys( data );

				if (
					metrics.length &&
					metrics.includes( newMeasurement.metric )
				) {
					dispatch( chartsActions.updateData( newMeasurement ) );
				}
			}
		}
	);

	if ( !loading ) {
		dispatch( metricActions.newMetrics( newMeasurement ) );
	}
	return '';
}