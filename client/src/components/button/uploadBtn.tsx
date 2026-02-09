export default function UploadBtn({btnText, OnClick, isLoading, disable}: 
    {btnText: string, OnClick: ()=>void, isLoading: boolean, disable: boolean}){
    return(
        <button 
        type="button"
        onClick={OnClick}
        disabled={disable}
        className="btn btn-primary py-2.5 px-2 w-full text-lg">
            {isLoading ? <span className="loading loading-spinner loading-xs"></span> : btnText}
        </button>
    )
    
}