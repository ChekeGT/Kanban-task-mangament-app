export default function PopUpOptions() {
    return(
        <div className="dark:bg-darkGrey  flex flex-col gap-4 w-[200px] p-4 -left-10 absolute  bg-white rounded-xl">
                        <button className="dark:text-white text-left">Edit Task</button>
                        <button className="text-left text-mainRed">Delete Task</button>
        </div>
    )
}