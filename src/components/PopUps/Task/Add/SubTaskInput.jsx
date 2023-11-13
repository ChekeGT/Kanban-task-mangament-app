import { useState } from "react"
import CrossIcon from "../../../Utilities/CrossIcon"

export default function SubTaskInput({ subTasks, value, setValue, autoDestructionFunction }){

    const [error, setError ] = useState('')

    const checkForErrors = (value) => {
        let error = ''
        if (value == ''){
            error = "Can't be empty."
        }
        subTasks.forEach((subtask) => {
            if (subtask == value && subtask != ''){
                error = 'This Subtask name is already in use.'
            }
        })

        return error
    }
    
    const handleChange = (e) => {
        let actualValue = e.target.value
        let error = checkForErrors(actualValue)
        setValue(actualValue, error == '' ? false : true)
        setError(error)
    }
    return (
            <div className="flex items-center gap-4">
                <div className="relative w-[100%]">
                    <input className={`dark:bg-darkGrey w-full p-2 rounded-md ${error ? ' border-2 border-mainRed' : 'border border-gray'}`} placeholder='idk' onChange={handleChange} value={value} type="text" />
                    {
                            error ?
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