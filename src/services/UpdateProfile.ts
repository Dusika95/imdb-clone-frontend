import { useMutation } from "react-query"

 export interface UserUpdate{
    email:string
    password:string
    confirmPassword:string
}


const UpdateProfile = ({token}:{token:string})=>{
    const mutation = useMutation((data:UserUpdate)=>
    fetch(`http://localhost:5000/profile`, {
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization": "Bearer "+ token
        },
        body:JSON.stringify(data)
    })
)
return mutation
}
export default UpdateProfile 