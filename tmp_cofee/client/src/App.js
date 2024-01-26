import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import Pagenotfound from './pages/Pagenotfound'
import Register from './pages/Auth/Register'
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login'
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/Routes/Private'
import ForgotPassword from './pages/Auth/ForgotPassword'
import AdminRoute from './components/Routes/AdminRoute'
import AdminDashboard from './pages/Admin/AdminDashboard'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
// import Users from './pages/Admin/Users'
import Orders from './pages/user/Orders'
import Profile from './pages/user/Profile'
import Products from './pages/Admin/Products'
import UpdateProduct from './pages/Admin/UpdateProduct'
import Search from './pages/Search'
import ProductDetails from './pages/ProductDetails'
import Categories from './pages/Categories'
import CategoryProduct from './pages/CategoryProduct'
import CartPage from './pages/CartPage'
import AdminOrders from './pages/Admin/AdminOrders'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./SliderStyles.css";
function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/product/:slug' element={<ProductDetails/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/category/:slug' element={<CategoryProduct/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
          {/* <Route path="user/orders" element={<Orders />} /> */}
          {/* <Route path="user/profile" element={<Profile />} /> */}
        </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          {/* <Route path="admin/users" element={<Users />} /> */}
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/products" element={<Products />} />
          {/* <Route path="user/orders" element={<Orders />} /> */}
          {/* <Route path="user/profile" element={<Profile />} /> */}
        </Route>
      
      <Route path='/about' element={<About/>}/>
      
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      {/* if any routes not work */}
      <Route path='*' element={<Pagenotfound/>}/>
     </Routes>
   </>
  );
}

export default App;


//4hrs
// import {Routes,Route} from 'react-router-dom'
// import HomePage from './pages/HomePage'
// import About from './pages/About'
// import Contact from './pages/Contact'
// import Policy from './pages/Policy'
// import Pagenotfound from './pages/Pagenotfound'
// import Register from './pages/Auth/Register'
// import 'react-toastify/dist/ReactToastify.css';
// import Login from './pages/Auth/Login'
// import Dashboard from './pages/user/Dashboard'
// import PrivateRoute from './components/Routes/Private'
// import ForgotPassword from './pages/Auth/ForgotPassword'
// function App() {
//   return (
//    <>
//      <Routes>
//       <Route path='/' element={<HomePage/>}/>
//       <Route path="/dashboard" element={<PrivateRoute />}>
//           <Route path="" element={<Dashboard />} />
//           {/* <Route path="user/orders" element={<Orders />} /> */}
//           {/* <Route path="user/profile" element={<Profile />} /> */}
//         </Route>
      
//       <Route path='/about' element={<About/>}/>
      
//       <Route path='/register' element={<Register/>}/>
//       <Route path='/login' element={<Login/>}/>
//       <Route path='/forgot-password' element={<ForgotPassword/>}/>
//       <Route path='/contact' element={<Contact/>}/>
//       <Route path='/policy' element={<Policy/>}/>
//       {/* if any routes not work */}
//       <Route path='*' element={<Pagenotfound/>}/>
//      </Routes>
//    </>
//   );
// }

// export default App;
