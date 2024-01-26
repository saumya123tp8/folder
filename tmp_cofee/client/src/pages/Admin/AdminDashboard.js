import React from 'react'
// import Layout from
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'
import '../../styles/dashbrd.css'
const AdminDashboard = () => {
  //destructure the user
  const [auth]=useAuth()
  return (
    // <div>AdminDashboard</div>
   <Layout>
      <div className='containe-fluid m-3 p-3 dashbrd'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu/>
          </div>
          <div className='col-md-9'>
            <div className='card w-70 p-3'>
              <h3>Admin Name : {auth?.user?.name}</h3>
              <h3>Admin Email : {auth?.user?.email}</h3>
              <h3>Admin Contact : {auth?.user?.contact}</h3>
              {/* <h1>{auth?.user?.name}</h1> */}
            </div>
            </div>
        </div>
      </div>
   </Layout>
  )
}

export default AdminDashboard