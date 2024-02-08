import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginHandler } from '../store/actions/actionCreator';

function FormLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    email:"",
    password:"",
  })
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginHandler(form))
      .then(() => {
          navigate("/")
      })
      .catch(() => {
        navigate("/login")
      })
  }
  return (
    <>
    <div className="container">
      <div className="row mt-5">
        <div className="col-4"></div>
        <div className="col-4">
        <h1 className='text-center'>Login</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="email" className="form-label">your email</label>
          <input type="text" className="form-control" name='email' id="email" value={form.email} onChange={(e) => handleChange(e)}/>
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">your password</label>
          <input type="text" className="form-control" name='password' id="password" value={form.password} onChange={(e) => handleChange(e)}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
   
    </>
  )
}

export default FormLoginPage
