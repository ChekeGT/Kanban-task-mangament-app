import { useEffect, useState } from "react"

// Components

export default function AddNewTaskButton({showPopUp, active}){

    function hanldeClick(){
        if (active){
            showPopUp()
        }
    }
    return (
        <button onClick={hanldeClick} className={` bg-mainPurple text-white p-2 rounded-2xl h-[48px] w-[164px] text-center ${active ? 'opacity-100' : 'opacity-50 cursor-default' }`}>
            + Add New Task
        </button>
        )
}