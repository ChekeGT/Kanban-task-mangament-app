import Task from "./Task"


export default function Column({column, board }) {


    return(
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 pl-3">
                <div className={`w-3 h-3 bg-todoColor rounded-full`}></div>
                <p className="text-sm tracking-[2px] uppercase text-grayText line">{column.name}<span>({column.tasks.length})</span></p>
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto whitespace-nowrap max-h-[70vh]">
            {column.tasks.map((task, index) => (
                <Task
                key={index}
                task={task}
                column={column}
                board={board}
                />
            ))}
            </div>
        </div>
    )
}