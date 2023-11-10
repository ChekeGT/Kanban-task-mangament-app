export default function BoardComponent({name}){
    return (
        <div className="flex flex-row w-full items-center gap-2">
            <img className=" w-[16px] h-[16px]" src="./src/assets/icon-board.svg" alt="" />
            <p className=" text-grayText font-extrabold">{name}</p>
        </div>
    )
}