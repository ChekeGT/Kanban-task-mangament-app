import { useEffect, useState } from "react"
import ColumnInput from "./ColumnInput"

// Context
import { useAutoDestruction } from "../../PopUpContainer"
import { useBoardsContext, useDispatch } from "../../../../App"

import { ACTIONS } from "../../../../state_management/actions"
import NameInput from "./NameInput"
import { TYPES } from "./types"

export default function AddNewBoard({ type, board = null }) {

    // We use an array of empy strings to represent the columns.
    // Each element of this array will reactively change to have the name of the column.
    // [column name, key]
    const [columns, setColumns] = useState([['', 0]])

    // Key column value is used to presereve the uniqueness of each key, this is just for requirement on react.
    const [keyColumnValue, setKeyColumnValue] = useState(1)


    const [boardName, setBoardName ] = useState('')

    // Used to detect errors during the submission.
    
    const [submissionErrors, setSubmissionErrors ] = useState(false)

    const autoDestructionFunction = useAutoDestruction()

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
        }
    }, [board])

    const handleBoardNameChange = (e) => {
        setBoardName(e.target.value)
    }
    const setColumnValue = (index, value) => {
        const columnsCopy = [...columns] 
        columnsCopy[index][0] = value
        setColumns(columnsCopy)
    }

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

    const boardNameAlreadyUsed = (boardName) => {
        for (let i = 0; i < boards.length; i++){
            let currentBoard = boards[i]
            if ((currentBoard.name == boardName && board == null ) || ( currentBoard.name == boardName && boardName != board.name )){
                return true
            }
        }
    }
    const detectSubmissionErrors = (boardName, columns) => {
        let errors = false
        columns.forEach((column, i) => {
            if (column[0] == ''){
                errors = true
            }
            for (let j = i + 1; j < columns.length; j++){
                const comparativeColumn = columns[j]
                if (column[0] == comparativeColumn[0]){
                    errors = true
                }
            }
        })
        if (boardName == ''){
            errors = true
        }
        if (boardNameAlreadyUsed(boardName)){
            errors = true
        }
        return errors
    }

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
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if (detectSubmissionErrors(boardName, columns) == false){
            if (type == TYPES.add){
                saveFormToStore(boardName, columns)   
            }
            autoDestructionFunction()
        }else{
            setSubmissionErrors(true)
        }

    }
    return(
        <form onClick={preventPropagation} onSubmit={handleSubmit} className="dark:bg-darkGrey w-[480px] bg-white px-6 py-8 flex flex-col gap-5">
            <h1 className="dark:text-white font-bold text-xl ">{type == TYPES.add ? 'Add New Board' : 'Edit Board'}</h1>
            <div className="flex flex-col gap-2 dark:text-white">
                <h3 className="dark:text-white font-bold text-grayText">{type == TYPES.edit ? 'Board ' : ''}Name</h3>
                <NameInput boardName={boardName} submissionErrors={submissionErrors} handleBoardNameChange={handleBoardNameChange} usedBoardName={boardNameAlreadyUsed(boardName)}/>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="dark:text-white font-bold text-grayText">Columns</h3>
                <div className="pb-6 flex flex-col gap-2 dark:text-white">
                    {columns.map( (column, i) => <ColumnInput key={column[1]} index={i} value={column[0]} setColumnValue={setColumnValue} deleteColumn={deleteColumn} submissionErrors={submissionErrors}/>)}
                </div>
                <div className="flex flex-col gap-4">
                    <button  onClick={addNewColumn} className="dark:bg-white bg-mainPurple bg-opacity-10 p-2 text-mainPurple font-bold rounded-full">+ Add New Column</button>
                    <button type="submit" className="bg-mainPurple p-2 rounded-full text-white font-semibold">{type == TYPES.add ? 'Create New Board' : 'Save Changes'}</button>
                </div>
            </div>
        </form>
    )
}