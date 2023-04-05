import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import About from './Components/About/About'
import Home from './Components/Home/Home'
import Login from './Components/LogIn/SignUp/Login'
import SignUp from './Components/LogIn/SignUp/SignUp'
import OrderReview from './Components/Order-Review/OrderReview'
import Shop from './Components/Shop/Shop'
import './index.css'
import { getData } from './utilities/ManageDataInLocalStorage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/products',
        element: <Shop />,
        loader: () => fetch('products.json')
      },
      {
        path: 'order-review',
        element: <OrderReview />,
        loader: () => getData()
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/signUp',
        element: <SignUp />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
