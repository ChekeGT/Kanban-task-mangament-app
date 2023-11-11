import { useState } from "react";

export default function SubTask() {

    const [isChecked, setIsChecked] = useState(false);


    return(
        <div className={`${ isChecked ? 'bg-veryDarkGrey' : ''} flex p-2 pl-4 gap-4 hover:bg-mainPurple hover:bg-opacity-30 `}>
            <input  checked={isChecked}
        onChange={() => setIsChecked(!isChecked)} id="subTasks" className="checked:line-through" type="checkbox" />
             <label
                htmlFor="subTasks" className={`dark:text-white cursor-pointer ${isChecked ?'line-through opacity-50' : ''}`}
>
                Research competitor pricing and business models
            </label>
        </div>
    )
}