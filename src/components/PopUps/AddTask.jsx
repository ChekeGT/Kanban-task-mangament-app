export default function AddTask() {

    const crossIcon = `./src/assets/icon-cross.svg`;
    
    return(
        <div className="w-[480px] bg-white px-6 py-8 flex flex-col gap-5">
            <h1 className="font-bold text-xl ">Add New Task</h1>
            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-grayText">Title</h3>
                <input className="w-full p-2 rounded-md  border border-gray" placeholder="e.g. Take coffee break" type="text" />
            </div>
            <div>
                 <h3 className="font-bold text-grayText">Description</h3>
                <textarea className="resize-none w-full h-[100px] p-2 rounded-md border border-gray" placeholder="e.g. It’s always good to take a break. This 15 minute break will 
                recharge the batteries a little." type="textarea" />
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-grayText">Subtasks</h3>
                <div className="flex items-center gap-4">
                    <input placeholder="e.g. Make Coffe" className="w-full p-2 rounded-md  border border-gray" type="text" />
                    <img src={crossIcon} alt="" />
                </div>
                <div className="flex items-center gap-4">
                    <input placeholder="e.g. Drink coffe & smile" className="w-full p-2 rounded-md  border border-gray" type="text" />
                    <img src={crossIcon} alt="" />
                </div>
                <button className="bg-mainPurple bg-opacity-10 p-2 text-mainPurple font-bold rounded-full">+ Add New Subtask</button>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-grayText">Status</h3>
                <select className="w-full p-2 rounded-md  border border-gray" name="" id="">
                    <option value="">Todo</option>
                </select>
            </div>
            <button className="bg-mainPurple p-2 rounded-full text-white font-semibold">Create Task</button>
        </div>
        )
}