// //   /// want to change it as unique so we add carMap
// //   const cartMap = new Map();
// //   cart?.forEach((ele) => {
// //     console.log(ele);
// //     if (cartMap.has(ele)) {
// //       cartMap.set(ele, cartMap.get(ele) + 1);
// //     } else {
// //       cartMap.set(ele, 1);
// //     }
// //   });

import React, { useState, useEffect, useRef } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import Slider from "react-slick";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const totalPriceAddtax = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      if (total < 200) {
        total = total * 1.02;
      } else {
        total = total * 1.05;
      }
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const totalPriceGrand = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });

      if (total > 0 && total < 200) {
        if (total < 200) {
          total = total * 1.02;
        } else {
          total = total * 1.05;
        }
        total = total + 50;
      } else {
        if (total < 200) {
          total = total * 1.02;
        } else {
          total = total * 1.05;
        }
      }
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const totalPriceAdddelivery = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      if (total > 0 && total < 200) {
        total = 50;
      } else {
        total = 0;
      }
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  /// want to change it as unique so we add carMap
  //// here i use three map because we want to store the product by
  // there id instead of whole object because it change the maps original structure as don in above code
  const cartMap1 = new Map();
  const cartMap = new Map();
  const productMap = new Map();
  cart?.forEach((ele) => {
    if (productMap.has(ele._id)) {
    } else {
      productMap.set(ele._id, ele);
    }
  });
  cart?.forEach((ele) => {
    if (cartMap1.has(ele._id)) {
      cartMap1.set(ele._id, cartMap1.get(ele._id) + 1);
    } else {
      cartMap1.set(ele._id, 1);
    }
  });
  cartMap1.forEach((value, key) => {
    console.log(key, value);
    const productu = productMap.get(key);
    cartMap.set(productu, value);
  });
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success(
        `1 item remove from your cart now yo have only ${
          cart.length - 1
        } products`
      );
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const pdfRef = useRef();
  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgdata = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfwidth = pdf.internal.pageSize.getWidth();
      const pdfheight = pdf.internal.pageSize.getHeight();
      const imgwidth = canvas.width;
      const imgheight = canvas.height;
      const ratio = Math.min(pdfwidth / imgwidth, pdfheight / imgheight);
      const imgx = (pdfwidth - imgwidth * ratio) / 2;
      const imgy = 30;
      pdf.addImage(
        imgdata,
        "PNG",
        imgx,
        imgy,
        imgwidth * ratio,
        imgheight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };
  let cnt = 1;
  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest Please Login to Order and Enjoy our Services"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        {cart?.length === 0 ? ( // Check if the cart is empty
          <div className="welcome-banner">
            <div className="welcom_poster"></div>
            {/* <p>
              {auth?.token
                ? "Start shopping now!"
                : "Please log in or sign up to start shopping!"}
            </p> */}
          </div>
        ) : (
          <div className="row container similar-products">
            <h4> Products in your cart ➡️</h4>
            <Slider {...settings}>
              <div className="card-2 m-2">
                <div className="card-body_visit"></div>
              </div>
              {[...cartMap].map(([p, i]) => (
                <div className="card-1 m-2" key={p._id}>
                  <h6>Quantity purchase : {i}</h6>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100%"
                    height={"13px"}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <p>{p.name.substring(0, 10)}...</p>
                      <p>Price : ₹ {p.price}</p>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 15)}...
                    </p>
                    <div className="remove">
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="card-2 m-2">
                <div className="card-body_thankyou"></div>
              </div>
            </Slider>
          </div>
        )}
        {/* </Slider> */}
        <div className="container mb-2">
          <div className="row">
            <div className="col-md-11 cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPriceGrand()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h5>Current Address :</h5>
                    <h6>{auth?.user?.address}</h6>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className=" row border p-2">
            <div className="invoice" ref={pdfRef}>
              <div className="row mb-4">
                <div className="col-12 text-center">
                  <h5>Invoice Bill</h5>
                </div>
              </div>
              <div className="row border-bottom border-top">
                <div className="col-1">Sr.</div>
                <div className="col-5">Name</div>
                <div className="col-2">Rate</div>
                <div className="col-2">Qty</div>
                <div className="col-1">Price</div>
              </div>
              {[...cartMap].map(([product, index]) => (
                <div className="row">
                  <div className="col-1">{cnt++}</div>
                  <div className="col-5">{product.name}</div>
                  <div className="col-2">{product.price}</div>
                  <div className="col-2">{index}</div>
                  <div className="col-1">{product.price * index}</div>
                </div>
                // cnt+=1;
              ))}
              <div className="row border-top">
                <div className="col-5">Total</div>
                <div className="col-2"></div>
                <div className="col-2"></div>
                <div className="col-1">{totalPrice()}</div>
              </div>
              <div className="row border-bottom border-top">
                <div className="col-5">Taxes</div>
                <div className="col-2"></div>
                <div className="col-2"></div>
                <div className="col-1">{totalPriceAddtax()}</div>
              </div>
              <div className="row border-bottom border-top">
                <div className="col-5">Delivery Services</div>
                <div className="col-2"></div>
                <div className="col-2"></div>
                <div className="col-1">{totalPriceAdddelivery()}</div>
              </div>
              <div className="row border-bottom border-top">
                <div className="col-5">Grand Total</div>
                <div className="col-2"></div>
                <div className="col-2"></div>
                <div className="col-1">{totalPriceGrand()}</div>
              </div>
            </div>
            <button
              className=" invoicebtn btn btn-outline-warning mt-2"
              onClick={downloadPdf}
            >
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
