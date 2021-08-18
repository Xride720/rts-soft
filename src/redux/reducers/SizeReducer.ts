import { Action } from "../store";

const CHANGE_SIZE = 'CHANGE_SIZE';
export interface SizeState {
    [index: string] : boolean
}
let  initialState : SizeState = {
    first: true,
    second: false,
    smart: false
};


const sizeReducer = (state : SizeState = initialState, action: Action) => {
    switch (action.type) {
        case CHANGE_SIZE:
            for (let id in state) {
                if (id == action.data)
                    state[id] = true;
                else state[id] = false;
            }
            return state;
        
        default:
            return state;
    }
};

export default sizeReducer;