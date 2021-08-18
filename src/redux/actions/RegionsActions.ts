import { Region } from '../../components/ChartList/ChartList';
import { Action } from './../store';

export const dataUpdateAction = (regions: Region[]) : Action => {
    return {
        type: "DATA_UPDATE",
        data: regions
    }
}

export const changePaginationAction = (id: number) : Action => {
    return {
        type: "CHANGE_PAGINATION",
        data: id
    }
}