
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';

// fuction for card component

function BodyItem({request}) {

  const navigate = useNavigate();

  function handleClick() {
    navigate("/requests/"+ request.id)
  }

    return <div className='shadow p-3 mb-5 bg-body rounded cardItem ms-2'>
             <div className="card" >
              <div className="card-body">
                <h5 className="card-title fw-bold">Card Order</h5>
                <pre>
                  Informasi order jasa laundry : <br></br>
                  berat pakaian = {request.scale} kg<br></br>
                  harga laundry = Rp. {request.price}<br></br>
                  Mulai laundry = {format(new Date(request.createdAt), 'dd/MM/yyyy HH:mm:ss')}<br></br>
                </pre>
                <p className="card-text fst-italic">status <span className={`btn ${request.status === 'proses' ? 'btn-secondary' : request.status === 'penjemputan' ? 'btn-primary' : request.status === 'selesai' ? 'btn-success' : request.status === 'penimbangan' ? 'btn-warning' : request.status === 'pencucian' ? 'btn-info' : request.status === 'pengeringan' ? 'btn-light' : request.status === 'pengemasan' ? 'btn-dark' : request.status === 'pembayaran' ? 'btn-danger' :'btn-secondary'} btn-sm`}> {request.status}</span>
                </p>
                <div className="row">
                  <div className="col-12 text-end">
                     <button href="#" className="btn btn-secondary" onClick={handleClick}>Detail Order</button>
                  </div>
                </div>
              </div>
            </div>
            </div> 
}


// define data from file parent homepage
BodyItem.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.number.isRequired, // Menentukan bahwa prop item.imgUrl harus berupa number dan wajib ada
    item: PropTypes.string.isRequired, // Menentukan bahwa prop item.imgUrl harus berupa string dan wajib ada
    scale: PropTypes.string.isRequired, // Menentukan bahwa prop item.imgUrl harus berupa string dan wajib ada
    price: PropTypes.number.isRequired, // Menentukan bahwa prop item.name harus berupa string dan wajib ada
    status: PropTypes.string.isRequired, // Menentukan bahwa prop item.name harus berupa number dan wajib ada
    createdAt: PropTypes.string.isRequired, // Menentukan bahwa prop item.name harus berupa number dan wajib ada
    // tambahkan prop lain yang diperlukan di sini
  }).isRequired,
};


export default BodyItem
