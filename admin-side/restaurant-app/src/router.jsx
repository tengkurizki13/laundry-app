import {
    createBrowserRouter, redirect,
  } from "react-router-dom";
import LoginPage from './pages/LoginPage.jsx';
import App from "./App.jsx";
import ItemPage from "./pages/ItemPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import FormItem from "./components/FormItem.jsx";
import FormCategory from "./components/FormCategory.jsx";

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
      loader: async () => {
        if (localStorage.access_token) {
            return redirect("/")
        }else{
            return null
        }
      },
    },
    {
        element: <App />,
        loader: async () => {
            if (!localStorage.access_token) {
                return redirect("/login")
            }else{
                return null
            }
          },
        children:[
            {
                path:"/",
                element: <ItemPage />
            },
            {
                path:"/categories",
                element: <CategoryPage />
            },
            {
                path:"/register",
                element: <RegisterPage />
            },
            {
                path:"/form-item",
                element: <FormItem />
            },
            {
                path:"/form-item/:id",
                element: <FormItem />
            },
            {
                path:"/form-category",
                element: <FormCategory />
            },
            {
                path:"/form-category/:id",
                element: <FormCategory />
            },
        ]
      },
  ]);


  export default router