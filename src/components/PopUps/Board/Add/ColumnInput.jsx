import { useState } from "react";

export default function ColumnInput({index, value, setColumnValue, deleteColumn}){
    const crossIcon = `./src/assets/icon-cross.svg`;
    
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
                <input placeholder="e.g. Make Coffe" className="dark:bg-darkGrey w-full p-2 rounded-md  border border-gray" type="text" value={value} onChange={handleChange}/>
                <button onClick={autoDestroy}>
                 <img src={crossIcon} alt="" />
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