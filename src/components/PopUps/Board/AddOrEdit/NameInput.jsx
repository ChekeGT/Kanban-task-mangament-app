
export default function NameInput({boardName, submissionErrors, handleBoardNameChange, error}){

    return (
        <div className="relative">
            <input name="board-name" className={`dark:bg-darkGrey w-full p-2 rounded-md  border border-gray ${ (submissionErrors && error) ? ' border-2 border-mainRed' : ''}`} placeholder="e.g. Web Design" type="text" value={boardName} onChange={handleBoardNameChange}/>
            {
                            (submissionErrors && error) ?
                            <div className="absolute top-0 right-0 h-[100%] flex items-center mr-4 text-center">
                                <p className=" text-mainRed text-sm">{error}</p>
                            </div>
                            : ''
            }
        </div>
    )
}