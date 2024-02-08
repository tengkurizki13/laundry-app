
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests } from '../store/actions/actionCreator';
import BodyItem from "../components/BodyItem";

// fuction for home page
function HomePage() {
   // define fuction needed for action
  const dispatch = useDispatch()
  

  // states
  const[loading,setLoading] = useState(true)
  const {requests} = useSelector(((state) => state.request))

  // function page reload first time and once
  useEffect(() => {
    dispatch(fetchRequests())
      .then(() => {
        setLoading(false)
      })
    },[])
    
  // fucntion to handle move to child file or component detail
 
  // contional if data not relode yet
  if (loading) {
    return <h1>memuat...</h1>
  }

  return (
    <>
    <div className='d-flex flex-wrap mt-5'>
      {/* loop items and call component child */}
      {requests.map((el,i) =>{
        return <BodyItem request={el} key={i} />
        })}
        
     </div>
    </>
  )
}

export default HomePage
