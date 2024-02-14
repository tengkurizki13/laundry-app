import {
    createBrowserRouter,redirect
  } from "react-router-dom";
import App from "./App.jsx";
import HomeAdminPage from "./pages/HomeAdminPage.jsx";
import HomeOwnerPage from "./pages/HomeOwnerPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import FormAddPage from "./pages/FormAddPage.jsx";
import FormEditPage from "./pages/FormEditPage.jsx";
import CustomerPage from "./pages/CustomerPage.jsx";
import FormAddCustomerPage from "./pages/FormAddCustomerPage.jsx";
import FormEditCustomerPage from "./pages/FormEditCustomerPage.jsx";

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
      loader: async () => {
        // check token
        if (localStorage.access_token) {
          // rediret to home if have token
            return redirect("/")
        }else{
            return null
        }
      },
    },
    {
        element: <App />,
        loader: async () => {
          // check token
          if (!localStorage.access_token) {
            // rediretn to login
              return redirect("/login")
          }else{
              return null
          }
        },
        children:[
            {
                path:"/",
                element: <HomeAdminPage />,
                loader: async () => {
                  // check token
                  if (!localStorage.access_token) {
                    // rediretn to login
                      return redirect("/login")
                  }else{
                    if (localStorage.role === "owner") {
                      return redirect("/dashboard")
                    }else{
                      return null
                    }
                  }
                },
            },
            {
              path:"/dashboard",
              element: <HomeOwnerPage />,
              loader: async () => {
                // check token
                if (!localStorage.access_token) {
                  // rediretn to login

                
                    return redirect("/login")
                }else{
                  if (localStorage.role === "admin") {
                    return redirect("/")
                  }else{
                    return null
                  }
                }
              },
          },
            {
              path:"/customer",
              element: <CustomerPage />,
              loader: async () => {
                // check token
                if (!localStorage.access_token) {
                  // rediretn to login
                    return redirect("/login")
                }else{
                    return null
                }
              },
          },
            {
              path:"/requests/:id",
              element: <DetailPage />,
              loader: async () => {
                // check token
                if (!localStorage.access_token) {
                  // redirect to login
                    return redirect("/login")
                }else{
                    return null
                }
              },
            },
            {
              path:"/form-add",
              element: <FormAddPage />,
              loader: async () => {
                // check token
                if (!localStorage.access_token) {
                  // redirect to login
                    return redirect("/login")
                }else{
                    return null
                }
              },
            },
            {
              path:"/form-edit/:id",
              element: <FormEditPage />,
              loader: async () => {
                // check token
                if (!localStorage.access_token) {
                  // redirect to login
                    return redirect("/login")
                }else{
                    return null
                }
              },
            },
            {
              path:"/form-add-customer",
              element: <FormAddCustomerPage />,
              loader: async () => {
                // check token
                if (!localStorage.access_token) {
                  // redirect to login
                    return redirect("/login")
                }else{
                    return null
                }
              },
            },
            {
              path:"/form-edit-customer/:id",
              element: <FormEditCustomerPage />,
              loader: async () => {
                // check token
                if (!localStorage.access_token) {
                  // redirect to login
                    return redirect("/login")
                }else{
                    return null
                }
              },
            },
        ]
      },
  ]);


  export default router