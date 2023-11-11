export default function DeleteTemplate({title, description}) {

    // This function is to keep the click only on the local scope of the component
    //  Why? because this is important in order for the user to close the tab.
    // Since this will be rendered on the popupcontainer. if the user clicks on the
    // popup container it will close, but not if he clicks on the popup itself?
    // why? because we have stop propagation :3

    function preventPropagation(e){
        e.stopPropagation()
    }
    
    return(
        <div onClick={preventPropagation} className="bg-white w-[480px] p-8 flex flex-col gap-5">
            <h1 className="font-bold text-xl text-mainRed">Delete this Board?</h1>
            <p className="text-grayText">Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</p>
            <div className="w-full flex gap-4 ">
                <button className="bg-mainRed p-2 w-full rounded-full text-white font-semibold">Delete</button>
                <button className="bg-mainPurple bg-opacity-20 p-2 w-full rounded-full text-mainPurple font-semibold">Cancel</button>
            </div>
        </div>
    )
}