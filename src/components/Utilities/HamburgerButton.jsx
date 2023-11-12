import { useState } from "react"

export default function HamburgerButton({handleShowDeletePopUp, handleShowEditPopUp, type}){
    const [showOptions, setShowOptions ] = useState(false)

    const handleShowOptions = () => {
        setShowOptions(!showOptions)
    }
    return (
        <div className="relative">
            <button onClick={handleShowOptions} className="flex flex-col gap-1 max-h-[20px]">
                <div className=" bg-grayText w-1 h-1 rounded-full"></div>
                <div className=" bg-grayText w-1 h-1 rounded-full"></div>
                <div className=" bg-grayText w-1 h-1 rounded-full"></div>
            </button>
            {
                showOptions ? 
                <div className="absolute top-11 right-0 w-[192px] h-[94px] bg-white shadow rounded-3xl">
                    <div className="dark:bg-darkGrey  flex flex-col gap-4 w-[200px] p-4 bg-magenta rounded-xl">
                        <button onClick={handleShowEditPopUp} className="dark:text-white text-left">Edit {type}</button>
                        <button onClick={handleShowDeletePopUp} className="text-left text-mainRed">Delete {type}</button>
                    </div>  
                </div>
                : ''
            }
            
        </div>
    )  
}