import {
  BASE_URL,
  REQUESTS_BY_ID_FETCH_SUCCESS,
  REQUESTS_FETCH_SUCCESS,
  USERS_FETCH_SUCCESS,
  TRACKS_FETCH_SUCCESS,
} from "./actionType";
import Swal from 'sweetalert2';


// fuction to create data to reducer
export const requestsFetchSuccess = (payload) => {
  return {
    type: REQUESTS_FETCH_SUCCESS,
    payload: payload,
  };
};

export const requestByidFetchSuccess = (payload) => {
  return {
    type: REQUESTS_BY_ID_FETCH_SUCCESS,
    payload: payload,
  };
};

export const tracksFetchSuccess = (payload) => {
  return {
    type: TRACKS_FETCH_SUCCESS,
    payload: payload,
  };
};

export const usersFetchSuccess = (payload) => {
  return {
    type: USERS_FETCH_SUCCESS,
    payload: payload,
  };
};



// fucntions api to server

// this fucntion api get items from server
export const fetchRequests = () => {
  return async (dispatch) => {
    try {
      // api
      const response = await fetch(BASE_URL + "/api/requests", {
        headers: {
          access_token : localStorage.getItem('access_token') // Menggunakan token akses yang telah Anda miliki
        }
      });

      // contional if error
      if (!response.ok) throw new Error("upss something wrong");
      
      // change data to json
      let data = await response.json();

      // call other fuction
      dispatch(requestsFetchSuccess(data.data));
    } catch (error) {
      // log error
      console.log(error);
    }
  };
};


// this fucntion api get item by id from server
export const fetchRequestById = (id) => {
  return async (dispatch) => {
    try {

      // api
      const response = await fetch(BASE_URL + "/api/requests/" + id, {
        headers: {
          access_token : localStorage.getItem('access_token') // Menggunakan token akses yang telah Anda miliki
        }
      });
      
      // contional if error
      if (!response.ok) throw new Error("upss something wrong");
      
      // change data to json
      let data = await response.json();

      console.log(data);
      
      // call other fuction
      dispatch(requestByidFetchSuccess(data.data));
    } catch (error) {

      // log error
      console.log(error);
    }
  };
};


// this fucntion api register from server
export const registerHandler = (form) => {
  return async (dispatch) => {
    try {
      
      // api
      const response = await fetch(BASE_URL + "/api/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // change data response to json
      const data = await response.json();


      // contional if error
      if (!response.ok) throw new Error(data.message);

      // sweet alert
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'register successfully',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {

      // sweet alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });

      // dispatch error
      dispatch(error);
    }
  };
};

export const addRequestHandler = (form) => {
  return async (dispatch) => {
    try {

      console.log(form);
      // api
      const response = await fetch(BASE_URL + "/api/requests", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token : localStorage.getItem('access_token')
        },
        body: JSON.stringify(form),
      });

      // change data response to json
      const data = await response.json();

      // contional if error
      if (!response.ok) throw new Error(data.message);

      // sweet alert
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "barang berhasil diproses",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // sweet alert error
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });

      // dispatch error
      dispatch(error);
    }
  };
};

export const deleteRequestHandler = (id) => {
  return async (dispatch) => {
    try {

      // api
      const response = await fetch(BASE_URL + "/api/requests/" + id, {
        method: "delete",
        headers: {
          access_token : localStorage.getItem('access_token')
        },
      });

      // change data response to json
      const data = await response.json();

      // contional if error
      if (!response.ok) throw new Error(data.message);

      // sweet alert
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "berhasil menghapus",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // sweet alert error
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });

      // dispatch error
      dispatch(error);
    }
  };
};


export const updateRequestHandler = (form) => {
  return async (dispatch) => {
    try {
      console.log(form);
      // api
      const response = await fetch(BASE_URL + "/api/requests", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token : localStorage.getItem('access_token')
        },
        body: JSON.stringify(form),
      });

      // change data response to json
      const data = await response.json();

      // contional if error
      if (!response.ok) throw new Error(data.message);

      // sweet alert
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "barang berhasil di update",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // sweet alert error
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });

      // dispatch error
      dispatch(error);
    }
  };
};


// this fucntion api login from server
export const loginHandler = (form) => {
  return async (dispatch) => {
    try {

      // api
      const response = await fetch(BASE_URL + "/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // change data response to json
      const data = await response.json();

      // contional if error
      if (!response.ok) throw new Error(data.message);


      // set localstore
      localStorage.setItem("access_token", data.data.access_token);

      // sweet alert
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "login successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // sweet alert error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });

      // dispatch error
      dispatch(error);
    }
  };
};


export const fetchTracks = (id) => {
  return async (dispatch) => {
    try {
      // api
      const response = await fetch(BASE_URL + "/api/tracks/" + id, {
        headers: {
          access_token : localStorage.getItem('access_token') // Menggunakan token akses yang telah Anda miliki
        }
      });

      // contional if error
      if (!response.ok) throw new Error("upss something wrong");
      
      // change data to json
      let data = await response.json();

      // call other fuction
      dispatch(tracksFetchSuccess(data.data));
    } catch (error) {
      // log error
      console.log(error);
    }
  };
};


export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      // api
      const response = await fetch(BASE_URL + "/api/users", {
        headers: {
          access_token : localStorage.getItem('access_token') // Menggunakan token akses yang telah Anda miliki
        }
      });

      // contional if error
      if (!response.ok) throw new Error("upss something wrong");
      
      // change data to json
      let data = await response.json();

      // call other fuction
      dispatch(usersFetchSuccess(data.data));
    } catch (error) {
      // log error
      console.log(error);
    }
  };
};
