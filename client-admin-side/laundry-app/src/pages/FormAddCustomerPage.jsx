import {  useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addUserHandler } from '../store/actions/actionCreator';


// fuction for login
function FormAddCustomerPage() {
  // define fuction needed for action
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // state
  const [data, setData] = useState({
    username:"",
    phoneNumber:"",
  })


  // function fon handle change value from input form and execute every changing
  function handleChange(e) {
    // set variable usestatu data to input from
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }

  // function fon handle submit  form and execute every button submit clicking
  function handleSubmit(e) {
    e.preventDefault();

    

    // dispatch and call handler or other fucntion for query to server
    dispatch(addUserHandler(data))
      .then(() => {
        // move to router / if successfully
          navigate("/customer")
      })
      .catch(() => {
        // stay in this page
        navigate("/form-add-customer")
      })
  }

  return (
    <>
    <div className="container">
      <div className="row mt-5">
        <div className="col-4"></div>
        <div className="col-4">
        <h1 className='text-center fw-bold fst-italic'>Form Menambah Pelangan</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label fst-italic">Username</label>
            <input type="text" name='username' id='username' className="form-control shadow p-3 bg-body rounded" value={data.username} onChange={(e) => handleChange(e)}/>
          </div>

          <div className="mb-2">
            <label className="form-label fst-italic">No WhatApp</label>
            <input type="text" name='phoneNumber' id='phoneNumber' className="form-control shadow p-3 bg-body rounded" value={data.phoneNumber} onChange={(e) => handleChange(e)}/>
          </div>

         
          {/* button submit */}
          <button type="submit" className="btn btn-warning shadow my-3">Submit</button>

          {/* button to register if you dont hange account */}
        </form>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
   
    </>
  )
}

export default FormAddCustomerPage