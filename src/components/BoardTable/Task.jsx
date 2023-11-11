export default function Task({titleTask, completedSubtasks}) {
    return(
        <div className="dark:bg-darkGrey hover:text-mainPurple cursor-pointer max-w-[280px] shadow-md flex flex-col gap-1 p-3 pr-12 rounded-lg items-start">
            <h2 className="dark:hover:text-mainPurple dark:text-white font-semibold">Build UI for onboarding flow</h2>
            <p className="text-sm text-grayText">0 of 3 subtasks</p>
        </div>
    )
}