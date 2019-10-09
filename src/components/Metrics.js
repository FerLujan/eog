import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectors } from "../store/reducers";
import { Provider, createClient, useQuery } from "urql";
import LinearProgress from "@material-ui/core/LinearProgress";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { metrics as metricsActions } from '../store/actions/index';
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles( theme =>({
        formControl: {
            margin: theme.spacing( 1 ),
            minWidth: 120,
            maxWidth: 250
        }
    })
);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};
const client = createClient({
	url: "https://react.eogresources.com/graphql"
});

const query = `
	{
		getMetrics
	}
`;
const Metrics = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const metrics = useSelector( selectors.metrics.getMetrics );
	const selectedMetrics = useSelector( selectors.metrics.getSelectedMetrics );
	const [ result ] = useQuery( {
		query: query
	} );
	const { fetching, data, error } = result;
	const setMetricsSelected = e => {
		dispatch( metricsActions.setMetricsSelected( e.target.value ) );
	};
	useEffect(
		() => {
			if ( error ) {
				// dispatch({ type: actions.API_ERROR, error: error.message });
				return;
			} else if ( !data ) {
				return;
			};

			const { getMetrics } = data;

			dispatch( metricsActions.setMetricsReceived( getMetrics ) );
		},
		[ dispatch, data, error ]
	);

	if ( fetching ) {
		return <LinearProgress />
	};
	return (
		<FormControl className={ classes.formControl }>
			<InputLabel htmlFor="select-multiple-metrics">Metrics</InputLabel>
			<Select
				value={ selectedMetrics }
				multiple={ true }
				onChange={ setMetricsSelected }
				renderValue={ selected => selected.join( ', ') }
				MenuProps={ MenuProps }
				input={ <Input id='select-multiple-metrics' /> }
			>
				{ metrics.map( ( val, idx ) => (
					<MenuItem
						key={ idx }
						value={ val }
					>
						<Checkbox checked={ selectedMetrics.indexOf( val ) > -1 } />
						<ListItemText primary={ val } />
					</MenuItem>
				) ) }
			</Select>
		</FormControl>
	);
};
export default () => {
	return (
		<Provider value={ client }>
			<Metrics />
		</Provider>
	);
};