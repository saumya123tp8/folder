import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import '../../styles/dashbrd.css'
// import '../../styles/AuthStyles.css'
// import { ToastContainer, toast } from 'react-toastify';
import toast from "react-hot-toast";
import axios from "axios";
const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

//get user data
useEffect(()=>{
 const {email,name,phone,address}=auth?.user
 setAddress(address);
 setName(name);
 setEmail(email);
 setPhone(phone);
},[auth?.user])


  const handleSubmit = async (e) => {
    e.preventDefault();
    //  console.log(name,email,password,phone)
    try {
      const {data} = await axios.put(
        `/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      // const {data} = await axios.put(
      //   `${process.env.REACT_APP_API}/api/v1/auth/profile`,
      //   { name, email, password, phone, address }
      // );
      if(data?.error){
        toast.error(data.error)
      }else{
        setAuth({...auth,user:data?.updatedUser})
        let ls=localStorage.getItem('auth')
        ls=JSON.parse(ls);
        ls.user=data.updatedUser;
        localStorage.setItem("auth",JSON.stringify(ls));
        toast.success('profile updated successfully')
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", { duration: 2500 });
    }
  };

  return (
    <Layout>
      <div className="container-fluid  dashbrd">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 ">
            <h1 className="m-3">
              <div className="form-container p-3">
                <form onSubmit={handleSubmit}>
                  <h1>User Profile</h1>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      id="exampleInputName"
                      placeholder="Enter your name here"
                      
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter your email here"
                      
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="enter your password here"
                      
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      className="form-control"
                      id="exampleInputPhone1"
                      placeholder="enter your phone"
                      
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      className="form-control"
                      id="exampleInputAddress1"
                      placeholder="enter your address here"
                      
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Profile;
