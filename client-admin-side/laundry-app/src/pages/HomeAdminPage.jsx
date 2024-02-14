
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
  const [filter, setFilter] = useState(''); // Tambahkan state untuk filter
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
    Swal.fire({
      title: "Kamu yakin Merubah status?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ya, rubah!"
    }).then((result) => {
      if (result.isConfirmed) {
        
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
        Swal.fire({
          title: "berhasil Membayar!",
          text: "Order Mu berhasil dibayar",
          icon: "success"
        });
      }
    });
}

function handleFilter(key) {
  const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : '';
  const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : '';
  
  setFilter(key)
  dispatch(fetchRequests(key, searchTerm, formattedStartDate, formattedEndDate)); // Menggunakan key filter dan searchTerm
}
function toggleModal() {
  setShowModal(!showModal);
}

function handleDateFilter() {
  const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : '';
  const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : '';
  dispatch(fetchRequests(filter, searchTerm, formattedStartDate, formattedEndDate));
  
}

function handleSearch(event) {
  const searchTerm = event.target.value;
  setSearchTerm(searchTerm);
}

function clearFilter() {
  dispatch(fetchRequests());
}

function handleSubmit(event) {
  event.preventDefault();
  const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : '';
  const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : '';

  console.log(filter,"inifilter",searchTerm);
  dispatch(fetchRequests(filter, searchTerm, formattedStartDate, formattedEndDate)); // Menggunakan filter dan searchTerm
}




  function handleCheckout(id){
    Swal.fire({
      title: "Kamu yakin?",
      text: "Kamu mau melakukan pembayaran",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ya, bayar!"
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          status : "selesai"
         }
        
    dispatch(updateStatusRequestHandler(data,id))
    .then(() => {
      dispatch(fetchRequests())
      .then(() => {
        setLoading(false)
      })
    })
        Swal.fire({
          title: "berhasil Membayar!",
          text: "Order Mu berhasil dibayar",
          icon: "success"
        });
      }
    });
   
  }

  function handleDelete(id){
    Swal.fire({
      title: "kamu yakin Mau hapus?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ya, hapus"
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
          title: "tehapus!",
          text: "data sudah terhapus",
          icon: "success"
        });
      }
    });
   
  }

  console.log(requests,"ori");

  // contional if data not relode yet
  if (loading) {
    return <h1>memuat...</h1>
  }

    // contional if data not relode yet

  return (
    <>
      <div className="row mt-5">
            <div className="col-10 d-flex">
              <form className="d-flex me-3" onSubmit={handleSubmit}>
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={handleSearch}/>
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
              <div className="dropdown mx-3">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Filter Data
                    </button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item" onClick={() => handleFilter("proses")}>sedang proses</button></li>
                      <li><button className="dropdown-item" onClick={() => handleFilter("penimbangan")}>sedang Penimbangan</button></li>
                      <li><button className="dropdown-item" onClick={() => handleFilter("pencucian")}>sedang Pencucian</button></li>
                      <li><button className="dropdown-item" onClick={() => handleFilter("pengeringan")}>sedang Pengeringan</button></li>
                      <li><button className="dropdown-item" onClick={() => handleFilter("pengemasan")}>sedang Pengemasan</button></li>
                      <li><button className="dropdown-item" onClick={() => handleFilter("pembayaran")}>sedang Pembayaran</button></li>
                      <li><button className="dropdown-item" onClick={() => handleFilter("selesai")}>sudah selesai</button></li>
                    </ul>
              </div>
              <div className="me-3">
                <button className="btn btn-primary" onClick={toggleModal}>Filter by Date</button>
              </div>
              <div className="">
                <button className="btn btn-light" onClick={clearFilter}>Clear filter</button>
              </div>
            </div>
            <div className="col-2 text-end">
                   <button className="btn btn-success shadow" onClick={() => {changePageToForm("add")}} ><i className="bi bi-plus-circle"></i></button>
            </div>
      </div>
     
      <div className='mt-3'>
  {requests.length === 0 ?  
    <p className='text-center mt-5'>Data kosong</p> 
    : 
    <table className="table shadow">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Pelanggan</th>
          <th scope="col">Waktu</th>
          <th scope="col">Timbangan</th>
          <th scope="col">Harga</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request, i) => (
          <tr key={i}>
            <th scope="row">{i + 1}</th>
            <td>{request.User.username}</td>
            <td>{format(new Date(request.createdAt), 'dd/MM/yyyy HH:mm:ss')}</td>
            <td>{request.scale} Kg</td>
            <td>Rp. {request.price}</td>
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
                            {request.status === 'proses' || request.status === 'penimbangan' || request.status === 'pencucian' || request.status === 'pengeringan' || request.status === 'pengemasan' || request.status === 'pembayaran'?  (
                              <option value="pembayaran" selected={request.status === 'pembayaran'}>Pembayaran</option>
                            ) : ""}
                          </select>
                        )}
                  </td>
          
             
                  <td>
              {request.status === 'selesai' ? (
                  <button className='btn btn-success me-3'><i className="bi bi-check2-all"></i> Selesai</button>
                 ) : request.status === 'pembayaran' ? (
                      <button className='btn btn-primary me-3' onClick={() => {handleCheckout(request.id)}}><i className="bi bi-wallet2"></i> checkout</button>
                    ) : 
                              <>
                              <button className='btn btn-warning me-3' onClick={() => {changePageToForm("edit",request.id)}}><i className="bi bi-pencil"></i></button>
                              </>  
                            }
                            <button className='btn btn-secondary me-3' onClick={() => {changePageToDetail(request.id)}}><i className="bi bi-ticket-detailed" ></i></button>
                            <button className='btn btn-danger me-3' onClick={() => handleDelete(request.id)}><i className="bi bi-trash"></i></button>
                              </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  }
</div>

{showModal && (
  <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Filter by Date</h5>
          <button type="button" className="btn-close" onClick={toggleModal}></button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col">
              <label htmlFor="start-date" className="form-label">Start Date:</label>
              <input type="date" id="start-date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="col">
              <label htmlFor="end-date" className="form-label">End Date:</label>
              <input type="date" id="end-date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={toggleModal}>Close</button>
          <button type="button" className="btn btn-primary" onClick={handleDateFilter}>Apply</button>
        </div>
      </div>
    </div>
  </div>
)}

    </>
  )
}

export default HomePage
