import { useState } from "react"
import ColumnInput from "./ColumnInput"
import { useAutoDestruction } from "../../PopUpContainer"

export default function AddNewBoard() {

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

    const detectSubmissionErrors = (boardName, columns) => {
        let errors = false
        columns.forEach((column) => {
            if (column[0] == ''){
                errors = true
            }
        })
        if (boardName == ''){
            errors = true
        }
        return errors
    }

    const saveFormToStore = (boardName, columns) => {
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if (detectSubmissionErrors(boardName, columns) == false){
            saveFormToStore(boardName, columns)
            autoDestructionFunction()
        }else{
            setSubmissionErrors(true)
        }

    }
    return(
        <form onClick={preventPropagation} onSubmit={handleSubmit} className="dark:bg-darkGrey w-[480px] bg-white px-6 py-8 flex flex-col gap-5">
            <h1 className="dark:text-white font-bold text-xl ">Add New Board</h1>
            <div className="flex flex-col gap-2">
                <h3 className="dark:text-white font-bold text-grayText">Name</h3>
                <div className="relative">
                    <input name="board-name" className={`dark:bg-darkGrey w-full p-2 rounded-md  border border-gray ${(submissionErrors && boardName == '') ? ' border-2 border-mainRed' : ''}`} placeholder="e.g. Web Design" type="text" value={boardName} onChange={handleBoardNameChange}/>
                    {
                        (submissionErrors && boardName == '') ?
                        <div className="absolute top-0 right-0 h-[100%] flex items-center mr-4 text-center">
                            <p className=" text-mainRed text-sm">Can't Be Empty</p>
                        </div>
                        : ''
                    }
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="dark:text-white font-bold text-grayText">Columns</h3>
                <div className="pb-6">
                    {columns.map( (column, i) => <ColumnInput key={column[1]} index={i} value={column[0]} setColumnValue={setColumnValue} deleteColumn={deleteColumn} submissionErrors={submissionErrors}/>)}
                </div>
                <div className="flex flex-col gap-4">
                    <button  onClick={addNewColumn} className="dark:bg-white bg-mainPurple bg-opacity-10 p-2 text-mainPurple font-bold rounded-full">+ Add New Column</button>
                    <button type="submit" className="bg-mainPurple p-2 rounded-full text-white font-semibold">Create New Board</button>
                </div>
            </div>
        </form>
    )
}