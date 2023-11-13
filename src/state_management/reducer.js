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
        case ACTIONS.addTask:
            newBoards = boards.map((board) => {
                if (board.name == action.payload.board){
                    board.columns = board.columns.map((column) => {
                        if (column.name == action.payload.column){
                            let newTask = {
                                title: action.payload.name,
                                description: action.payload.description,
                                subtasks: action.payload.subTasks.map((subTaskName) => ({title: subTaskName, isCompleted: false}))
                            }
                            // This is to make the flux function pure, that means same input always gives the same output.
                            // No matter what, so we will guarantee by this way we are only adding the newTask once, cause
                            // react calls this function several times while on Strict mode
                            let found = false
                            for (let i = 0; i < column.tasks.length; i++){
                                let task = column.tasks[i]
                                if (task.title == newTask.title){
                                    found = true
                                }
                            }

                            if (!found){
                                column.tasks.push(newTask)
                            }
                        }
                        return column
                    })
                }
                return board
            })
            newState = {...state, boards: newBoards}
            localStorage.state = JSON.stringify(newState)
            return newState
        default:
            return state
    }
}