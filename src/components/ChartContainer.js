import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//Components
import Metrics from './Metrics';
import Cards from './Cards';
import Charts from './Charts';
import SuscriptionWS from './SubscriptionsWS';

const useStyles = makeStyles( theme => ( {
	root: {
		display: 'flex'
	},
	cont:{
		backgrounColor: "#f9f9f9",
		width: '30%',
		height: '100%'
	},

}));

export default function Content () {
	const classes = useStyles();
	return (
		<div>
			<div className={classes.root}>
				<Metrics/>
				<SuscriptionWS />
				<Cards />
			</div>
			<Charts />
		</div>
	);
}