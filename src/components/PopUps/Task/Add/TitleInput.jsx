import { useState } from "react"

export default function TitleInput({title, setTitle, column, setFormErrors}){
    
    const [error, setError] = useState('')

    const checkForErrors = (value) => {
        let err = false
        if (value == ''){
            console.log('hola cara de bola')
            setError("Can't be empty.")
            err = true
        }
        if (column != ''){
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
        }
    }

    const handleChange = (e) => {
        let value = e.target.value
        
        checkForErrors(value)

        setTitle(value)
    }
    return (
        <div className="flex flex-col gap-2">
            <h3 className="dark:text-white font-bold text-grayText">Title</h3>
            <input value={title} onChange={handleChange} className="dark:bg-darkGrey w-full p-2 rounded-md  border border-gray" placeholder="e.g. Take coffee break" type="text" />
        </div>   
    )
}