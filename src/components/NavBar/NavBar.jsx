// Components
import ThemeToggler from './ThemeToggler.jsx'
import HideSideBar from "./HideSideBar.jsx"
import BoardComponent from "./BoardComponent.jsx"
import CreateNewBoardButton from "./CreateNewBoardButton.jsx"
import { THEMES } from '../../state_management/themes.js'



export default function NavBar({boards, theme, currentBoard}){
    return(
        <header className='w-2/12'>
            <nav className=" flex flex-col min-h-screen justify-between bg-white shadow w-full py-2 font-custom dark:bg-darkGrey pr-3" >
                <div className="flex flex-col gap-4 w-full mt-2">
                    <img className="w-[152.53px] h-[25.22px] mb-7 ml-4" src={`./src/assets/logo-${theme == THEMES.light ? 'dark' : 'light'}.svg`}></img>
                    <div className="flex flex-col gap-3">
                        <p className=" text-xl text-grayText font-extrabold ml-4">All boards ({boards.length})</p>
                        {boards.map((board) => {
                            return (
                                <BoardComponent key={board.name} board={board} currentBoard={currentBoard == null ? '' : board.name == currentBoard.name ? true : false}/>
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