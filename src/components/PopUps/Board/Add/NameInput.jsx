
export default function NameInput({boardName, submissionErrors, handleBoardNameChange, usedBoardName}){

    return (
        <div className="relative">
            <input name="board-name" className={`dark:bg-darkGrey w-full p-2 rounded-md  border border-gray ${ ((submissionErrors && boardName == '') || usedBoardName) ? ' border-2 border-mainRed' : ''}`} placeholder="e.g. Web Design" type="text" value={boardName} onChange={handleBoardNameChange}/>
            {
                            (submissionErrors && boardName == '') ?
                            <div className="absolute top-0 right-0 h-[100%] flex items-center mr-4 text-center">
                                <p className=" text-mainRed text-sm">Can't Be Empty</p>
                            </div>
                            : ''
            }
            {
                            (usedBoardName) ?
                            <div className="absolute top-0 right-0 h-[100%] flex items-center mr-4 text-center">
                                <p className=" text-mainRed text-sm">This board name is already in use.</p>
                            </div>
                            : ''
            }
        </div>
    )
}