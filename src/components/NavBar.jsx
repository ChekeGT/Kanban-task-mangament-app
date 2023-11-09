import { useState } from "react"
import { useDispatch } from "../App.jsx"

function BoardComponent({name}){
    return (
        <div className="flex flex-row w-full items-center gap-2">
            <img className=" w-[16px] h-[16px]" src="./src/assets/icon-board.svg" alt="" />
            <p className=" text-grayText font-extrabold">{name}</p>
        </div>
    )
}

function CreateNewBoardButton(){
    let dispatch = useDispatch()

    const handlePopup = () => {
        
    }

    return (
        <button className="flex flex-row items-center gap-2" onClick={handlePopup}>
            <svg className=" fill-mainPurple" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"/></svg>
            <p className=" text-mainPurple font-bold">+  Create New Board</p>     
        </button>
    )
}

function ThemeToggler({theme}){
    let dispatch = useDispatch()

    let [checked, SetCheck ] = useState(theme == 'light' ? false : true)

    const handleToggle = () => {
        
    }

    return (
        <div className="flex flex-row w-full justify-evenly mx-auto bg-grayBackground items-center py-2">
            <img className=" w-[18px] h-[18px]" src="./src/assets/icon-light-theme.svg"/>
            <label className="switch">
                <input className="toggle"  type="checkbox" onChange={handleToggle} />
                <span className="slider rounded-full before:rounded-full"></span>
            </label>
            <img className=" w-[18px] h-[18px]" src="./src/assets/icon-dark-theme.svg"/>
        </div>
    )

}

function HideSideBar(){
    let [hidden, SetHiddenStatus] = useState(false)

    function handleHideSideBar(){

    }

    return (
        <button className="flex flex-row items-center gap-2 " onClick={handleHideSideBar}>
            <img className="w-[18px] h-[18px]" src="./src/assets/icon-hide-sidebar.svg"/>
            <p className=" text-grayText font-extrabold">Hide Sidebar</p>
        </button>
    )
}

export default function NavBar({boards, theme}){
    return(
        <header>
            <nav className=" flex flex-col min-h-screen justify-between bg-white shadow w-2/12 px-3 py-2 font-custom" >
                <div className="flex flex-col gap-4 w-full mt-2 ml-3">
                    <img className="w-[152.53px] h-[25.22px]" src="./src/assets/logo-dark.svg"></img>
                    <div className="flex flex-col gap-3">
                        <p className=" text-xl text-grayText font-extrabold">All boards ({boards.length})</p>
                        {boards.map((board) => {
                            return (
                                <BoardComponent key={board.name} name={board.name}/>
                            )
                        })}
                        <CreateNewBoardButton/>
                    </div>
                </div>
                <div className="grid grid-rows-2 w-[90%] gap-8 mx-3">
                    <ThemeToggler theme={theme}/>
                    <HideSideBar/>
                </div>
            </nav>
        </header>
    )
}