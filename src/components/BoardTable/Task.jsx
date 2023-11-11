import { useState } from "react"
import PopUpContainer from "../PopUps/PopUpContainer"
import ViewTask from '../PopUps/ViewTask'

export default function Task({titleTask, completedSubtasks}) {
    
    
    const [showPopUp, setShowPopUp ] = useState(false) 

    const handleShowPopUp = () => {
        setShowPopUp(true)
    }
    
    const deletePopUp = () => {
        setShowPopUp(false)
    }

    if(showPopUp) {
        return(
            <>
            <PopUpContainer autoDestructionFunction={deletePopUp}>
                <ViewTask/>
            </PopUpContainer>
            <div onClick={handleShowPopUp} className="dark:bg-darkGrey hover:text-mainPurple cursor-pointer max-w-[280px] shadow-md flex flex-col gap-1 p-3 pr-12 rounded-lg items-start">
                <h2 className="dark:hover:text-mainPurple dark:text-white font-semibold">Build UI for onboarding flow</h2>
                <p className="text-sm text-grayText">0 of 3 subtasks</p>
            </div>
            </>
            
            
        )
    } else {
        return(
            <div onClick={handleShowPopUp} className="dark:bg-darkGrey hover:text-mainPurple cursor-pointer max-w-[280px] shadow-md flex flex-col gap-1 p-3 pr-12 rounded-lg items-start">
                <h2 className="dark:hover:text-mainPurple dark:text-white font-semibold">Build UI for onboarding flow</h2>
                <p className="text-sm text-grayText">0 of 3 subtasks</p>
            </div>
        )
    }

    
}