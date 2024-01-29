import { useParams } from "react-router-dom"

export default function Addfriends() {
    
    const {id} = useParams()
    return (
        <h1>this is add friend page for id : {id} </h1>
    )
}