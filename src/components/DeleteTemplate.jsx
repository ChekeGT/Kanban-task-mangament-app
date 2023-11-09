export default function DeleteTemplate({title, description}) {
    return(
        <div className="bg-black bg-opacity-50 h-screen flex justify-center items-center">
            <div className="bg-white w-[480px] p-8 flex flex-col gap-5">
                <h1 className="font-bold text-xl text-mainRed">Delete this Board?</h1>
                <p className="text-grayText">Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</p>
                <div className="w-full flex gap-4 ">
                    <button className="bg-mainRed p-2 w-full rounded-full text-white font-semibold">Delete</button>
                    <button className="bg-mainPurple bg-opacity-20 p-2 w-full rounded-full text-mainPurple font-semibold">Cancel</button>
                </div>
            </div>
        </div>
    )
}