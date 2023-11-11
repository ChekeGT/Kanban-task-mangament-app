import { useState } from "react"
import ColumnInput from "./ColumnInput"

export default function AddNewBoard() {

    // We use an array of empy strings to represent the columns.
    // Each element of this array will reactively change to have the name of the column.

    const [columns, setColumns] = useState([['', 0]])

    // Key column value is used to presereve the uniqueness of each key, this is just for requirement on react.
    const [keyColumnValue, setKeyColumnValue] = useState(1)


    const [boardName, setBoardName ] = useState('')

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
    
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return(
        <form onClick={preventPropagation} onSubmit={handleSubmit} className="dark:bg-darkGrey w-[480px] bg-white px-6 py-8 flex flex-col gap-5">
            <h1 className="dark:text-white font-bold text-xl ">Add New Board</h1>
            <div className="flex flex-col gap-2">
                <h3 className="dark:text-white font-bold text-grayText">Name</h3>
                <input name="board-name" className="dark:bg-darkGrey w-full p-2 rounded-md  border border-gray" placeholder="e.g. Web Design" type="text" value={boardName} onChange={handleBoardNameChange}/>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="dark:text-white font-bold text-grayText">Columns</h3>
                <div className="pb-6">
                    {columns.map( (column, i) => <ColumnInput key={column[1]} index={i} value={column[0]} setColumnValue={setColumnValue} deleteColumn={deleteColumn}/>)}
                </div>
                <div className="flex flex-col gap-4">
                    <button  onClick={addNewColumn} className="dark:bg-white bg-mainPurple bg-opacity-10 p-2 text-mainPurple font-bold rounded-full">+ Add New Column</button>
                    <button type="submit" className="bg-mainPurple p-2 rounded-full text-white font-semibold">Create New Board</button>
                </div>
            </div>
        </form>
    )
}