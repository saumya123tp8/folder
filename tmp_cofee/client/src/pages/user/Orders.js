import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import Slider from "react-slick";
import "../../styles/orderstyle.css";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [slidesToShow, setSlidesToShow] = useState(4);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        setSlidesToShow(1);
      } else if (windowWidth >= 768 && windowWidth < 992) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // const orderMap1 = new Map();
  // const orderMap = new Map();
  // const productMap = new Map();
  // orders?.products?.forEach((ele) => {
  //   console.log("*");
  //   console.log(ele);
  //   console.log("*");
  //   if (productMap.has(ele._id)) {
  //   } else {
  //     productMap.set(ele._id, ele);
  //   }
  // });
  // orders?.products?.forEach((ele) => {
  //   if (orderMap1.has(ele._id)) {
  //     orderMap1.set(ele._id, orderMap1.get(ele._id) + 1);
  //   } else {
  //     orderMap1.set(ele._id, 1);
  //   }
  // });
  // orderMap1.forEach((value, key) => {
  //   console.log(key, value);
  //   const productu = productMap.get(key);
  //   orderMap.set(productu, value);
  // });
  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashbrd">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row container">
                    <Slider {...settings}>
                      {
                      o?.products?.map((p, i) => (
                        <div className="row m-1 p-1 card flex-row" key={p._id}>
                          <h6>{i+1}</h6>
                          <div className="col-md-20">
                            <img
                              src={`/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                              width="100px"
                              height={"110px"}
                            />
                          </div>
                          <div className="col-md-8">
                            <p>{p.name.substring(0, 7)}</p>
                            <p>{p.description.substring(0, 6)}</p>
                            <p>Price : {p.price}</p>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
