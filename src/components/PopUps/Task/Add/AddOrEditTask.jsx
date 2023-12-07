import { useEffect, useState } from "react";
import { ACTIONS } from "../../../../state_management/actions";
import { useDispatch } from "../../../../App";
import { useAutoDestruction } from "../../PopUpContainer";


// Components
import TitleInput from "./TitleInput";
import SubTaskInput from "./SubTaskInput";
import SelectColumn from "./SelectColumn";
import DescriptionInput from "./DescriptionInput";
import { getColumnByColumnName } from "./utilities";

export default function AddOrEditTask({ board, columns, task = null, column = null, type }) {


    const dispatch = useDispatch()
    const autoDestroy = useAutoDestruction()


    // This function is to keep the click only on the local scope of the component
    //  Why? because this is important in order for the user to close the tab.
    // Since this will be rendered on the popupcontainer. if the user clicks on the
    // popup container it will close, but not if he clicks on the popup itself?
    // why? because we have stop propagation :3
    
    function preventPropagation(e){
        e.stopPropagation()
    }

    // State of the component
    // Each pair represents an input value and if the value has any error asocciated with it.
    // If it has an error we can not submit the form. The value is set to true by default
    // Because otherwise the user could submit the form without any validation.

    const [title, setTitle ] = useState('')
    const [titleErrors, setTitleErrors ] = useState(true)

    const [description, setDescription ] = useState('')
    const [descriptionErrors, setDescriptionErrors ] = useState('')
    
    // Name, key, errors?
    // Key is used to properly render this.
    const [subTasks, setSubtasks ] = useState([['', 0]])
    const [subTaskKey, setSubTaskKey ] = useState(1)
    const [subTasksErrors, setSubTasksErrors] = useState(true)

    function checkForErrorsOnASubTaskItem(value, subTasks, originalValue){
        let error = ''
        if (value == ''){
            error = "Can't be empty."
        }
        // Atm this subtasks title list doesnt include this subtask, so if we find another one with the same 
        // name, we take for granted the error.
        subTasks.forEach((subtask) => {
            if (subtask == value && subtask != '' && value != originalValue){
                error = 'This Subtask name is already in use.'
            }
        })
        return error
    }

    function checkForErrorsOnSubtaskArray(subTasks) {
        let err = false
        for (let i = 0; i < subTasks.length; i++){
            const subTask = subTasks[i]
            const subTasksNames = subTasks.filter((st) => st != subTask).map((subtask) => subtask[0])
            const error = checkForErrorsOnASubTaskItem(subTask[0], subTasksNames, getOriginalSubTaskTitle(subTask))
            if (error){
                err = true
            }
        }
        setSubTasksErrors(err)
    }

    useEffect(() => {
        checkForErrorsOnSubtaskArray(subTasks)
    }, [subTasks])


    const setSubTaskByIndex = (i) => {
        const setSubTaskFunction = (name, errorState) => {
            let subTasksCopy = [...subTasks]
            subTasksCopy[i][0] = name
            subTasksCopy[i][2] = errorState
            setSubtasks(subTasksCopy)
        }
        return setSubTaskFunction
    }

    const getSubTaskAutodestructionFunctionByIndex = (i) => {
        return ( () => {
            const subTasksCopy = [...subTasks]
            subTasksCopy.splice(i, 1)
            setSubtasks(subTasksCopy)
        })
    }
    
    const addNewSubTask = (e) => {
        e.preventDefault()
        const subTasksCopy = [...subTasks]
        subTasksCopy.push(['', subTaskKey])
        setSubTaskKey(subTaskKey + 1)
        setSubtasks(subTasksCopy)
    }

    const [selectedColumn, setSelectedColumn ] = useState('')
    const [selectedColumnErrors, setSelectedColumnErrors ] = useState(true)

    const [submissionFailed, setSubmissionFailed ] = useState(false)

    function getOriginalSubTaskTitle(subtask){
        if (type == 'edit'){
            const key = subtask[1]
            if (key < task.subtasks.length){
                return task.subtasks[key].title
            }
        }
        return null
    }

    useEffect(() => {
        if (task && column && type == 'edit'){
            setSelectedColumn(column.name)
            setSubtasks(task.subtasks.map((subtask, i) => [subtask.title, i, false]))
            setDescription(task.description)
            setTitle(task.title)
            setSubTaskKey(task.subtasks.length)
            setTitleErrors(false)
            setDescriptionErrors(false)
            setSelectedColumnErrors(false)
            setSubTasksErrors(false)
        }
    }, [task, column, type])
    
   

    // Form stuff.
    const formHasErrors = () => {
        let errors = (titleErrors || descriptionErrors || selectedColumnErrors || subTasksErrors) ? true : false
        
        return errors
    }

    const submitFormToStore = () => {
       const action = {
            type: ACTIONS.addTask,
            payload: {
                board: board,
                column: selectedColumn,
                name: title,
                description: description,
                subTasks: subTasks.map((subtask) => subtask[0])
            }
        }
        dispatch(action)
    }
    
    function editTaskInStore(){

    }
    
    
    const hanldeSubmit = (e) => {
        e.preventDefault()
        if (formHasErrors()){
            setSubmissionFailed(true)
        }else{
            if (type == 'edit'){
                editTaskInStore()
            }else{
                submitFormToStore()
            }
            autoDestroy()
        }
    }
    
    return(
        <form onClick={preventPropagation} className="dark:bg-darkGrey w-[480px] bg-white px-6 py-8 flex flex-col gap-5">
            <h1 className="dark:text-white font-bold text-xl">{type == 'edit' ? 'Edit' : 'Add New'} Task</h1>
            <TitleInput value={title} setValue={setTitle} column={getColumnByColumnName(selectedColumn, columns)} setFormErrors={setTitleErrors} submissionFailed={submissionFailed} originalTaskName={type == 'edit' ? task.title : null}/>
            <DescriptionInput value={description} setValue={setDescription} setFormErrors={setDescriptionErrors} submissionFailed={submissionFailed}/>
            <div className="flex flex-col gap-2">
                <h3 className="dark:text-white font-bold text-grayText">Subtasks</h3>
                {
                    subTasks.map((subTask, index) => {
                        const subTasksNames = subTasks.filter((st) => st != subTask).map((subTask) => subTask[0])
                        return (
                            <SubTaskInput key={subTask[1]} subTasks={subTasksNames} value={subTask[0]} setValue={setSubTaskByIndex(index)} autoDestructionFunction={getSubTaskAutodestructionFunctionByIndex(index)} submissionFailed={submissionFailed} originalValue={getOriginalSubTaskTitle(subTask)} checkForErrors={checkForErrorsOnASubTaskItem}/>
                        )
                    })
                }
                <button onClick={addNewSubTask} className="dark:bg-white bg-mainPurple bg-opacity-10 p-2 text-mainPurple font-bold rounded-full">+ Add New Subtask</button>
            </div>
            <SelectColumn columns={columns} value={selectedColumn} setValue={setSelectedColumn} setFormErrors={setSelectedColumnErrors} submissionFailed={submissionFailed} currentTitle={title} originalColumn={type == 'edit' ? column : null} type={type == 'edit' ? 'edit' : 'add'}/>
            <button onClick={hanldeSubmit} className="bg-mainPurple p-2 rounded-full text-white font-semibold">Create Task</button>
        </form>
        )
}