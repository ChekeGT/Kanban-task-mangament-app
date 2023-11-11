import { useState } from "react";

export default function ColumnInput({index, value, setColumnValue, deleteColumn, submissionErrors}){
    
    const [showInput, setShowInput ] = useState(true)

    const handleChange = (e) => {
        setColumnValue(index, e.target.value)
    }

    const autoDestroy = () => {
        setShowInput(false)
        deleteColumn(index)
    }
    if (showInput){
        return(
            <div className="flex items-center gap-4">
                <div className="w-full relative">
                    <input placeholder="e.g. Make Coffe" className={`dark:bg-darkGrey w-full p-2 rounded-md  border border-gray ${(submissionErrors && value == '')? ' border-2 border-mainRed' : ''}`} type="text" value={value} onChange={handleChange}/>
                    {
                    (submissionErrors && value == '') ?
                    <div className="absolute top-0 right-0 h-[100%] flex items-center mr-4 text-center">
                        <p className=" text-mainRed text-sm">Can't Be Empty</p>
                    </div>
                    : ''
                    }
                </div>
                <button onClick={autoDestroy}>
                <svg className={`${(submissionErrors && value == '') ? 'fill-mainRed' : 'fill-grayText'}`} width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fillRule="evenodd"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
                </button>
            </div>
        )
    }else{
        return (
            <>
            </>
        )
    }
}