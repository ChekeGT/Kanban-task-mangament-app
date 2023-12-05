import Column from "./Column";


export default function BoardTable({ board }) {
    
  const { columns } = board
  
  if (columns.length === 0) {
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
    
  
  
    return (
      <div className="flex gap-8 pt-4 pl-6 pt-[120px] h-[100%] min-h-screen">
        {columns.map((column) => (
          <Column
            key={column.name}
            board={board}
            column={column}
          />
        ))}
        <div className="dark:bg-darkGrey flex items-center font-bold text-grayText bg-lightWhite cursor-pointer p-4 mt-10">
          <h1>+ New Column</h1>
        </div>
      </div>
    );
  }