import { useEffect, useState } from "react"
import AddNewTaskButton from "./AddNewTaskButton"
import HamburgerButton from "../Utilities/HamburgerButton"
import AddTask from "../PopUps/Task/Add/AddOrEditTask"
import PopUpContainer from "../PopUps/PopUpContainer"
import { ACTIONS  } from "../../state_management/actions"
import AddOrEditBoard from '../PopUps/Board/AddOrEdit/AddOrEditBoard'
import { TYPES } from "../PopUps/Board/AddOrEdit/types"

import GeneralDeletePopUp from "../PopUps/GeneralDeletePopUp"
import NavBar from "../NavBar/NavBar"

export default function BoardBar({boards, theme, board, numberOfBoards}){

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
    const [showNavBar, setShowNavBar ] = useState(false) 

    function toggleShowOptions(){
        setShowOptions(!showOptions)
    }
    
    function toggleShowNavBar(){
        setShowNavBar(!showNavBar)
    }


    const [activeAddNewTaskButton , setActiveAddNewTaskButton ] = useState(true)

    useEffect(() => {
        setActiveHamburgerButton(board == null ? false : true)
        setActiveAddNewTaskButton(board == null ? false : board.columns.length > 0 ? true : false)
    }, [board])
    return (
        <>
            <div className=" w-full flex flex-row items-center justify-between md:w-9/12 right-0 bg-white shadow  py-7 pl-2 pr-5 h-[96px] dark:bg-darkGrey dark:text-white absolute">
                <div className="w-9/12 flex gap-4 items-center mr-3">
                    <svg className=" scale-125 min-w-[30px] md:hidden" width="24" height="25" xmlns="http://www.w3.org/2000/svg"><g fill="#635FC7" fill-rule="evenodd"><rect width="6" height="25" rx="2"/><rect opacity=".75" x="9" width="6" height="25" rx="2"/><rect opacity=".5" x="18" width="6" height="25" rx="2"/></g></svg>
                    <p className="font-custom text-black font-bold text-xl md:text-3xl dark:text-white">{board == null ? numberOfBoards > 0 ? 'You have no boards selected.' : 'You have no boards' : board.name}</p>
                    <button onClick={toggleShowNavBar}>
                        {showNavBar ? <svg className=" scale-150 md:hidden" width="25" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" stroke-width="2" fill="none" d="m1 1 4 4 4-4"/></svg>
                        : <svg className="scale-150 md:hidden" width="25" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" stroke-width="2" fill="none" d="M9 6 5 2 1 6"/></svg>}
                    </button>
                    <div className="md:hidden">
                        <NavBar boards={boards} theme={theme} currentBoard={board} showMobileView={showNavBar}/>
                    </div>
                </div>
                
                <div className="w-3/12 md:w-auto flex flex-row items-center gap-5">
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
                    <AddOrEditBoard type={TYPES.edit} board={board}/>
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