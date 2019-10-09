const urlGraphQL = 'https://react.eogresources.com/graphql';
const graphQLRequestBody = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
};

export function getMeasurements ( metricName ) {
	const operationName = 'GetMeasurements';
	const query =
		`query ${ operationName } ( $metricName: String! ) {
			getMeasurements( input: { metricName: $metricName } ) {
				unit
				metric
				at
				value
			}
		}`;
	return fetch(
		urlGraphQL,
		{
			...graphQLRequestBody,
			body: JSON.stringify( {
				query,
				variables: { metricName }
			} )
		}
	);
}
export function getMultipleMeasurements ( metricsName ) {
	const operationName = 'GetMultipleMeasurements';
	const query =
		`query ${ operationName } ( $metricsName: [ MeasurementQuery ] ) {
			getMultipleMeasurements( input: $metricsName ) {
				measurements {
					unit
					metric
					at
					value
				}
			}
		}`;
	return fetch(
		urlGraphQL,
		{
			...graphQLRequestBody,
			body: JSON.stringify( {
				query,
				variables: { metricsName }
			} )
		}
	);
}