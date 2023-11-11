import AddNewTaskButton from "./AddNewTaskButton"
import HamburgerButton from "./HamburgerButton"

export default function BoardBar({board}){
    return (
        <div className=" flex flex-row items-center justify-between w-full bg-white shadow  py-7 pl-2 pr-5 h-[96px] dark:bg-darkGrey dark:text-white">
            <p className="font-custom text-black font-bold text-3xl dark:text-white">{board == null ? 'You have no boards' : board.name}</p>
            <div className="flex flex-row items-center gap-5">
                <AddNewTaskButton board={board}/>
                <HamburgerButton/>
            </div>
        </div>
    )
}