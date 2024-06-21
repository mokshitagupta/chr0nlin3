import 'animate.css';

export default function FeedbackPreLogin(props){

    console.log(props)

    if (!props.type || !props.feedback){
        return null
    }
    return(
        <div key={+new Date()} class=" animate__animated animate__fadeIn" style={{display:"flex", gap:"3.5%", justifyContent:"center"}}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{backgroundColor:"var(--white)", borderRadius:"100%", border:"1px solid var(--white)", width:"7%",height:"7%",minHeight:"7%", minWidth:"7%", maxWidth:"7%", maxHeight:"7%"}} fill={`var(--${props.type})`} viewBox="0 0 512 512">
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
            </svg>
            <h3 class={`feedback ${props.type} big-width`} id="reg-help">{props.feedback}</h3> 
        </div>
    )
}