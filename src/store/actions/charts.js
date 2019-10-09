import { createAction } from 'redux-actions';
import { charts } from '../Types';

const { GET_DATA, SET_DATA, UPDATE_DATA } = charts;

export const getData = createAction( GET_DATA );
export const setData = createAction( SET_DATA );
export const updateData = createAction( UPDATE_DATA );
