import { ACTIONS } from "./actions";

export default function reducer(state, action){
    let newState
    let boards = state.boards
    let newBoard
    let boardNameAlreadyUsed
    let newBoards
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
            newBoard = action.payload
            boardNameAlreadyUsed = false
            boards.forEach((board) => {
                if (board.name == newBoard.name){
                    boardNameAlreadyUsed = true
                }
            })
            if(!boardNameAlreadyUsed){
                boards.push(newBoard)
                newState = {...state, boards: boards, currentBoard: newBoard}
                localStorage.state = JSON.stringify(newState)
                console.log(newState)
                return newState
            }else{
                newState = {...state, currentBoard: newBoard}
                localStorage.state = JSON.stringify(newState)
                return newState
            }
        case ACTIONS.deleteBoard:
            newBoards = boards.filter((board) => board.name != action.payload)
            newState = {...state, boards: newBoards, currentBoard: null}
            localStorage.state = JSON.stringify(newState)
            return newState
        default:
            return state
    }
}