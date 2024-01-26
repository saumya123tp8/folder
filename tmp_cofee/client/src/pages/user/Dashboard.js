import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import '../../styles/dashbrd.css'
import { useAuth } from '../../context/auth'
const Dashboard = () => {
  const [auth]=useAuth()
  return (
         <Layout>
    <div className='container-fluid m-3 p-3 dashbrd'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu/>
            </div>
            <div className='col-md-4'>
                <div className='card w-75 p-3'>
                 <h4>name : {auth?.user?.name}</h4>
                 <h4>email : {auth?.user?.email}</h4>
                 <h4>address : {auth?.user?.address}</h4>
                </div>
            </div>
            {/* <div className='col-md-5'>
                <h1>photo</h1>
            </div> */}
        </div>
    </div>
   </Layout>
      
  )
}

export default Dashboard