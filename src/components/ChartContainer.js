import React, { Fragment } from 'react';
import Cards from './Cards';
import Charts from './Charts';
import MetricsSubscription from './MetricSubscriptions';

export default function Content () {
	return (
		<Fragment>
			{/* <MetricsSubscription /> */}
			<Cards />
			<Charts />
		</Fragment>
	);
}