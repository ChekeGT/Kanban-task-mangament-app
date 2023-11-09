export default function ViewTask() {
    
    const optionIcon = `./src/assets/icon-vertical-ellipsis.svg`;
    
    return(
        <div className="bg-black bg-opacity-50 h-screen flex justify-center items-center">
            <div className="flex flex-col gap-5 bg-white w-[480px] p-6">
                <div className="flex items-center">
                    <h1 className="font-bold text-xl">Research pricing points of various competitors and trial different business models</h1>
                    <img src={optionIcon} alt="" />
                </div>
                <p className=" text-grayText">We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.</p>
                <div> 
                    <h3>Subtasks (2 of 3)</h3>
                    {/* SUBTASK COMPONENT HERE */}
                    <div className="flex p-2 pl-4 gap-4 hover:bg-mainPurple hover:bg-opacity-30 ">
                        <input className="" type="checkbox" />
                        <p>Research competitor pricing and business models</p>
                    </div>
                </div>
                <div>
                    <h3>Current Status</h3>
                    <select className="w-full p-2 rounded-md border border-mainPurple" name="" id="">
                        <option value="">Todo</option>
                        <option value="">Doing</option>
                        <option value="">Done</option>
                    </select>
                </div>
            
            </div>
            
        </div>
    )
}