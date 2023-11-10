import { ACTIONS } from "./actions";

export default function reducer(state, action){
    switch (action.type){
        case ACTIONS.toggleTheme:
            let newState = {...state, theme: action.payload}
            localStorage.state = JSON.stringify(newState) 
            return newState
        default:
            return state
    }
}