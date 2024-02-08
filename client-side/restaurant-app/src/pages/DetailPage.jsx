import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequestById } from '../store/actions/actionCreator';


// fuction for detail page
function DetailPage() {

  // define fuction needed for action
  const dispatch = useDispatch()

  // get id from http parameter
  let { id } = useParams();

  // states
  const {request} = useSelector(((state) => state.request))
  const[loading,setLoading] = useState(true)

  // function page reload first time and once
  useEffect(() => {
    // contional to cek id form params
    if(id) {
        dispatch(fetchRequestById(id))
        .then(() => {
          setLoading(false)
        })
      }
    },[])

    console.log(request);
 

    // contional if data not relode yet
    if (loading) {
      return <h1>memuat...</h1>
    }

   return  <section className="h-100 h-custom" style={{ backgroundColor: '#eee' }}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-8 col-xl-6">
          <div className="card border-top border-bottom border-3" style={{ borderColor: '#f37a27', borderWidth: '3px', borderStyle: 'solid' }}>
            <div className="card-body p-5">
  
              <p className="lead fw-bold mb-5" style={{ color: '#f37a27' }}>Purchase Reciept</p>
  
              <div className="row">
                <div className="col mb-3">
                  <p className="small text-muted mb-1">Date</p>
                  <p>10 April 2021</p>
                </div>
                <div className="col mb-3">
                  <p className="small text-muted mb-1">Order No.</p>
                  <p>012j1gvs356c</p>
                </div>
              </div>
  
              <div className="mx-n5 px-5 py-4" style={{ backgroundColor: "#f2f2f2" }}>
                <div className="row">
                  <div className="col-md-8 col-lg-9">
                    <p>BEATS Solo 3 Wireless Headphones</p>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <p>£299.99</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 col-lg-9">
                    <p className="mb-0">Shipping</p>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <p className="mb-0">£33.00</p>
                  </div>
                </div>
              </div>
  
              <div className="row my-4">
                <div className="col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                  <p className="lead fw-bold mb-0" style={{ color: "#f37a27" }}>£262.99</p>
                </div>
              </div>
  
              <p className="lead fw-bold mb-4 pb-2" style={{ color: "#f37a27" }}>Tracking Order</p>
  
              <div className="row">
                <div className="col-lg-12">
  
                  <div className="horizontal-timeline">
  
                    <ul className="list-inline items d-flex justify-content-between">
                      <li className="list-inline-item items-list">
                        <p className="py-1 px-2 rounded text-white" style={{ backgroundColor: "#f37a27" }}>Ordered</p>
                      </li>
                      <li className="list-inline-item items-list">
                        <p className="py-1 px-2 rounded text-white" style={{ backgroundColor: "#f37a27" }}>Shipped</p>
                      </li>
                      <li className="list-inline-item items-list">
                        <p className="py-1 px-2 rounded text-white" style={{ backgroundColor: "#f37a27" }}>On the way</p>
                      </li>
                      <li className="list-inline-item items-list text-end" style={{ marginRight: '8px' }}>
                        <p style={{ marginRight: '-8px' }}>Delivered</p>
                      </li>
                    </ul>
  
                  </div>
  
                </div>
              </div>
  
              <p className="mt-4 pt-2 mb-0">Want any help? <a href="#!" style={{ color: "#f37a27" }}>Please contact us</a></p>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
}

export default DetailPage
