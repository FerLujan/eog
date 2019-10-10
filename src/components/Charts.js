import React from "react";
import { useSelector } from 'react-redux';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { selectors } from '../store/reducers';

const useStyles = makeStyles( {
	card: {
		marginTop: 15,
		margin: '15px auto 10px',
		width: '90%'
	}
} );
const chartOptions = {
	credits: {
		enabled: false
	},
	title: {
		text: ''
	},
	xAxis: {
		type: 'datetime',
		crosshair: true
	}
};

export default () => {
	const data = useSelector( selectors.charts.getChartsData );
	const classes = useStyles();
	const metrics = Object.keys( data );

	if ( !metrics.length ) {
		return '';
	}

	let options = {};
	const series = [];
	const units  = [];

	for ( let metric of metrics ) {
		const values = data[ metric ];
		const value = values[ 0 ];

		units.push( value.unit );
		series.push( {
			name: value.metric,
			data: values.map( val => [ new Date( val.at ), val.value] )
		} );
	}

	options = {
		...chartOptions,
		series,
		yAxis: {
			title: {
				text: units.join( ', ' )
			}
		}
	};
	return (
		<Card className={ classes.card }>
			<CardContent>
				<HighchartsReact
					highcharts={ Highcharts }
					options={ options }
				/>
			</CardContent>
		</Card>
	);
};