import { useState } from "react";
import { ACTIONS } from "../../../../state_management/actions";
import { TYPES } from "../../../Utilities/types";

import { useDispatch } from "../../../../App";
import HamburgerButton from "../../../Utilities/HamburgerButton";
import PopUpContainer from "../../PopUpContainer";
import GeneralDeletePopUp from "../../GeneralDeletePopUp";
import EditTask from "./AddOrEditTask";

function SubTask({ title, isCompleted, updateStatus }) {

    return(
        <div className={` dark:bg-veryDarkGrey flex p-2 pl-4 gap-4 hover:bg-mainPurple dark:hover:bg-opacity-50 dark:hover:bg-mainPurple hover:bg-opacity-30 rounded-md bg-lightGrey font-semibold items-center text-center`}>
            <input  checked={isCompleted} 
        onChange={() => updateStatus(!isCompleted)} id="subTasks" className={`checked:line-through accent-mainPurple dark:bg-green ${!isCompleted ? 'dark:invert dark:brightness-75' : ''}`} type="checkbox" />
             <label
                htmlFor="subTasks" className={`dark:text-white cursor-pointer ${isCompleted ?'line-through opacity-50' : ''}`}
>
                {title}
            </label>
        </div>
    )
}
export default function ViewTask({task, column, board}) {

    const dispatch = useDispatch()

    const completedSubtasks = task.subtasks.filter((subTask) => subTask.isCompleted).length
    const numberOfSubtasks = task.subtasks.length
    const [currentColumn, setCurrentColumn ] = useState(column.name)
    const [currentColumnError, setCurrentColumnError] = useState('')

    const [showOptions, setShowOptions ] = useState(false)

    const [showDeletePopUp, setShowDeletePopUp ] = useState(false)
    const [showEditPopUp, setShowEditPopUp ] = useState(false)

    function toggleShowOptions(){
        setShowOptions(!showOptions)
    }

    function toggleShowDeletePopUp(){
        setShowDeletePopUp(!showDeletePopUp)
    }
    
    function toggleShowEditPopup(){
        setShowEditPopUp(!showEditPopUp)
    }

    
    const getUpdateSubtaskCheckedStatusFunction = (subtask) => {
        return function (checkedStatus){
            const action = {
                type: ACTIONS.updateSubtaskCheckedStatus,
                payload: {
                    board: board,
                    column: column,
                    task: task,
                    subtaskTitle: subtask.title,
                    checkedStatus: checkedStatus
                }
            }
            dispatch(action)
        }
    }

    function moveTaskToAnotherColumn(newColumn){
        const action = {
            type: ACTIONS.moveTaskToAnotherColumn,
            payload: {
                board: board,
                column: column,
                task: task,
                newColumnName: newColumn
            }
        }
        dispatch(action)
    }

    function doesColumnHasATaskNamedLikeThat(columnName, taskTitle){
        for(let i = 0; i < board.columns.length ; i++){
            const column = board.columns[i]
            if (column.name == columnName){
                for (let j = 0; j < column.tasks.length; j++){
                    const task = column.tasks[j]
                    if (task.title == taskTitle){
                        return true
                    }
                }
            }
        }
        return false
    } 
    function handleSelectedColumnChange(e){
        const newColumn = e.target.value
        if (!doesColumnHasATaskNamedLikeThat(newColumn, task.title)){
            moveTaskToAnotherColumn(newColumn)
        }else{
            if (newColumn == column.name){
                setCurrentColumnError('')
            }else{
                setCurrentColumnError('The column you have selected already has a task named like this. Please rename it or select another column.')
            }
        }
        setCurrentColumn(newColumn)
    }

    // This function is to keep the click only on the local scope of the component
    //  Why? because this is important in order for the user to close the tab.
    // Since this will be rendered on the popupcontainer. if the user clicks on the
    // popup container it will close, but not if he clicks on the popup itself?
    // why? because we have stop propagation :3

    function preventPropagation(e){
        e.stopPropagation()
    }

    if (showDeletePopUp){
        let action = {
            type: ACTIONS.deleteTask,
            payload: {
                board: board,
                column: column,
                task: task
            }
        }
        return (
            <PopUpContainer autoDestructionFunction={toggleShowDeletePopUp}>
                <GeneralDeletePopUp action={action} type={TYPES.task} name={task.title}/>
            </PopUpContainer>
        )
    }
    if (showEditPopUp){
        return (
            <PopUpContainer autoDestructionFunction={toggleShowEditPopup}>
                <EditTask board={board} columns={board.columns} task={task} column={column} type={'edit'}></EditTask>
            </PopUpContainer>
        )
    }
    return(
        <div  onClick={preventPropagation} className="dark:bg-darkGrey flex flex-col gap-5 bg-white w-[480px] p-6">
            <div className="flex flex-row gap-2 items-center justify-between">
                <h1 className="dark:text-white font-bold text-xl">{task.title}</h1>
                <HamburgerButton handleShowEditPopUp={toggleShowEditPopup} handleShowDeletePopUp={toggleShowDeletePopUp} showOptions={showOptions} toggleShowOptions={toggleShowOptions} active={true} type={'task'}></HamburgerButton>
            </div>
            <p className=" text-grayText">{task.description}</p>
            <div> 
                <h3 className="dark:text-white">Subtasks ({completedSubtasks} of {numberOfSubtasks})</h3>
                <div className="flex flex-col gap-2 pt-2">
                    {
                        task.subtasks.map((subtask, i) => <SubTask key={i} title={subtask.title} isCompleted={subtask.isCompleted} updateStatus={getUpdateSubtaskCheckedStatusFunction(subtask)}></SubTask>)
                    }
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="dark:text-white">Current Column</h3>
                {currentColumnError ? <p className="text-mainRed text-sm">{currentColumnError}</p> : <></>}
                <select onChange={handleSelectedColumnChange} value={currentColumn} className="dark:bg-darkGrey dark:text-white w-full p-2 rounded-md border active:border-mainPurple hover:border-mainPurple bg-white" name="" id="">
                    {
                        board.columns.map((column) => <option key={column.name} value={column.name} className="text-mediumGrey">{column.name}</option>)
                    } 
                </select>
            </div>
            
        </div>
            )
}