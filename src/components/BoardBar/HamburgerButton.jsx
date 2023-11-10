export default function HamburgerButton(){
    return (
        <button className="flex flex-col gap-1 max-h-[20px]">
            <div className=" bg-grayText w-1 h-1 rounded-full"></div>
            <div className=" bg-grayText w-1 h-1 rounded-full"></div>
            <div className=" bg-grayText w-1 h-1 rounded-full"></div>
        </button>
    )  
}