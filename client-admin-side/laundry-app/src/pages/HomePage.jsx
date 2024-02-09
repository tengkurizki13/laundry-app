
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests } from '../store/actions/actionCreator';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";

// fuction for home page
function HomePage() {
   // define fuction needed for action
  const dispatch = useDispatch()
  const navigate = useNavigate();
  

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
    
  function changePage(form){
    console.log(form,"inid i");
    navigate("/form-add")
  }
  // contional if data not relode yet
  if (loading) {
    return <h1>memuat...</h1>
  }

  return (
    <>
      <div className="row mt-5">
            <div className="col-6 d-flex">
              <form className="d-flex me-3">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
              <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Filter Data
                    </button>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Action</a></li>
                      <li><a className="dropdown-item" href="#">Another action</a></li>
                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
              </div>
            </div>
            <div className="col-6 text-end">
                   <button className="btn btn-success shadow" onClick={() => {changePage("add")}} ><i className="bi bi-plus-circle"></i></button>
            </div>
      </div>
    <div className='mt-3'>
        <table className="table shadow">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">pelanggan</th>
                <th scope="col">waktu</th>
                <th scope="col">orderID</th>
                <th scope="col">status</th>
                <th scope="col">action</th>
              </tr>
            </thead>
            <tbody>
            {requests.map((request,i) =>{
                  return <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{request.User.username}</td>
                    <td>{format(new Date(request.createdAt), 'dd/MM/yyyy HH:mm:ss')}</td>
                    <td>{request.id}</td>
                    {/* <td>{request.status}</td> */}
                    <td>
                    <select className="form-select" aria-label="Default select example">
                      <option value="proses" selected={request.status === 'proses'}>Proses</option>
                      <option value="penimbangan" selected={request.status === 'penimbangan'}>Penimbangan</option>
                      <option value="pencucian" selected={request.status === 'pencucian'}>Pencucian</option>
                      <option value="pengeringan" selected={request.status === 'pengeringan'}>Pengeringan</option>
                      <option value="pengemasan" selected={request.status === 'pengemasan'}>Pengemasan</option>
                      <option value="selesai" selected={request.status === 'selesai'}>Selesai</option>
                    </select>
                    </td>

                    <td>
                      <button className='btn btn-danger me-3'><i className="bi bi-trash"></i></button>
                      <button className='btn btn-warning me-3'><i className="bi bi-pencil"></i></button>
                      <button className='btn btn-secondary'><i className="bi bi-ticket-detailed"></i></button>
                    </td>
                  </tr>
                  })}
              
            </tbody>
          </table>
     </div>
    </>
  )
}

export default HomePage
