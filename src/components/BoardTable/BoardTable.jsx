import ColumnTask from "./ColumnTasks"

export default function BoardTable() {

    const content = false

    return(
        <div className="flex gap-8 pt-4 pl-6 mt-[96px] h-[100vh]">
            <ColumnTask/>
            <ColumnTask/>
            <ColumnTask/>
            <div className="dark:bg-darkGrey flex items-center font-bold text-grayText bg-lightWhite cursor-pointer p-4 mt-10">
                <h1>+ New Column</h1>
            </div>
        </div>
        // <div className="flex justify-center items-center">
        //     <div className="flex flex-col items-center">
        //         <h1 className="text-grayText font-bold">This board is empty. Create a new column 
        //         to get started.</h1>
        //         <button className="bg-mainPurple p-2 px-4 rounded-full text-white font-semibold ">+ Add New Column</button>
        //     </div>
        // </div>

    )
}