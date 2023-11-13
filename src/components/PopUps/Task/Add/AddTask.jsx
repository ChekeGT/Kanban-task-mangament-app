import { useState } from "react";
import { ACTIONS } from "../../../../state_management/actions";
import { useDispatch } from "../../../../App";
import { useAutoDestruction } from "../../PopUpContainer";


// Components
import TitleInput from "./TitleInput";
import SubTaskInput from "./SubTaskInput";
import SelectColumn from "./SelectColumn";

export default function AddTask({ board, columns }) {

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
    const [descriptionErrors, setDescriptionErros ] = useState('')
    
    // Name, key, errors?
    // Key is used to properly render this.
    const [subTasks, setSubtasks ] = useState([['', 0, true], ['', 1, true]])
    const [subTaskKey, setSubTaskKey ] = useState(1)

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
    
    const addNewSubTask = () => {
        const subTasksCopy = [...subTasks]
        subTasksCopy.push(['', subTaskKey, true])
        setSubTaskKey(subTaskKey + 1)
        setSubtasks(subTasksCopy)
    }

    const [selectedColumn, setSelectedColumn ] = useState('')
    const [selectedColumnErrors, setSelectedColumnErrors ] = useState(true)
   

    // Form stuff.
    const formHasErrors = () => {
        let errors = (titleErrors || descriptionErrors || selectedColumnErrors) ? true : false
        
        subTasks.forEach((subTask) => {
            let err = subTask[2]
            if (err){
                errors = true
            }
        })
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
    
    
    const hanldeSubmit = (e) => {
        e.preventDefault()
        if (!formHasErrors()){
            submitFormToStore()    
            autoDestroy()
        }
    }
    
    return(
        <form onClick={preventPropagation} onSubmit={hanldeSubmit} className="dark:bg-darkGrey w-[480px] bg-white px-6 py-8 flex flex-col gap-5">
            <h1 className="font-bold text-xl">Add New Task</h1>

            <TitleInput title={title} setTitle={setTitle} column={selectedColumn} setFormErrors={setTitleErrors}/>
            <div>
                 <h3 className="dark:text-white font-bold text-grayText">Description</h3>
                <textarea className="dark:bg-darkGrey resize-none w-full h-[100px] p-2 rounded-md border border-gray" placeholder="e.g. It’s always good to take a break. This 15 minute break will 
                recharge the batteries a little." type="textarea" />
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="dark:text-white font-bold text-grayText">Subtasks</h3>
                {
                    subTasks.map((subTask, index) => {
                        const subTasksNames = subTasks.map((subTask) => subTask[0])
                        return (
                            <SubTaskInput key={subTask[1]} subTasks={subTasksNames} value={subTask[0]} setValue={setSubTaskByIndex(index)} autoDestructionFunction={getSubTaskAutodestructionFunctionByIndex(index)}/>
                        )
                    })
                }
                <button onClick={addNewSubTask} className="dark:bg-white bg-mainPurple bg-opacity-10 p-2 text-mainPurple font-bold rounded-full">+ Add New Subtask</button>
            </div>
            <SelectColumn columns={columns} value={selectedColumn} setValue={setSelectedColumn} setFormErrors={setSelectedColumnErrors}/>
            <button className="bg-mainPurple p-2 rounded-full text-white font-semibold">Create Task</button>
        </form>
        )
}