import { useState } from "react"
import PopUpContainer from "../PopUps/PopUpContainer"
import ViewTask from '../PopUps/Task/Add/ViewTask'

export default function Task({task, column, board}) {
    
    const {title, subtasks } = task

        
    const completedSubtasks = subtasks.filter((subTask) => subTask.isCompleted).length
    const numberOfSubtasks = subtasks.length

    const [showPopUp, setShowPopUp ] = useState(false) 

    const handleShowPopUp = () => {
        setShowPopUp(true)
    }
    
    const deletePopUp = () => {
        setShowPopUp(false)
    }

    return(
        <>
            {
                showPopUp ? 
                <PopUpContainer autoDestructionFunction={deletePopUp}>
                    <ViewTask task={task} board={board} column={column}/>
                </PopUpContainer> : <></>
            }
            <div onClick={handleShowPopUp} className="dark:bg-darkGrey hover:text-mainPurple cursor-pointer max-w-[280px] shadow-md flex flex-col gap-1 p-3 pr-12 rounded-lg items-start">
                <h2 className="dark:hover:text-mainPurple dark:text-white font-semibold">{title}</h2>
                 <p className="text-sm text-grayText">{completedSubtasks} of {numberOfSubtasks} subtasks</p>
            </div>
        </>
            
            
    )

    
}