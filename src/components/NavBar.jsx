import { useState } from "react"
import { useDispatch } from "../App.jsx"

function BoardComponent({name}){
    return (
        <div className="boardButton">
            <img src="./src/assets/icon-board.svg" alt="" />
            <p className="boardName">{name}</p>
        </div>
    )
}

function CreateNewBoardButton(){
    let dispatch = useDispatch()

    const handlePopup = () => {
        
    }

    return (
        <button className="addNewBoard" onClick={handlePopup}>
            <img src="./src/assets/icon-board.svg" alt="" />
            <p className="addNewBoardParagraph">+  Create New Board</p>     
        </button>
    )
}

function ThemeToggler({theme}){
    let dispatch = useDispatch()

    const handleToggle = () => {
        
    }

    return (
        <div>
            <img src="./src/assets/icon-light-theme.svg"/>
            <label className="switch">
                <input type="checkbox" onChange={handleToggle} checked={theme === 'light' ? false : true}/>
                <span className="slider round"></span>
            </label>
            <img src="./src/assets/icon-dark-theme.svg"/>
        </div>
    )

}

function HideSideBar(){
    let [hidden, SetHiddenStatus] = useState(false)

    function handleHideSideBar(){

    }

    return (
        <button onClick={handleHideSideBar}>
            <img src="./src/assets/icon-hide-sidebar.svg"/>
            <p>Hide Sidebar</p>
        </button>
    )
}

export default function NavBar({boards, theme}){
    return(
        <header>
            <nav>
                <div>
                    <img src="./src/assets/logo-dark.svg"></img>
                    <div className="boards-container">
                        <p className="title">All boards ({boards.length})</p>
                        {boards.map((board) => {
                            return (
                                <BoardComponent key={board.name} name={board.name}/>
                            )
                        })}
                        <CreateNewBoardButton/>
                    </div>
                </div>
                <div>
                    <ThemeToggler theme={theme}/>
                    <HideSideBar/>
                </div>
            </nav>
        </header>
    )
}