import ColumnTask from "./ColumnTasks";


export default function BoardTable({ boards, numberOfBoards }) {
    
  if(numberOfBoards.length === 0){
    return(
      <>
      </>
    )
  }
  
  if (!boards || !boards.columns || boards.columns.length === 0) {
    return (
      <div className="flex gap-8 pt-4 pl-6 pt-[120px] h-[100%] min-h-screen justify-center items-center">
        <div className="flex gap-4 flex-col items-center">
          <h1 className="text-grayText font-bold">
            This board is empty. Create a new column to get started.
          </h1>
          <button className="bg-mainPurple p-2 px-4 rounded-full text-white font-semibold">
            + Add New Column
          </button>
        </div>
      </div>
    );
  }
    
  
    const columns = boards.columns;
  
    return (
      <div className="flex gap-8 pt-4 pl-6 pt-[120px] h-[100%] min-h-screen">
        {columns.map((column) => (
          <ColumnTask
            key={column.id}
            numberOfTasks={column.tasks.length}
            columnName={column.name}
            boards={boards}
          />
        ))}
        <div className="dark:bg-darkGrey flex items-center font-bold text-grayText bg-lightWhite cursor-pointer p-4 mt-10">
          <h1>+ New Column</h1>
        </div>
      </div>
    );
  }