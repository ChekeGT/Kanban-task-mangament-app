import { useState, useEffect } from "react"
import CrossIcon from "../../../Utilities/CrossIcon"


export default function SubTaskInput({ subTasks, value, setValue, autoDestructionFunction, submissionFailed, originalValue = null, checkForErrors }){
    const [error, setError ] = useState('')
    
    const checkForErrorsAndSetValue = (value) => {
        setValue(value, checkForErrors(value, subTasks, originalValue))
    }
    
    const handleChange = (e) => {
        let value = e.target.value
        checkForErrorsAndSetValue(value)
    }

    useEffect(() => {
        setError(checkForErrors(value, subTasks, originalValue))
    }, [subTasks, value, originalValue, checkForErrors])

    useEffect(() => {
        if (submissionFailed){
            checkForErrorsAndSetValue(value)
        }
    }, [submissionFailed])
    return (
            <div className="flex items-center gap-4">
                <div className="relative w-[100%]">
                    <input className={`dark:bg-darkGrey w-full p-2 rounded-md dark:text-white ${error && submissionFailed ? ' border-2 border-mainRed' : 'border border-gray'}`} placeholder='idk' onChange={handleChange} value={value} type="text" />
                    {
                            error && submissionFailed ?
                                <div className="absolute top-0 right-0 h-[100%] flex items-center mr-4 text-center">
                                <p className=" text-mainRed text-sm">{error}</p>
                                </div>
                                : ''
                    }
                </div>
                 <CrossIcon deleteFunction={autoDestructionFunction} color={error && submissionFailed ? '#EA5555' : '#828FA3'}/>
                 
            </div>
    )
}