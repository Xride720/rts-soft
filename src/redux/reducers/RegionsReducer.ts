import { Action } from "../store";

const DATA_UPDATE = "DATA_UPDATE";
const CHANGE_PAGINATION = "CHANGE_PAGINATION";
const RegionsSrc = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
export interface RegionsState {
    loader: boolean,
    regions: any[],
    regionsQuery: string[],
    paginationPage: number
}
let  initialState : RegionsState = {
    loader: true,
    regions: [],
    regionsQuery: RegionsSrc,
    paginationPage: 1
};


const RegionsReducer = (state : RegionsState = initialState, action: Action) => {
    switch (action.type) {
        case DATA_UPDATE:
            state.loader = false;
            state.regions = action.data;
            return state;
        case CHANGE_PAGINATION:
            state.paginationPage = action.data;
            return state;
        default:
            return state;
    }
};

export default RegionsReducer;