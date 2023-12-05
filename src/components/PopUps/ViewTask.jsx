import { useState } from "react";

function SubTask({ title, isCompleted }) {


    const [isChecked, setIsChecked] = useState(isCompleted);


    return(
        <div className={`${ isChecked ? 'dark:bg-veryDarkGrey' : ''} flex p-2 pl-4 gap-4 hover:bg-mainPurple hover:bg-opacity-30 `}>
            <input  checked={isChecked}
        onChange={() => setIsChecked(!isChecked)} id="subTasks" className="checked:line-through" type="checkbox" />
             <label
                htmlFor="subTasks" className={`dark:text-white cursor-pointer ${isChecked ?'line-through opacity-50' : ''}`}
>
                {title}
            </label>
        </div>
    )
}
export default function ViewTask({task, column, board}) {

    const {title, description, subTasks} = task

    const completedSubtasks = subTasks == undefined ? 0 : subTasks.filter((subTask) => subTask.isCompleted).length
    const numberOfSubtasks = subTasks == undefined ? 0 : subTasks.length
    
    const [openOptions, setOpenOptions] = useState(false);


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
            <h1 className="dark:text-white font-bold text-xl">{title}</h1>
            <p className=" text-grayText">{description}</p>
            <div> 
                <h3 className="dark:text-white">Subtasks ({completedSubtasks} of {numberOfSubtasks})</h3>
                <div className="flex flex-col gap-2 pt-2">
                    {
                        subTasks == undefined ? <></> : subTasks.map((subtask) => <SubTask title={subtask.title} isCompleted={subtask.isCompleted}></SubTask>)
                    }
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="dark:text-white">Current Column</h3>
                <select className="dark:bg-darkGrey dark:text-white w-full p-2 rounded-md border border-mainPurple" name="" id="">
                    {
                        board.columns.map((column) => <option key={column.name} value="">{column.name}</option>)
                    } 
                </select>
            </div>
            
        </div>
            )
}