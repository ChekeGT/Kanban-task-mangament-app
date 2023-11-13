import { useState, useEffect } from "react"
import CrossIcon from "../../../Utilities/CrossIcon"

export default function SubTaskInput({ subTasks, value, setValue, autoDestructionFunction, submissionFailed }){

    const [error, setError ] = useState('')

    const checkForErrorsAndSetValue = (value) => {
        let error = ''
        if (value == ''){
            error = "Can't be empty."
        }
        subTasks.forEach((subtask) => {
            if (subtask == value && subtask != ''){
                error = 'This Subtask name is already in use.'
            }
        })
        if (error){
            setError(error)
            setValue(value, true)
        }else{
            setError('')
            setValue(value, false)
        }
    }
    
    const handleChange = (e) => {
        let value = e.target.value
        checkForErrorsAndSetValue(value)
    }
    
    useEffect(() => {
        if (submissionFailed){
            checkForErrorsAndSetValue(value)
        }
    }, [submissionFailed])
    return (
            <div className="flex items-center gap-4">
                <div className="relative w-[100%]">
                    <input className={`dark:bg-darkGrey w-full p-2 rounded-md ${error ? ' border-2 border-mainRed' : 'border border-gray'}`} placeholder='idk' onChange={handleChange} value={value} type="text" />
                    {
                            error && submissionFailed ?
                                <div className="absolute top-0 right-0 h-[100%] flex items-center mr-4 text-center">
                                <p className=" text-mainRed text-sm">{error}</p>
                                </div>
                                : ''
                    }
                </div>
                 <CrossIcon deleteFunction={autoDestructionFunction} color={error ? '#EA5555' : '#828FA3'}/>
                 
            </div>
    )
}