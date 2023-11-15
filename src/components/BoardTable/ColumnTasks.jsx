import Task from "./Task"


export default function ColumnTask({numberOfTasks, columnName, boards}) {

    const color = `bg-todoColor`

    const tasks = boards.columns.find((column) => column.name === columnName)?.tasks || [];

    return(
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 pl-3">
                <div className={`w-3 h-3 ${color}  rounded-full`}></div>
                <p className="text-sm tracking-[2px] uppercase text-grayText line">{columnName}<span>({numberOfTasks})</span></p>
            </div>
            <div className="flex flex-col gap-4">
            {tasks.map((task, index) => (
                <Task
                key={index}
                titleTask={task.title}
                completedSubtasks={1}
                board={boards}
                />
            ))}
            </div>
        </div>
    )
}