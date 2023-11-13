import { useState } from "react"
import AddNewTaskButton from "./AddNewTaskButton"
import HamburgerButton from "../Utilities/HamburgerButton"
import AddTask from "../PopUps/Task/Add/AddTask"
import PopUpContainer from "../PopUps/PopUpContainer"
import { ACTIONS  } from "../../state_management/actions"

import GeneralDeletePopUp from "../PopUps/GeneralDeletePopUp"

export default function BoardBar({board, numberOfBoards}){

    let [showAddPopUp, setShowAddPopUp ] = useState(false)

    let [showEditPopUp, setShowEditPopUp ] = useState(false)

    let [showDeletePopUp, setShowDeletePopUp] = useState(false)

    const toggleShowAddPopUp = () => {
        setShowAddPopUp(!showAddPopUp)
    }

    const toggleShowEditPopUp = () => {
        setShowEditPopUp(!showEditPopUp)
    }

    const toggleShowDeletePopUp = () => {
        setShowDeletePopUp(!showDeletePopUp)
    }

    return (
        <>
            <div className=" flex flex-row items-center justify-between w-10/12 right-0 bg-white shadow  py-7 pl-2 pr-5 h-[96px] dark:bg-darkGrey dark:text-white absolute">
                <p className="font-custom text-black font-bold text-3xl dark:text-white">{board == null ? numberOfBoards > 0 ? 'You have no boards selected.' : 'You have no boards' : board.name}</p>
                <div className="flex flex-row items-center gap-5">
                     <AddNewTaskButton board={board} handleShowPopUp={toggleShowAddPopUp}/>
                    <HamburgerButton type={'Board'} handleShowDeletePopUp={toggleShowDeletePopUp} handleShowEditPopUp={toggleShowEditPopUp}/>
                </div>
            </div>
            {
                showAddPopUp ? 
                <PopUpContainer autoDestructionFunction={toggleShowAddPopUp}>
                    <AddTask board={board.name} columns={board.columns}/>        
                </PopUpContainer>
                : ''
            }
            {
                showEditPopUp ?
                <PopUpContainer autoDestructionFunction={toggleShowEditPopUp}>

                </PopUpContainer>
                : ''
            }
            {
                showDeletePopUp ?
                <PopUpContainer autoDestructionFunction={toggleShowDeletePopUp}>
                    <GeneralDeletePopUp type={'board'} name={board.name} action={{type: ACTIONS.deleteBoard, payload: board.name}}/>
                </PopUpContainer>
                : ''
            }
        </>
    )

}