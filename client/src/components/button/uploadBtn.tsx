export default function UploadBtn({btnText, OnClick, isLoading, disable, className}: 
    {btnText: string, OnClick: ()=>void, isLoading?: boolean, disable?: boolean, className: string}){
    return(
        <button 
        type="button"
        onClick={OnClick}
        disabled={disable}
        className={`btn ${className} py-2.5 px-2 w-full text-lg`}>
            {isLoading ? <span className="loading loading-spinner loading-xs"></span> : btnText}
        </button>
    )
    
}