import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
const navigate = useNavigate()
  function logoutHandler() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear()
        navigate("/login")
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
 
   
  }
  return (
    <>
      <nav
    className="navbar navbar-expand-lg bg-danger shadow-lg p-3 mb-5 bg-body rounded"
  >
    <div className="container-fluid">
      {/* <img src="@/assets/icons/logo.svg"   /> */}
      <span className="text-bold text-primery">Admin Restaurant App</span>
      <div className="collapse navbar-collapse ms-5" >
        <div className="ms-auto">
          <div className="navbar-nav " id="nav">
          <Link  to="/" className="nav-link active  text-bold">Items</Link>
          <Link  to="/categories" className="nav-link active  text-bold">Category</Link>
          <Link  to="/register" className="nav-link active  text-bold">Register</Link>
          <button  to="/logout" className="btn btn-danger" onClick={logoutHandler}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
    </>
  )
}

export default Navbar
