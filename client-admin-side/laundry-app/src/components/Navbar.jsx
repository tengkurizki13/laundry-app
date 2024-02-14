import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


function Navbar() {


  

const navigate = useNavigate();

function handleLogout(){
  Swal.fire({
    title: "Kamu yakin?",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ya, keluar!"
  }).then((result) => {
    if (result.isConfirmed) {
      navigate("/login")
      localStorage.clear()

      Swal.fire({
        title: "berhasil keluar!",
        icon: "success"
      });
    }
  });
 
}
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fst-italic text-white fs-1" href="#">
            Laundry
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ms-5">
            <div className="">
              <div className="navbar-nav" id="nav">
                <div className="me-3">
                  <Link className="fs-5 fw-bold text-decoration-none text-white" to={"/"}>
                    Order
                  </Link>
                </div>
                <div className="me-3">
                  <Link className="fs-5 fw-bold text-decoration-none text-white" to={"/customer"}>
                    Pelanggan
                  </Link>
                </div>
              </div>
            </div>
            {/* Menggunakan ms-auto untuk menggeser link ke kanan */}
            <div className="ms-auto">
             <button className="btn btn-danger" onClick={handleLogout}> <i className="bi bi-box-arrow-right"></i>  Keluar</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
