import { useState } from "react"

export default function TitleInput({title, setTitle, column, setFormErrors}){
    
    const [error, setError] = useState('')

    const checkForErrors = (value) => {
        let err = false
        if (value == ''){
            setError("Can't be empty.")
            err = true
        }
        if (column){
            column.tasks.forEach((task) => {
                if (task.name == value){
                    setError("This task name is already in use.")
                    err = true
                }
            })
        }

        if (err){
            setFormErrors(true)
        }else{
            setFormErrors(false)
            setError('')
        }
    }

    const handleChange = (e) => {
        let value = e.target.value
        
        checkForErrors(value)

        setTitle(value)
    }
    return (
        <div className='flex flex-col gap-2'>
            <h3 className="dark:text-white font-bold text-grayText">Title</h3>
            <div className="relative">
                <input className={`dark:bg-darkGrey w-full p-2 rounded-md  border border-gray ${error ? ' border-2 border-mainRed' : ''}`} value={title} onChange={handleChange} placeholder="e.g. Take coffee break" type="text" />
                {
                                error ?
                                <div className="absolute top-0 right-0 h-[100%] flex items-center mr-4 text-center">
                                    <p className=" text-mainRed text-sm">{error}</p>
                                </div>
                                : ''
                }
            </div>
        </div>   
    )
}