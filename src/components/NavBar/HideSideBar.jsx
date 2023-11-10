import { useState } from "react"

export default function HideSideBar(){
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