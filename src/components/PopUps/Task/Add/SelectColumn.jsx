import { useEffect, useState } from "react"

export default function SelectColumn({columns, value, setValue, setFormErrors, submissionFailed, currentTitle, originalColumn, type}){

    const NO_COLUMN_SELECTED = 'No column selected'

    const [error, setError] = useState('')

    useEffect(() => {
        checkForErrors(value)
    }, [currentTitle])

    function checkForErrors(value){
        let error = ''
        if (value == NO_COLUMN_SELECTED){
            error = 'Please select a column.'
        }
        columns.forEach((column) => {
            if (column.name == value && (originalColumn != column)){
                column.tasks.forEach((task) => {
                    if (task.title == currentTitle){
                        error = 'The column you have selected already has a task named like this. Please rename the task or select another column.'
                    }
                })
            }
        })

        if (error){
            setError(error)
            setFormErrors(true)
        }else{
            setFormErrors(false)
            setError('')
        }
    }
    function handleChange(e){
        let value = e.target.value
        setValue(value)
        checkForErrors(value)
    }

    useEffect(() => {
        let formatValue = value == '' ? NO_COLUMN_SELECTED : value
        setValue(formatValue)
    }, [])
    useEffect(() => {
        if (submissionFailed){
            checkForErrors(value)
        }
    }, [submissionFailed])
    
    return(
        <div className="flex flex-col gap-2">
                <div className=" flex w-full justify-between gap-5 items-center">
                    <h3 className="dark:text-white font-bold text-grayText">Column</h3>
                    {
                        error && submissionFailed ? <p className=" text-mainRed text-xs">{error}</p>
                        : ''
                    }
                </div>
                    <select onChange={handleChange} value={value} className={`dark:bg-darkGrey w-full p-2 rounded-md border ${error && submissionFailed ? ' border-mainRed' : 'border-gray'}`} name="" id="">
                        {columns.map((column) => (<option key={column.name}>{column.name}</option>))}
                        <option disabled hidden>{NO_COLUMN_SELECTED}</option>
                    </select>
        </div>
    )
}