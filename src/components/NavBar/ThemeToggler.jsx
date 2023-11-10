import { useState } from "react"
import { useDispatch } from "../../App"


export default function ThemeToggler({theme}){
    let dispatch = useDispatch()

    let [checked, SetCheck ] = useState(theme == 'light' ? false : true)

    const handleToggle = () => {
        
    }

    return (
        <div className="flex flex-row w-full justify-evenly mx-auto bg-grayBackground items-center py-2 rounded-md dark:bg-veryDarkGrey">
            <img className=" w-[18px] h-[18px]" src="./src/assets/icon-light-theme.svg"/>
            <label className="switch">
                <input className="toggle"  type="checkbox" onChange={handleToggle} />
                <span className="slider rounded-full before:rounded-full"></span>
            </label>
            <img className=" w-[18px] h-[18px]" src="./src/assets/icon-dark-theme.svg"/>
        </div>
    )

}