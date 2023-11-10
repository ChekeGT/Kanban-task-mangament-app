import { useState } from "react"
import { useDispatch } from "../../App"
import { THEMES } from "../../state_management/themes"
import { ACTIONS } from "../../state_management/actions"


export default function ThemeToggler({theme}){
    let dispatch = useDispatch()

    let [checked, SetCheck ] = useState(theme == THEMES.light ? false : true)

    const handleToggle = () => {
        
        let payload = checked == true ? THEMES.light : THEMES.dark
        let action = {
            type: ACTIONS.toggleTheme,
            payload: payload
        }
        dispatch(action)
        
        let htmlElement = document.documentElement
        if (payload == THEMES.dark){
            htmlElement.classList.add('dark')
        }
        if (payload == THEMES.light){
            htmlElement.classList.remove('dark')
        }

        SetCheck(!checked)

    }  

    return (
        <div className="flex flex-row w-full justify-evenly mx-auto bg-grayBackground items-center py-2 rounded-md dark:bg-veryDarkGrey">
            <img className=" w-[18px] h-[18px]" src="./src/assets/icon-light-theme.svg"/>
            <label className="switch">
                <input className="toggle"  type="checkbox" onChange={handleToggle} value={checked} />
                <span className={`slider rounded-full before:rounded-full ${checked ? 'before:translate-x-5' : ''}`}></span>
            </label>
            <img className=" w-[18px] h-[18px]" src="./src/assets/icon-dark-theme.svg"/>
        </div>
    )

}