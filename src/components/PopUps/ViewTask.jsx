import { useEffect, useState } from "react";
import { ACTIONS } from "../../state_management/actions";

import { useDispatch } from "../../App";

function SubTask({ title, isCompleted, updateStatus }) {


    const [isChecked, setIsChecked] = useState(isCompleted);


    return(
        <div className={`${ isCompleted ? 'dark:bg-veryDarkGrey' : ''} flex p-2 pl-4 gap-4 hover:bg-mainPurple hover:bg-opacity-30 `}>
            <input  checked={isCompleted}
        onChange={() => updateStatus(!isCompleted)} id="subTasks" className="checked:line-through" type="checkbox" />
             <label
                htmlFor="subTasks" className={`dark:text-white cursor-pointer ${isChecked ?'line-through opacity-50' : ''}`}
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


    function handleSelectedColumnChange(e){
        const newColumn = e.target.value
        setCurrentColumn(newColumn)
        moveTaskToAnotherColumn(newColumn)
    }

    // This function is to keep the click only on the local scope of the component
    //  Why? because this is important in order for the user to close the tab.
    // Since this will be rendered on the popupcontainer. if the user clicks on the
    // popup container it will close, but not if he clicks on the popup itself?
    // why? because we have stop propagation :3

    function preventPropagation(e){
        e.stopPropagation()
    }

    return(
        <div  onClick={preventPropagation} className="dark:bg-darkGrey flex flex-col gap-5 bg-white w-[480px] p-6">
            <h1 className="dark:text-white font-bold text-xl">{task.title}</h1>
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
                <select onChange={handleSelectedColumnChange} value={currentColumn} className="dark:bg-darkGrey dark:text-white w-full p-2 rounded-md border border-mainPurple" name="" id="">
                    {
                        board.columns.map((column) => <option key={column.name} value={column.name}>{column.name}</option>)
                    } 
                </select>
            </div>
            
        </div>
            )
}