import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../store/reducers';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ( {
	root: {
		display: 'flex'
	},
	paper: {
		textAlign: 'center',
		width: '100%',
		margin: '0 5px',
		padding: '0 5px'
	}
} ) );

export default function Cards () {
	const data = useSelector( selectors.charts.getChartsData );
	const currentData = useSelector( selectors.metrics.getCurrent );
	const classes = useStyles();
	const metrics = Object.keys( data );

	// Verify first that there is data available (metrics) to show
	if ( Object.keys( currentData ).length === 0 ||
		metrics.length === 0
	) {
		return '';
	}
	return (
		<div className={ classes.root }>
			{ metrics.map( ( v, idx ) => {
				const metric = currentData[ v ];

				if ( metric === undefined ) {
					return '';
				}
				return (
					<Paper
						key={ idx }
						className={ classes.paper }
					>
						<div>
							<h3>{ metric.metric }</h3>
							<h3>{ metric.value }</h3>
						</div>
					</Paper>
				);
			} ) }
		</div>
	);
}