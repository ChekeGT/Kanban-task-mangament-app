import Task from "./Task"


export default function ColumnTask({numberOfTasks, columnName}) {

    const color = `bg-todoColor`

    return(
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 pl-3">
                <div className={`w-3 h-3 ${color}  rounded-full`}></div>
                <p className="text-sm tracking-[2px] uppercase text-grayText line">{columnName}<span>({numberOfTasks})</span></p>
            </div>
            <div className="flex flex-col gap-4">
                <Task/>
                <Task/>
                <Task/>
            </div>
        </div>
    )
}