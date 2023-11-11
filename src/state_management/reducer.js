import { ACTIONS } from "./actions";

export default function reducer(state, action){
    let newState
    let boards = state.boards
    let newBoard
    switch (action.type){
        case ACTIONS.toggleTheme:
            newState = {...state, theme: action.payload}
            localStorage.state = JSON.stringify(newState) 
            return newState
        case ACTIONS.changeCurrentBoard:
            newState = {...state, currentBoard: action.payload}
            localStorage.state = JSON.stringify(newState)
            return newState
        case ACTIONS.addBoardToStore:
            newBoard = {...action.payload, id: boards.length}
            boards.push(newBoard)
            newState = {...state, boards: boards, currentBoard: newBoard}
            localStorage.state = JSON.stringify(newState)
            return newState
        default:
            return state
    }
}