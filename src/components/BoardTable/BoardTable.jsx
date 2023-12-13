import { useState } from "react";
import Column from "./Column";
import PopUpContainer from "../PopUps/PopUpContainer";
import AddOrEditBoard from "../PopUps/Board/AddOrEdit/AddOrEditBoard";
import { TYPES } from "../PopUps/Board/AddOrEdit/types";

function EditBoardPopUp({board, autoDestructionFunction}){
  return (
    <PopUpContainer autoDestructionFunction={autoDestructionFunction}>
      <AddOrEditBoard board={board} type={TYPES.edit}></AddOrEditBoard>
    </PopUpContainer>
  )
}


export default function BoardTable({ board }) {
  
  if (board == null){
    const [showAddPopUp, updateShowAddPopUp ] = useState(false)

    const toggleShowAddBoardPopUp = () => {updateShowAddPopUp(!showAddPopUp)}
    return (
      <div className="flex gap-8 pl-6 pt-[120px] h-[100%] min-h-screen justify-center items-center">
        {showAddPopUp ? <PopUpContainer autoDestructionFunction={toggleShowAddBoardPopUp}><AddOrEditBoard type={TYPES.add}/></PopUpContainer> : <></>}
        <div className="flex gap-4 flex-col items-center">
          <h1 className="text-grayText font-bold text-xl">
            This board is empty. Select a Board or Create a new one to get started.
          </h1>
          <button onClick={toggleShowAddBoardPopUp} className="bg-mainPurple p-2 px-4 rounded-full text-white font-semibold">
            + Create New Board.
          </button>
        </div>
      </div>
    )
  }

  const [showEditBoardPopUp, setShowEditBoardPopUp ] = useState(false)
    
  const { columns } = board

  function toggleShowEditBoardPopUp(){
    setShowEditBoardPopUp(!showEditBoardPopUp)
  }
  if (columns.length === 0) {
    return (
      <div className="flex gap-8  pl-6 pt-[120px] h-[100%] min-h-screen justify-center items-center">
        { showEditBoardPopUp ?<EditBoardPopUp autoDestructionFunction={toggleShowEditBoardPopUp} board={board}/> : <></> }
        <div className="flex gap-4 flex-col items-center">
          <h1 className="text-grayText font-bold">
            This board is empty. Create a new column to get started.
          </h1>
          <button onClick={toggleShowEditBoardPopUp} className="bg-mainPurple p-2 px-4 rounded-full text-white font-semibold">
            + Add New Column
          </button>
        </div>
      </div>
    )
  }
    
  
  
    return (
      <div className="flex flex-row gap-8 pl-6 pt-[120px] h-[100%] min-h-screen">
        { showEditBoardPopUp ?<EditBoardPopUp autoDestructionFunction={toggleShowEditBoardPopUp} board={board}/> : <></> }
        {columns.map((column) => (
          <Column
            key={column.name}
            board={board}
            column={column}
          />
        ))}
        <button onClick={toggleShowEditBoardPopUp} className="dark:bg-darkGrey flex items-center font-bold text-grayText bg-lightWhite cursor-pointer mt-3 mb-3 px-4 rounded-xl">
          <h1>+ New Column</h1>
        </button>
      </div>
    );
  }