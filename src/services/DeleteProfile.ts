import {  useMutation } from "react-query";

const DeleteProfile=({token}:{token:string})=>{
    const mutation=useMutation(()=>
    fetch(`http://localhost:5000/profile`,{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }).then((res) => res.json())
    )
 return mutation
}

export default DeleteProfile