import { Action } from './../store';

export const changeSizeAction = (id: string) : Action => {
    return {
        type: 'CHANGE_SIZE',
        data: id
    }
}