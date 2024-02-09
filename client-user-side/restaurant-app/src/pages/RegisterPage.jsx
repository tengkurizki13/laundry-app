import { useState } from 'react'
import { registerHandler } from '../store/actions/actionCreator';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// fucntion for register
function RegisterPage() {
  // define fuction needed for action
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // states
  const [data, setData] = useState({
    username:"",
    email:"",
    password:"",
    phoneNumber:0,
    address:"",
  })

  // function fon handle change value from input form and execute every changing
  function handleChange(e) {
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }

  // fucntion to handle move to login page
  function changePage() {
    navigate("/login")
  }

  // function fon handle submit  form and execute every button submit clicking
  function handleSubmit(e) {
    e.preventDefault();
    // move to router / if successfully
    dispatch(registerHandler(data))
    .then(() => {
      // move to router / if successfully
        navigate("/login")
    })
    .catch(() => {
      // stay in this page
      navigate("/register")
    })
  }

  return (
    <>
    <div className="container">
      <div className="row mt-5">
        <div className="col-4"></div>
        <div className="col-4">
          <h1 className='text-center fw-bold fst-italic'>Register</h1>
          <form onSubmit={handleSubmit}>
            {/* username input */}
            <div className="mb-2">
            <label className="form-label fst-italic">your username</label>
            <input type="text" name='username' id='username' className="form-control shadow p-3 bg-body rounded" value={data.username} onChange={(e) => handleChange(e)}/>
            </div>
            {/* email input */}
            <div className="mb-2">
              <label className="form-label fst-italic">your email</label>
              <input type="email" name='email' id='email' className="form-control shadow p-3 bg-body rounded" value={data.email} onChange={(e) => handleChange(e)}/>
            </div>
            {/* pasword input */}
            <div className="mb-2">
              <label className="form-label fst-italic">your password</label>
              <input type="password" name='password' id='password' className="form-control shadow p-3 bg-body rounded" value={data.password} onChange={(e) => handleChange(e)}/>
            </div>
            {/* phone number input */}
            <div className="mb-2">
              <label className="form-label fst-italic">your phone number</label>
              <input type="text" name='phoneNumber' id='phoneNumber' className="form-control shadow p-3 bg-body rounded" value={data.phoneNumber} onChange={(e) => handleChange(e)}/>
            </div>
            {/* address input */}
            <div className="mb-2">
              <label className="form-label fst-italic">your address</label>
              <input type="text" name='address' id='address' className="form-control shadow p-3 bg-body rounded" value={data.address} onChange={(e) => handleChange(e)}/>
            </div>

            {/* button submit */}
            <button type="submit" className="btn btn-warning shadow my-3">Submit</button>

            {/* button to move login if you have account */}
            <div className="row">
                <div className="col-12 text-end fst-italic text-secondary">
                    <p >If you already have an account <span className='text-primary' onClick={changePage}>click here</span></p> 
                </div>
            </div>
          </form>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
   
    </>
  )
}

export default RegisterPage