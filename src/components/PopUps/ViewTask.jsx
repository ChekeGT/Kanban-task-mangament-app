export default function ViewTask({title, }) {
    
    const optionIcon = `./src/assets/icon-vertical-ellipsis.svg`;


    // This function is to keep the click only on the local scope of the component
    //  Why? because this is important in order for the user to close the tab.
    // Since this will be rendered on the popupcontainer. if the user clicks on the
    // popup container it will close, but not if he clicks on the popup itself?
    // why? because we have stop propagation :3

    function preventPropagation(e){
        e.stopPropagation()
    }
    
    return(
        <div  onClick={preventPropagation} className="dark:bg-darkGrey flex flex-col gap-5 bg-white w-[480px] p-6">
            <div className="flex items-center">
                <h1 className="dark:text-white font-bold text-xl">Research pricing points of various competitors and trial different business models</h1>
                <img src={optionIcon} alt="" />
            </div>
            <p className=" text-grayText">We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.</p>
            <div> 
                <h3 className="dark:text-white">Subtasks (2 of 3)</h3>
                {/* SUBTASK COMPONENT HERE */}
                <div className="flex p-2 pl-4 gap-4 hover:bg-mainPurple hover:bg-opacity-30 ">
                    <input className="" type="checkbox" />
                    <p>Research competitor pricing and business models</p>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="dark:text-white">Current Status</h3>
                <select className="dark:bg-darkGrey dark:text-white w-full p-2 rounded-md border border-mainPurple" name="" id="">
                    <option value="">Todo</option>
                    <option value="">Doing</option>
                    <option value="">Done</option>
                </select>
            </div>
            
        </div>
            )
}