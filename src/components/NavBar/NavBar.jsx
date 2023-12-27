// Components
import ThemeToggler from './ThemeToggler.jsx'
import HideNavBar from "./HideNavBar.jsx"
import BoardComponent from "./BoardComponent.jsx"
import CreateNewBoardButton from "./CreateNewBoardButton.jsx"
import { THEMES } from '../../state_management/themes.js'
import { useState } from 'react'

import AddOrEditBoard from "../PopUps/Board/AddOrEdit/AddOrEditBoard"
import PopUpContainer from "../PopUps/PopUpContainer"
import { TYPES } from "../PopUps/Board/AddOrEdit/types"

// Logos
import darkLogo from "../../assets/logo-dark.svg"
import lightLogo from "../../assets/logo-light.svg"


function MobileViewAddOrEditBoard({toggleShowPopUp}){
    return (
        <div onClick={toggleShowPopUp} className='absolute w-full h-[96px] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]  flex'>
            <div className='bg-[#00000055] w-full h-full min-h-[100vh] min-w-[100vw]'>
                <div className='h-[100vh] max-w-[90vw] left-0 right-0 mx-auto my-auto flex justify-center items-center '>
                    <AddOrEditBoard type={TYPES.add} mobileDeletePopUpFunction={toggleShowPopUp}/>
                </div>
            </div>
        </div> 
    )
}

export default function NavBar({boards, theme, currentBoard, showMobileView=false}){
    const [showNavBar, setShowNavBar ] = useState(true)

    const [showCreateBoardPopUp, setShowCreateBoardPopup ] = useState(false)

    function toggleShowCreateBoardPopUp(){
        setShowCreateBoardPopup(!showCreateBoardPopUp)
    }

    const toggleShowNavBar = () => {
        setShowNavBar(!showNavBar)
    }

    function preventPropagation(e){
        e.stopPropagation()
    }

    if (showNavBar){
        return(
            <header className=' w-0 h-0 md:w-[34%]'>
                <nav>
                    {showMobileView && !showCreateBoardPopUp ? 
                    <div className='absolute w-[100vw] flex justify-center items-center top-[112px] md:hidden shadow-xl translate-x-[-50%] left-[50%]' onClick={preventPropagation}>
                        <div className='w-[322px] h-[264px] overflow-y-auto whitespace-nowrap bg-white dark:bg-darkGrey flex flex-col gap-3 items-start'>
                            <p className=" mt-4 text-lg text-grayText font-extrabold ml-4">All boards ({boards.length})</p>                            
                            {boards.map((board) => <BoardComponent key={board.name} board={board} currentBoard={currentBoard == null ? '' : board.name == currentBoard.name}></BoardComponent>)}
                            <CreateNewBoardButton toggleShowPopUp={toggleShowCreateBoardPopUp}/>
                            <div className=' w-9/12 mx-auto mb-2'>
                                <ThemeToggler theme={theme}/>
                            </div>
                        </div>
                    </div> : <></>
                    }
                    <div className=' hidden md:flex flex-col md:min-h-screen justify-between bg-white shadow md:w-full py-2 font-custom dark:bg-darkGrey pr-3'>
                        <div className="flex flex-col gap-4 w-full mt-2">
                            <img className="w-[152.53px] h-[25.22px] mb-7 ml-4" src={theme == THEMES.light ? darkLogo : lightLogo}></img>
                            <div className="flex flex-col gap-3 overflow-y-auto whitespace-nowrap max-h-[50vh]">
                                <p className=" text-xl text-grayText font-extrabold ml-4">All boards ({boards.length})</p>
                                {boards.map((board) => {
                                    return (
                                        <BoardComponent key={board.name} board={board} currentBoard={currentBoard == null ? '' : board.name == currentBoard.name}/>
                                    )
                                })}
                                <CreateNewBoardButton toggleShowPopUp={toggleShowCreateBoardPopUp}/>
                            </div>
                        </div>
                        <div className="grid grid-rows-2 w-[90%] gap-8 mx-3">
                            <ThemeToggler theme={theme}/>
                            <HideNavBar showNavBar={showNavBar} handleToggleNavBar={toggleShowNavBar}/>
                        </div>
                    </div>
                </nav>
                <div className='md:hidden'>
                    {showCreateBoardPopUp ? 
                    <MobileViewAddOrEditBoard toggleShowPopUp={toggleShowCreateBoardPopUp}/>: <></> }
                </div>
                <div className='hidden md:block'>
                    {
                        showCreateBoardPopUp ? 
                        <PopUpContainer autoDestructionFunction={toggleShowCreateBoardPopUp}>
                            <AddOrEditBoard type={TYPES.add}/>
                        </PopUpContainer> : <></>
                    }
                </div>
            </header>
        )
    }else{
        return (
            <>
            <header className='md:w-3/12 xl:w-2/12 h-[96px] bg-white dark:bg-darkGrey shadow absolute'>
                <nav className='w-full h-full'>
                    <div className='w-full h-full flex justify-center items-center'>
                        <img className="w-[152.53px] h-[25.22px]" src={theme == THEMES.light ? darkLogo : lightLogo}></img>
                    </div>
                </nav>
            </header>
            <HideNavBar handleToggleNavBar={toggleShowNavBar} showNavBar={showNavBar}/>
        </>
        )
    }
}