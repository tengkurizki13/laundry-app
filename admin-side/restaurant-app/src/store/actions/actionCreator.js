import {
  BASE_URL,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORY_BY_ID_FETCH_SUCCESS,
  INGREDIENTS_FETCH_SUCCESS,
  ITEMS_BY_ID_FETCH_SUCCESS,
  ITEMS_FETCH_SUCCESS,
  LOGIN_SUCCESS,
} from "./actionType";

export const itemsFetchSuccess = (payload) => {
  return {
    type: ITEMS_FETCH_SUCCESS,
    payload: payload,
  };
};

export const itemByidFetchSuccess = (payload) => {
  return {
    type: ITEMS_BY_ID_FETCH_SUCCESS,
    payload: payload,
  };
};

export const categoriesFetchSuccess = (payload) => {
  return {
    type: CATEGORIES_FETCH_SUCCESS,
    payload: payload,
  };
};

export const categoriByidFetchSuccess = (payload) => {
  return {
    type: CATEGORY_BY_ID_FETCH_SUCCESS,
    payload: payload,
  };
};

export const ingredientsFetchSuccess = (payload) => {
  return {
    type: INGREDIENTS_FETCH_SUCCESS,
    payload: payload,
  };
};

export const registerHandler = (form) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/admin/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
      dispatch(error);
    }
  };
};

export const loginHandler = (form) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/admin/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      localStorage.setItem("access_token", data[0].access_token);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "login successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
      dispatch(error);
    }
  };
};

export const fetchItems = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/items", {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      const data = await response.json();
      if (!response.ok) throw data.message;
      dispatch(itemsFetchSuccess(data));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };
};

export const addNewItem = (form) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/items", {
        method: "post",
        headers: {
          access_token: localStorage.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      console.log(response);
      if (!response.ok) throw new Error(data.message);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
      dispatch(error);
    }
  };
};

export const deleteItem = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/items/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      const data = response.json();
      if (!response.ok) throw data.message;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };
};

export const fetchItemById = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/items/" + id, {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      const data = await response.json();
      if (!response.ok) throw data.message;
      dispatch(itemByidFetchSuccess(data));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };
};

export const updateItem = (id, form) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/items/" + id, {
        method: "put",
        headers: {
          access_token: localStorage.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/categories", {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      const data = await response.json();
      if (!response.ok) throw data.message;
      dispatch(categoriesFetchSuccess(data));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };
};

export const addNewCategory = (form) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/categories", {
        method: "post",
        headers: {
          access_token: localStorage.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "add category successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
      dispatch(error);
    }
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/categories/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });
      const data = response.json();
      if (!response.ok) throw data.message;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };
};

export const fetchCategoryById = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/categories/" + id, {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      const data = await response.json();
      if (!response.ok) throw data.message;
      dispatch(categoriByidFetchSuccess(data));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };
};

export const updateCategory = (id, form) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL + "/categories/" + id, {
        method: "put",
        headers: {
          access_token: localStorage.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };
};
