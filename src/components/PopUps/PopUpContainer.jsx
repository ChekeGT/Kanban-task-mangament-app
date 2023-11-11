export default function PopUpContainer({ children, autoDestructionFunction}){

    return (
        // The function will only work if the user clicks in some area that is not the children of this function.
        // why? because on the children of this function it exists a stop propagation function.
        <div  onClick={autoDestructionFunction} className="bg-blackCover absolute w-11 h-12 left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] w-[100%] h-[100%] flex justify-center items-center z-50">
            {children}
        </div>
    )
}