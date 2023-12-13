import { ACTIONS } from "./actions";

 

export default function reducer(state, action){
    let newState
    let boards = state.boards
    let newBoard
    let boardNameAlreadyUsed
    let newBoards
    let currentBoard


    function getColumnByName(boardName, columnName){
        for (let i = 0; i < boards.length; i++){
            const board = boards[i]
            if (board.name == boardName){
                for (let j = 0; j < board.columns.length; j++){
                    const column = board.columns[j]
                    if (column.name == columnName){
                        return column
                    }
                }
            }   
        }
        return undefined
    }

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
                    currentBoard = board
                }
                return board
            })
            newState = {...state, boards: newBoards, currentBoard: currentBoard}
            localStorage.state = JSON.stringify(newState)
            return newState
        case ACTIONS.deleteColumn:
            newBoards = boards.map((board) => {
                if (board.name == action.payload.boardName){
                    board.columns = board.columns.filter((column) => {
                        if (column.name == action.payload.columnName){
                            return false
                        }
                        return true
                    })
                    currentBoard = board
                }
                return board
            })
            newState = {...state, boards: newBoards}
            localStorage.state = JSON.stringify(newState)
            return newState
        case ACTIONS.editBoard:
            newBoards = boards.map((board) => {
                if (board.name == action.payload.originalName){
                    board.name = action.payload.editedName
                    board.columns = action.payload.columns.map((column) => {
                        const { name } = column
                        if (column.originalName){
                            const originalColumn = getColumnByName(action.payload.originalName, column.originalName)
                            column = originalColumn == undefined ? getColumnByName(action.payload.editedName, name) : originalColumn
                            column.name = name                
                        }
                        return column
                    })
                    currentBoard = board
                }
                return board    
            })
            newState = {...state, boards: newBoards, currentBoard: currentBoard == undefined ? state.currentBoard : currentBoard}
            localStorage.state = JSON.stringify(newState)
            return newState
        case ACTIONS.updateSubtaskCheckedStatus:
            newBoards = boards.map((board) => {
                if (board.name == action.payload.board.name){
                    board.columns = board.columns.map((column) => {
                        if (column.name == action.payload.column.name){
                            column.tasks = column.tasks.map((task) => {
                                if (task.title == action.payload.task.title){
                                    task.subtasks = task.subtasks.map((subtask) => {
                                        if (subtask.title == action.payload.subtaskTitle){
                                            subtask.isCompleted = action.payload.checkedStatus
                                        }
                                        return subtask
                                    })
                                }
                                return task
                            })
                        }
                        return column
                    })
                    currentBoard = board
                }
                return board
            })
            newState = {...state, boards: newBoards, currentBoard: currentBoard}
            localStorage.state = JSON.stringify(newState)
            return newState
        case ACTIONS.moveTaskToAnotherColumn:
            newBoards = boards.map((board) => {
                if (board.name == action.payload.board.name){
                    board.columns = board.columns.map((column) => {
                        if (column.name == action.payload.column.name){
                            column.tasks = column.tasks.filter((task) => task.title != action.payload.task.title)
                        }
                        if (column.name == action.payload.newColumnName){
                            let shouldAddNewTask = true
                            column.tasks.forEach((task) => {
                                if (task.title == action.payload.task.title){
                                    shouldAddNewTask = false
                                }
                            })
                            if (shouldAddNewTask){
                                column.tasks.push(action.payload.task)
                            }
                        }
                        return column
                    })
                    currentBoard = board
                }
                return board
            })
            newState = {...state, boards: newBoards, currentBoard: currentBoard}
            localStorage.state = JSON.stringify(newState)
            return newState
        case ACTIONS.deleteTask:
            newBoards = boards.map((board) => {
                if (board.name == action.payload.board.name){
                    board.columns = board.columns.map((column) => {
                        if (column.name == action.payload.column.name){
                            column.tasks = column.tasks.filter((task) => {
                                if (task.title == action.payload.task.title){
                                    return false
                                }
                                return true
                            })
                        }
                        return column
                    })
                    currentBoard = board
                }
                return board
            })
            newState = {...state, boards: newBoards, currentBoard: currentBoard}
            localStorage.state = JSON.stringify(newState)
            return newState
        case ACTIONS.editTask:
            

            newBoards = boards.map((board) => {
                if ((board.name == action.payload.board.name)){
                    const editedTask = {
                        title: action.payload.title,
                        description: action.payload.description,
                        subtasks: action.payload.subtasks
                    }
                    const shouldMoveTaskToAnotherColumn = action.payload.column.name != action.payload.newColumn
                    board.columns = board.columns.map((column) => {
                        if (shouldMoveTaskToAnotherColumn){
                            if (column.name == action.payload.column.name){
                                column.tasks = column.tasks.filter((task) => task.title != action.payload.task.title)
                            }
                            if (column.name == action.payload.newColumn){
                                let shouldAddNewTask = true
                                column.tasks.forEach((task) => {
                                    if (task.title == action.payload.title){
                                        shouldAddNewTask = false
                                    }
                                })
                                if (shouldAddNewTask){
                                    column.tasks.push(editedTask)
                                }
                            }
                        }else{
                            if (column.name == action.payload.newColumn){
                                column.tasks = column.tasks.map((task) => {
                                    if (task.title == action.payload.task.title){
                                        return editedTask
                                    }
                                    return task
                                })
                                
                            }
                        }
                        return column
                    })
                    currentBoard = board
                }
                return board
            })
            newState = {...state, boards: newBoards, currentBoard: currentBoard}
            localStorage.state = JSON.stringify(newState)
            return newState
        default:
            return state
    }
}