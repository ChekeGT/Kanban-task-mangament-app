import AddNewTaskButton from "./AddNewTaskButton"
import HamburgerButton from "./HamburgerButton"

export default function BoardBar({name}){
    return (
        <div className=" flex flex-row items-center justify-between w-full bg-white shadow  py-7 pl-2 pr-5 h-[96px]">
            <p className="font-custom text-black font-bold text-3xl">{name}</p>
            <div className="flex flex-row items-center gap-5">
                <AddNewTaskButton/>
                <HamburgerButton/>
            </div>
        </div>
    )
}