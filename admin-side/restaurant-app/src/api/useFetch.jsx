import { useEffect,useState } from "react";

export default function useFetch(url) {
    const [data,setData] = useState([])
    const BASEURL = "http://localhost:3000/"


    useEffect(() => {
        fetch(BASEURL + url)
            .then(response => {
                if(!response.ok) throw Error("response is not be ok")
              return response.json()
            })
            .then(data => {
                setData(data)
            })
            .catch(error => {
              console.log(error);
            });
    },[])
    
    return data
}