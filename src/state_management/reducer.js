import { ACTIONS } from "./actions";

export default function reducer(state, action){
    let newState
    switch (action.type){
        case ACTIONS.toggleTheme:
            newState = {...state, theme: action.payload}
            localStorage.state = JSON.stringify(newState) 
            return newState
        case ACTIONS.changeCurrentBoard:
            newState = {...state, currentBoard: action.payload}
            localStorage.state = JSON.stringify(newState)
            return newState
        default:
            return state
    }
}