import { Link } from "react-router-dom";

function Navbar() {
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
            <i className="bi bi-box-arrow-right"></i> 
              <Link className="fs-5 fw-bold text-decoration text-secondary" to={"/logout"}>
                 Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
