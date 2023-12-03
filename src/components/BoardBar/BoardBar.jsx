import { useEffect, useState } from "react"
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

    const [activeHamburgerButton, setActiveHamburgerButton ] = useState(true)
    const [showOptions, setShowOptions ] = useState(false)

    function toggleShowOptions(){
        setShowOptions(!showOptions)
    }


    const [activeAddNewTaskButton , setActiveAddNewTaskButton ] = useState(true)

    useEffect(() => {
        setActiveHamburgerButton(board == null ? false : true)
        setActiveAddNewTaskButton(board == null ? false : board.columns.length > 0 ? true : false)
    }, [board])
    return (
        <>
            <div className=" flex flex-row items-center justify-between w-10/12 right-0 bg-white shadow  py-7 pl-2 pr-5 h-[96px] dark:bg-darkGrey dark:text-white absolute">
                <p className="font-custom text-black font-bold text-3xl dark:text-white">{board == null ? numberOfBoards > 0 ? 'You have no boards selected.' : 'You have no boards' : board.name}</p>
                <div className="flex flex-row items-center gap-5">
                     <AddNewTaskButton board={board} showPopUp={toggleShowAddPopUp} active={activeAddNewTaskButton}/>
                     <HamburgerButton active={activeHamburgerButton} showOptions={showOptions} toggleShowOptions={toggleShowOptions} type={'Board'} handleShowDeletePopUp={toggleShowDeletePopUp} handleShowEditPopUp={toggleShowEditPopUp}/>
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
            {
                showOptions ?
                <div  onClick={toggleShowOptions} className="bg-transparent absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-[100%] h-[100%] flex justify-center items-center z-30">
                </div> : <></>
            }
        </>
    )

}