import { useState } from "react"
import AddNewTaskButton from "./AddNewTaskButton"
import HamburgerButton from "./HamburgerButton"
import AddTask from "../PopUps/AddTask"
import PopUpContainer from "../PopUps/PopUpContainer"

export default function BoardBar({board}){

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
                <div className=" flex flex-row items-center justify-between w-10/12 right-0 bg-white shadow  py-7 pl-2 pr-5 h-[96px] dark:bg-darkGrey dark:text-white absolute">
                    <p className="font-custom text-black font-bold text-3xl dark:text-white">{board == null ? 'You have no boards' : board.name}</p>
                    <div className="flex flex-row items-center gap-5">
                        <AddNewTaskButton board={board} handleShowPopUp={handleShowPopUp}/>
                        <HamburgerButton/>
                    </div>
                </div>
                <PopUpContainer autoDestructionFunction={deletePopUp}>
                    <AddTask/>        
                </PopUpContainer>
                
            </>
        )
    }else{
        return (
            <div className=" flex flex-row items-center justify-between w-10/12 right-0 bg-white shadow  py-7 pl-2 pr-5 h-[96px] dark:bg-darkGrey dark:text-white absolute">
                <p className="font-custom text-black font-bold text-3xl dark:text-white">{board == null ? 'You have no boards' : board.name}</p>
                <div className="flex flex-row items-center gap-5">
                    <AddNewTaskButton board={board} handleShowPopUp={handleShowPopUp}/>
                    <HamburgerButton/>
                </div>
            </div>
        )
    }
}