import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../store/reducers';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => ( {
	root: {
		display: 'flex',
		flexGrow: '1',
	},
	paper: {
		boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
		transition: '0.3s',
		textAlign: 'center',
		width: '100%',
		margin: '2px 5px',
		padding: '0 5px'
	},
	metricText:{
		textDecoration: 'underline'
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
				const metricText = metric.metric.replace(/([A-Z])/g, ' $1').replace(/^./, (str)=> str.toUpperCase());
				return (
					<Paper
						key={ idx }
						className={ classes.paper }
					>
						<div>
							<h4 className={classes.metricText}><b>{ metricText }</b></h4>
							<p>{ metric.value }</p>
						</div>
					</Paper>
				);
			} ) }
		</div>
	);
}