import { useEffect, useState } from "react"
import ColumnInput from "./ColumnInput"
import { detectColumnError } from "./ColumnInput"

// Context
import { useAutoDestruction } from "../../PopUpContainer"
import { useBoardsContext, useDispatch } from "../../../../App"

import { ACTIONS } from "../../../../state_management/actions"
import NameInput from "./NameInput"
import { TYPES } from "./types"

export default function AddOrEditBoard({ type, board = null, mobileDeletePopUpFunction=null }) {

    // We use an array of empy strings to represent the columns.
    // Each element of this array will reactively change to have the name of the column.
    // [column name, key]
    const [columns, setColumns] = useState([['', 0]])

    // Key column value is used to presereve the uniqueness of each key, this is just for requirement on react.
    const [keyColumnValue, setKeyColumnValue] = useState(1)


    const [boardName, setBoardName ] = useState('')
    const [boardNameError, setBoardNameError ] = useState('')

    // Used to detect errors during the submission.
    
    const [submissionErrors, setSubmissionErrors ] = useState(false)

    let autoDestructionFunction;
    
    if (mobileDeletePopUpFunction){
        autoDestructionFunction = mobileDeletePopUpFunction
    }else{
        autoDestructionFunction = useAutoDestruction()
    }

    const boards = useBoardsContext()
    
    const dispatch = useDispatch()



    useEffect(() => {
        if (type == TYPES.edit){
            let { name, columns } = board
            columns = columns.map((column, i) => {
                return [column.name, i]
            })
            setBoardName(name)
            setColumns(columns)
            setKeyColumnValue(columns.length)
        }
    }, [])

    const handleBoardNameChange = (e) => {
        setBoardName(e.target.value)
    }
    const setColumnValue = (index, value) => {
        const columnsCopy = [...columns] 
        columnsCopy[index][0] = value
        setColumns(columnsCopy)
    }

    const columnExistedInOriginalBoard = (key) => {
        if (board.columns[key]){
            return true
        }
        return false
    }

    const getOrginalColumnName = (key) => board.columns[key].name

    const deleteColumn = (index) => {
        const columnsCopy = columns.slice(0, index).concat(columns.slice(index + 1))
        setColumns(columnsCopy)
    }

    

    // This function is to keep the click only on the local scope of the component
    //  Why? because this is important in order for the user to close the tab.
    // Since this will be rendered on the popupcontainer. if the user clicks on the
    // popup container it will close, but not if he clicks on the popup itself?
    // why? because we have stop propagation :3

    function preventPropagation(e){
        e.stopPropagation()
    }

    const addNewColumn = (e) => {
        e.preventDefault()
        const columnsCopy = [...columns, ['', keyColumnValue]]
        setKeyColumnValue(keyColumnValue + 1)
        setColumns(columnsCopy)
    }

    

    const detectBoardNameError = (boardName) => {
        let error = ''
        for (let i = 0; i < boards.length; i++){
            let currentBoard = boards[i]
            if ((currentBoard.name == boardName && board == null ) || ( currentBoard.name == boardName && boardName != board.name )){
                error = 'This board name is currently in use.'
            }
        }

        if (boardName == ''){
            error = 'Board name must not be empty.'
        }
        setBoardNameError(error)
        return error == '' ? false : true
    }

    useEffect(() => {
        detectBoardNameError(boardName)
    }, [boardName])

    const detectColumnsErrors = (columns) => {
        for (let i = 0; i < columns.length; i++){
            const column = columns[i]
            if (detectColumnError(columns, column)){
                return true
            }
        }
        return false
    }
    const detectSubmissionErrors = (boardName, columns) => detectBoardNameError(boardName) || detectColumnsErrors(columns)

    const formatColumnsToStoreData = (columns) => {
        return columns.map((column, index) => {
            return {
                name: column[0],
                id: index,
                tasks: [],
            }
        })
    }

    const saveFormToStore = (boardName, columns) => {

        
        let action = {
            type: ACTIONS.addBoardToStore,
            payload: {
                name: boardName,
                columns: formatColumnsToStoreData(columns)
            }
        }
        dispatch(action)
    }

    function editStoredBoard(board, editedBoardName, editedBoardColumns){
        const action = {
            type: ACTIONS.editBoard,
            payload:{
                originalName: board.name,
                editedName: editedBoardName,
                columns: editedBoardColumns.map((column) => {
                    const key = column[1]
                    const name = column[0]
                    if (columnExistedInOriginalBoard(key)){
                        return {
                            originalName: getOrginalColumnName(key),
                            name: name,
                        }
                    }
                    return {name: name, tasks: []}
                })
            }
        }
        dispatch(action)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if (detectSubmissionErrors(boardName, columns) == false){
            if (type == TYPES.add){
                saveFormToStore(boardName, columns)   
            }
            if (type == TYPES.edit){
                editStoredBoard(board, boardName, columns)
            }
            autoDestructionFunction()
        }else{
            setSubmissionErrors(true)
        }

    }
    return(
        <form onClick={preventPropagation} onSubmit={handleSubmit} className="dark:bg-darkGrey max-w-full w-[480px] bg-white px-6 py-8 flex flex-col gap-5">
            <h1 className="dark:text-white font-bold text-xl ">{type == TYPES.add ? 'Add New Board' : 'Edit Board'}</h1>
            <div className="flex flex-col gap-2 dark:text-white">
                <h3 className="dark:text-white font-bold text-grayText">{type == TYPES.edit ? 'Board ' : ''}Name</h3>
                <NameInput boardName={boardName} submissionErrors={submissionErrors} handleBoardNameChange={handleBoardNameChange} error={boardNameError}/>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="dark:text-white font-bold text-grayText">Columns</h3>
                <div className="pb-6 flex flex-col gap-2 dark:text-white">
                    {columns.map( (column, i) => <ColumnInput key={column[1]} index={i} column={column} columns={columns} setColumnValue={setColumnValue} deleteColumn={deleteColumn} submissionErrors={submissionErrors}/>)}
                </div>
                <div className="flex flex-col gap-4">
                    <button  onClick={addNewColumn} className="dark:bg-white bg-mainPurple bg-opacity-10 p-2 text-mainPurple font-bold rounded-full">+ Add New Column</button>
                    <button type="submit" className="bg-mainPurple p-2 rounded-full text-white font-semibold">{type == TYPES.add ? 'Create New Board' : 'Save Changes'}</button>
                </div>
            </div>
        </form>
    )
}