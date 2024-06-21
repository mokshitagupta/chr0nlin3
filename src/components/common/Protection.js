import axios from "axios"

export default function Protect(props){
    const id = sessionStorage.getItem("sessionID")
    const userID = sessionStorage.getItem("userID")
    console.log(id, userID)

    if (!id || !userID){
        props.navigate("/login")
    }

    let url =  process.env.REACT_APP_BASE_API+ "/auth/verify.php"
        
    console.log(url, process.env.REACT_APP_BASE_API, process.env.REACT_APP_BASE_URL)

    const config = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        headers:{
            'Authorization': `Bearer ${id}`,
        }
    }

    axios.post(url, {'userID':userID}, config)
    .then(function (response) {
        console.log(response)
    })
    .catch(function (error) {
        console.log(error.response)
        if (!props.navigate){
            
        }
        props.navigate("/login")
    })

    

}