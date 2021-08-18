import {combineReducers, createStore} from 'redux';
import RegionsReducer, { RegionsState } from './reducers/RegionsReducer';
import sizeReducer, { SizeState } from './reducers/SizeReducer';

export interface MainState {
    size: SizeState,
    regions: RegionsState
}

export interface Action {
    type: string,
    data: any
}

let reducers = combineReducers({
    size: sizeReducer,
    regions: RegionsReducer
});

let store = createStore(reducers);


export default store;