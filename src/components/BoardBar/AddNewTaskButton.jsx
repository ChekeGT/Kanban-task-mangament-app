import { useState } from "react"

// Components
import PopUpContainer from "../PopUps/PopUpContainer"
import AddTask from '../PopUps/AddTask'

export default function AddNewTaskButton({board}){

    let [showPopUp, setShowPopUp ] = useState(false)

    const handleShowPopUp = () => {
        setShowPopUp(true)
    }

    const deletePopUp = () => {
        setShowPopUp(false)
    }

    if (showPopUp){
        return (
            <>
                <PopUpContainer autoDestructionFunction={deletePopUp}>
                    <AddTask/>
                </PopUpContainer>
                <button className=" bg-mainPurple text-white p-2 rounded-2xl h-[48px] w-[164px] text-center">
                    + Add New Task
                </button>
            </>
        )
    }else{
        return (
            <button onClick={handleShowPopUp} className=" bg-mainPurple text-white p-2 rounded-2xl h-[48px] w-[164px] text-center">
                + Add New Task
            </button>
        )
    }
}