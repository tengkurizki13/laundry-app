
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequests,deleteRequestHandler,updateStatusRequestHandler} from '../store/actions/actionCreator';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

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
    
  function changePageToForm(form,id){
    if (form == "add") {
      navigate("/form-add")
    }else if (form == "edit") {
      navigate("/form-edit/" + id)
    }else{
      navigate("/")
    }
  }

  function changePageToDetail(id){
      navigate("/requests/"+id)
  }

  function handleChangeStatus(id,e){
    // Mengubah status dalam state data

   let data = {
    status : e.target.value
   }

    dispatch(updateStatusRequestHandler(data,id))
    .then(() => {
      dispatch(fetchRequests())
      .then(() => {
        setLoading(false)
      })
    })
}

  function handleDelete(id){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteRequestHandler(id))
        .then(() => {
          dispatch(fetchRequests())
          .then(() => {
            setLoading(false)
          })
          navigate("/")
        })
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
   
  }

  console.log(requests);

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
                      <li><a className="dropdown-item" href="#">sedang proses</a></li>
                      <li><a className="dropdown-item" href="#">sedang Penimbangan</a></li>
                      <li><a className="dropdown-item" href="#">sedang Pencucian</a></li>
                      <li><a className="dropdown-item" href="#">sedang Pengeringan</a></li>
                      <li><a className="dropdown-item" href="#">sedang Pengemasan</a></li>
                      <li><a className="dropdown-item" href="#">sudah selesai</a></li>
                    </ul>
              </div>
            </div>
            <div className="col-6 text-end">
                   <button className="btn btn-success shadow" onClick={() => {changePageToForm("add")}} ><i className="bi bi-plus-circle"></i></button>
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
                        {request.status === 'selesai' ? (
                          <span style={{ color: 'green' }} className='fst-italic'>Selesai!!!</span>
                        ) : (
                          <select className="form-select" aria-label="Default select example" name='status' onChange={(e) => handleChangeStatus(request.id, e)}>
                            {request.status === 'proses' ? (
                              <option value="proses" selected={request.status === 'proses'}>Proses</option>
                            ) : ""}
                            {request.status === 'penimbangan' || request.status === 'proses' ? (
                              <option value="penimbangan" selected={request.status === 'penimbangan'}>Penimbangan</option>
                            ) : ""}
                            {request.status === 'proses' || request.status === 'penimbangan' || request.status === 'pencucian' ? (
                              <option value="pencucian" selected={request.status === 'pencucian'}>Pencucian</option>
                            ) : ""}
                            {request.status === 'proses' || request.status === 'penimbangan' || request.status === 'pencucian' || request.status === 'pengeringan' ? (
                              <option value="pengeringan" selected={request.status === 'pengeringan'}>Pengeringan</option>
                            ) : ""}
                            {request.status === 'proses' || request.status === 'penimbangan' || request.status === 'pencucian' || request.status === 'pengeringan' || request.status === 'pengemasan' ?  (
                              <option value="pengemasan" selected={request.status === 'pengemasan'}>Pengemasan</option>
                            ) : ""}
                            <option value="selesai" selected={request.status === 'selesai'}>Selesai</option>
                          </select>
                        )}
                  </td>

                    <td>
                      <button className='btn btn-danger me-3' onClick={() => handleDelete(request.id)}><i className="bi bi-trash"></i></button>
                      <button className='btn btn-warning me-3' onClick={() => {changePageToForm("edit",request.id)}}><i className="bi bi-pencil"></i></button>
                      <button className='btn btn-secondary'><i className="bi bi-ticket-detailed" onClick={() => {changePageToDetail(request.id)}}></i></button>
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
