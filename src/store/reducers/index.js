import {
	reducer as metrics,
	selectors as metricSelectors
} from './metrics';
import {
	reducer as charts,
	selectors as chartsSelectors
} from './charts';

export const reducers = {
	charts,
	metrics
};
export const selectors = {
	charts: chartsSelectors,
	metrics: metricSelectors
}