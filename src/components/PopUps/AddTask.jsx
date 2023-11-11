export default function AddTask() {

    const crossIcon = `./src/assets/icon-cross.svg`;

    // This function is to keep the click only on the local scope of the component
    //  Why? because this is important in order for the user to close the tab.
    // Since this will be rendered on the popupcontainer. if the user clicks on the
    // popup container it will close, but not if he clicks on the popup itself?
    // why? because we have stop propagation :3

    function preventPropagation(e){
        e.stopPropagation()
    }
    
    return(
        <div onClick={preventPropagation} className="dark:bg-darkGrey w-[480px] bg-white px-6 py-8 flex flex-col gap-5">
            <h1 className="font-bold text-xl">Add New Task</h1>
            <div className="flex flex-col gap-2">
                <h3 className="dark:text-white font-bold text-grayText">Title</h3>
                <input className="dark:bg-darkGrey w-full p-2 rounded-md  border border-gray" placeholder="e.g. Take coffee break" type="text" />
            </div>
            <div>
                 <h3 className="dark:text-white font-bold text-grayText">Description</h3>
                <textarea className="dark:bg-darkGrey resize-none w-full h-[100px] p-2 rounded-md border border-gray" placeholder="e.g. It’s always good to take a break. This 15 minute break will 
                recharge the batteries a little." type="textarea" />
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="dark:text-white font-bold text-grayText">Subtasks</h3>
                <div className="flex items-center gap-4">
                    <input placeholder="e.g. Make Coffe" className=" dark:bg-darkGrey w-full p-2 rounded-md  border border-gray" type="text" />
                    <img src={crossIcon} alt="" />
                </div>
                <div className="flex items-center gap-4">
                    <input placeholder="e.g. Drink coffe & smile" className="dark:bg-darkGrey w-full p-2 rounded-md  border border-gray" type="text" />
                    <img src={crossIcon} alt="" />
                </div>
                <button className="dark:bg-white bg-mainPurple bg-opacity-10 p-2 text-mainPurple font-bold rounded-full">+ Add New Subtask</button>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="dark:text-white font-bold text-grayText">Status</h3>
                <select  className="dark:bg-darkGrey w-full p-2 rounded-md  border border-gray" name="" id="">
                    <option value="">Todo</option>
                </select>
            </div>
            <button className="bg-mainPurple p-2 rounded-full text-white font-semibold">Create Task</button>
        </div>
        )
}