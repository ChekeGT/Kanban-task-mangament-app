import { useState } from "react"

export default function HamburgerButton({handleShowDeletePopUp, handleShowEditPopUp, type, active, showOptions, toggleShowOptions}){

    function handleEditClick(){
        if (active){
            handleShowEditPopUp()
            toggleShowOptions()
        }
    }

    function handleDeleteClick(){
        if(active){
            handleShowDeletePopUp()
            toggleShowOptions()
        }
    }

    return (
        <div className="relative">
            <button onClick={toggleShowOptions} className="flex flex-col gap-1 max-h-[20px]">
                <div className=" bg-grayText w-1 h-1 rounded-full"></div>
                <div className=" bg-grayText w-1 h-1 rounded-full"></div>
                <div className=" bg-grayText w-1 h-1 rounded-full"></div>
            </button>
            {
                showOptions ? 
                <div className="absolute top-11 right-0 w-[192px] h-[94px] bg-white shadow rounded-3xl z-40">
                    <div className=" dark:bg-veryDarkGrey  flex flex-col gap-4 w-[200px] p-4 bg-magenta rounded-xl">
                        <button onClick={handleEditClick} className={`dark:text-white text-left ${active ? '' : ' opacity-50 cursor-default'}`}>Edit {type}</button>
                        <button onClick={handleDeleteClick} className={`text-left text-mainRed ${active ? '' : ' opacity-50 cursor-default'}`}>Delete {type}</button>
                    </div>  
                </div>
                : ''
            }
            
        </div>
    )  
}