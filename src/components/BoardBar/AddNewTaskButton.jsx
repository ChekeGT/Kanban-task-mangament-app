import { useState } from "react"

// Components

export default function AddNewTaskButton({handleShowPopUp}){
    return (
        <button onClick={handleShowPopUp} className=" bg-mainPurple text-white p-2 rounded-2xl h-[48px] w-[164px] text-center">
            + Add New Task
        </button>
        )
}