import { TYPES } from "../Utilities/types"
import { useDispatch } from "../../App"
import { useState } from "react"
import { useAutoDestruction } from "./PopUpContainer"

export default function GeneralDeletePopUp({action, type, name}) {

    const dispatch = useDispatch()

    const autoDestructionFunction = useAutoDestruction()
    // This function is to keep the click only on the local scope of the component
    //  Why? because this is important in order for the user to close the tab.
    // Since this will be rendered on the popupcontainer. if the user clicks on the
    // popup container it will close, but not if he clicks on the popup itself?
    // why? because we have stop propagation :3

    function preventPropagation(e){
        e.stopPropagation()
    }

    function getDeleteMessage(type, name){
        switch(type){
            case TYPES.task:
                return `Are you sure you want to delete the '${name}' task and its subtasks? This action cannot be reversed.`
            case TYPES.board: 
                return `Are you sure you want to delete the '${name}' board? This action will remove all columns and tasks and cannot be reversed`
        }
    }
    const handleDelete = () => {
        dispatch(action)
        autoDestructionFunction()
    }
    
    const deleteMsg = getDeleteMessage(type, name)
    
    return(
        
        <div onClick={preventPropagation} className="bg-white max-w-full w-[480px] p-8 flex flex-col gap-5">
            <h1 className="font-bold text-xl text-mainRed">Delete this {type}?</h1>
            <p className="text-grayText">{deleteMsg}</p>
            <div className="w-full flex gap-4 ">
                <button onClick={handleDelete} className="bg-mainRed p-2 w-full rounded-full text-white font-semibold">Delete</button>
                <button onClick={autoDestructionFunction} className="bg-mainPurple bg-opacity-20 p-2 w-full rounded-full text-mainPurple font-semibold">Cancel</button>
            </div>
        </div>
        )
}