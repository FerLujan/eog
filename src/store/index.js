import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import saga from './sagas';
import { reducers } from './reducers';

export default () => {
	const rootReducer = combineReducers( reducers );
	const composeEnhancers = composeWithDevTools({});
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(
		rootReducer,
		composeEnhancers( applyMiddleware ( sagaMiddleware ) )
	);

	sagaMiddleware.run( saga );
	return store;
};