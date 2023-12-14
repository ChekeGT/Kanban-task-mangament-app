import { useEffect, useState } from "react";
import CrossIcon from "../../../Utilities/CrossIcon";

export function detectColumnError(columns, column) {
    let err = ''
    columns.forEach((comparativeColumn) => {
        if (column[1] != comparativeColumn[1] && column[0] == comparativeColumn[0]){
            err = 'You can not repeat column names.'
        }
    })

    if (column[0] == ''){
        err = 'Your column name must not be empty.'
    }
    return err
}
export default function ColumnInput({index, column, columns, setColumnValue, deleteColumn, submissionErrors, }){
    
    const value = column[0]
    const [showInput, setShowInput ] = useState(true)
    const [error, setError ] = useState('')

    useEffect(() => {
        if (submissionErrors){
            setError(detectColumnError(columns, column))
        }
    }, [column, columns, submissionErrors])

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
                    <input placeholder="e.g. Make Coffe" className={`dark:bg-darkGrey w-full p-2 rounded-md  border border-gray ${(submissionErrors && error)? ' border-2 border-mainRed' : ''}`} type="text" value={value} onChange={handleChange}/>
                    {
                    (submissionErrors && error) ?
                    <div className="absolute top-0 right-0 h-[100%] flex items-center mr-4 text-center">
                        <p className=" text-mainRed text-sm">{error}</p>
                    </div>
                    : <></>
                    }
                </div>
                <CrossIcon color={error ? '#EA5555' : '#828fa3'} deleteFunction={autoDestroy}/>
            </div>
        )
    }else{
        return (
            <>
            </>
        )
    }
}