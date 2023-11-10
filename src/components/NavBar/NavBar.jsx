// Components
import ThemeToggler from './ThemeToggler.jsx'
import HideSideBar from "./HideSideBar.jsx"
import BoardComponent from "./BoardComponent.jsx"
import CreateNewBoardButton from "./CreateNewBoardButton.jsx"



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