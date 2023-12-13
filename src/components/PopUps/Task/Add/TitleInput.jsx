import { useEffect, useState } from "react"

export default function TitleInput({value, setValue, column, setFormErrors, submissionFailed, originalTaskName = null}){
    
    const [error, setError] = useState('')


    const checkForErrors = (value) => {
        let err = ''
        if (value == ''){
            err = "Can't be empty."
        }
        if (column){
            column.tasks.forEach((task) => {
                if (value == task.title && value != originalTaskName){
                    err = "This task name is already in use."
                }
            })
        }

        if (err){
            setFormErrors(true)
            setError(err)
        }else{
            setFormErrors(false)
            setError('')
        }
    }

    const handleChange = (e) => {
        let value = e.target.value
        
        checkForErrors(value)

        setValue(value)
    }

    useEffect(() => {
        checkForErrors(value)
    }, [column, submissionFailed])

    return (
        <div className='flex flex-col gap-2'>
            <h3 className="dark:text-white font-bold text-grayText">Title</h3>
            <div className="relative">
                <input className={`dark:bg-darkGrey w-full p-2 rounded-md  border dark:text-white border-gray ${error && submissionFailed ? ' border-2 border-mainRed' : ''}`} value={value} onChange={handleChange} placeholder="e.g. Take coffee break" type="text" />
                {
                                error && submissionFailed ?
                                <div className="absolute top-0 right-0 h-[100%] flex items-center mr-4 text-center">
                                    <p className=" text-mainRed text-sm">{error}</p>
                                </div>
                                : ''
                }
            </div>
        </div>   
    )
}