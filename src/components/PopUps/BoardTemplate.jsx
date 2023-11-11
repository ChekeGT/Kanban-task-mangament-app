export default function BoardTemplate() {
    
    const crossIcon = `./src/assets/icon-cross.svg`;

    function preventPropagation(e){
        e.stopPropagation()
    }
    
    return(
        <div onClick={preventPropagation} className="w-[480px] bg-white px-6 py-8 flex flex-col gap-5">
            <h1 className="font-bold text-xl ">Add New Board</h1>
            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-grayText">Name</h3>
                <input className="w-full p-2 rounded-md  border border-gray" placeholder="e.g. Web Design" type="text" />
            </div>
            <div>
                <h3 className="font-bold text-grayText">Columns</h3>
                <div className="pb-6">
                    {/* COMPONENT COLUMNS */}
                    <div className="flex items-center gap-4">
                        <input placeholder="e.g. Make Coffe" className="w-full p-2 rounded-md  border border-gray" type="text" />
                        <img src={crossIcon} alt="" />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <button className="bg-mainPurple bg-opacity-10 p-2 text-mainPurple font-bold rounded-full">+ Add New Column</button>
                    <button className="bg-mainPurple p-2 rounded-full text-white font-semibold">Create New Board</button>
                </div>
            </div>
        </div>
    )
}