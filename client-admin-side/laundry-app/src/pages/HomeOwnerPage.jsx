
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequestsOwner} from '../store/actions/actionCreator';
import { format } from 'date-fns';

// fuction for home page
function HomePage() {
   // define fuction needed for action
  const dispatch = useDispatch()
  

  // states
  const[loading,setLoading] = useState(true)
  const {requests} = useSelector(((state) => state.request))
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchRequestsOwner())
      .then(() => {
        setLoading(false)
      })
    },[])

    function clearFilter() {
      dispatch(fetchRequestsOwner());
    }

    function toggleModal() {
      setShowModal(!showModal);
    }

    function handleDateFilter() {
      const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : '';
      const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : '';
      dispatch(fetchRequestsOwner(formattedStartDate,formattedEndDate));
      
    }
    

  // contional if data not relode yet
  if (loading) {
    return <h1>memuat...</h1>
  }

    // contional if data not relode yet

  return (
    <>
    <div className="row mt-5">
            <div className="col-10 d-flex">
              <div className="me-3">
                <button className="btn btn-secondary" onClick={toggleModal}>Filter by Date</button>
              </div>
              <div className="">
                <button className="btn btn-light" onClick={clearFilter}>Clear filter</button>
              </div>
            </div>
      </div>
    <div className="d-flex flex-wrap mt-5">
            {requests.map((request,i) => (
                  <div className='shadow p-3 mb-5 bg-body rounded cardItem ms-2' key={i}>
                  <div className="card" >
                    <div className="card-body">
                      <h5 className="card-title fw-bold">Card {request.typeStatus}</h5>
                      <pre>
                        laporan : <br></br>
                        jumlah order = {request.jumlahOrder} Biji<br></br>
                        total pembayaran = Rp. {request.totalpembayaran}<br></br>
                        jumlah Timbangan = {request.jumlahTimbangan} kg<br></br>
                      </pre>
                   
                    </div>
                  </div>
                </div> 
            ))}
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
