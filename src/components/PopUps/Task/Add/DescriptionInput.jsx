import { useEffect, useState } from "react"

export default function DescriptionInput({value, setValue, setFormErrors, submissionFailed}){
    
    const [error, setError ] = useState('')

    function checkForErrors(value){
        let error = ''

        if (value == ''){
            error = "Can't be empty"
        }

        if (value.length > 500){
            error = "Your description can't be that longer."
        }

        if (error){
            setError(error)
            setFormErrors(true)
        }else{
            setError('')
            setFormErrors(false)
        }
    }
    
    function handleChange(e){
        let value = e.target.value
        checkForErrors(value)
        setValue(value)
    }

    useEffect(() => {
        if (submissionFailed){
            checkForErrors(value)
        }
    }, [submissionFailed])
    return (
        <div>
            <div className="flex justify-between w-full mb-2 items-center">
                <h3 className="dark:text-white font-bold text-grayText">Description</h3>
                {error && submissionFailed ? <p className=" text-mainRed text-xs">{error}</p> : <></>}
            </div>
            <textarea value={value} onChange={handleChange} className={`dark:bg-darkGrey resize-none w-full h-[100px] p-2 rounded-md dark:text-white  border ${error && submissionFailed ? ' border-mainRed' : 'border-gray'}`} placeholder="e.g. It’s always good to take a break. This 15 minute break will 
            recharge the batteries a little." type="textarea" />
        </div>
    )
}