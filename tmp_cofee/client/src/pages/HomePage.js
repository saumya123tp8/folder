import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import Slider from "react-slick";
import "../styles/Homepage.css";
const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [buy, setBuy] = useState({});
  const [slidesToShow, setSlidesToShow] = useState(5);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        setSlidesToShow(2);
      } else if (windowWidth >= 768 && windowWidth < 992) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(6);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //tony + - button
  const increaseQuantity = (pid) => {
    setBuy((prevBuy) => ({
      ...prevBuy,
      [pid]: (prevBuy[pid] || 0) + 1,
    }));
  };

  const decreaseQuantity = (pid) => {
    // try {
    setBuy((prevBuy) => ({
      ...prevBuy,
      [pid]: Math.max((prevBuy[pid] || 0) - 1, 0),
    }));

    // } catch (error) {
    //   console.log(error);
    // }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-category`);
      // const { data } = await axios.get(
      //   `${process.env.REACT_APP_API}/api/v1/category/get-category`
      // );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      // const { data } = await axios.get(
      //   `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      // );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-count`);
      // const { data } = await axios.get(
      //   `${process.env.REACT_APP_API}/api/v1/product/product-count`
      // );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      // const { data } = await axios.get(
      //   `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      // );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"ALl Products - Best offers "}>
      <div className="row dashbrd">
        <Slider {...settings}>
          {products?.map((p) => (
            <img
              src={`/api/v1/product/product-photo/${p._id}`}
              className="card-img-top-slide"
              alt={p.name}
              // height="300px"
              // width={"350px"}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              onClick={() => navigate(`/product/${p.slug}`)}
            />
          ))}
        </Slider>
      </div>
      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-2 filters">
          <div className="d-flex flex-column">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="priceFilterDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter By Category
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="priceFilterDropdown"
              >
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </ul>
            </div>
          </div>

          <div className="d-flex flex-column">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="priceFilterDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter By Price
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="priceFilterDropdown"
              >
                {Prices?.map((p) => (
                  <li key={p._id}>
                    <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </Radio.Group>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="col-md-10 ">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  // height="300px"
                  // width={"350px"}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name.substring(0, 60)}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 80)}...
                  </p>
                  <div className="card-name-price">
                    {buy[p._id] >= 1 ? (
                      <div className="detailsBlock">
                        <button
                          onClick={() => {
                            decreaseQuantity(p._id);
                            let myCart = [...cart];
                            let index = myCart.findIndex(
                              (item) => item._id === p._id
                            );
                            myCart.splice(index, 1);
                            setCart(myCart);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(myCart)
                            );
                          }}
                        >
                          -
                        </button>
                        {/* <input readOnly type="number" value={buy} /> */}
                        <input readOnly type="number" value={buy[p._id] || 0} />

                        <button
                          //  onClick={increaseQuantity}
                          onClick={() => {
                            increaseQuantity(p._id);
                            // const qty = buy + 1;
                            // setBuy(qty);
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item Added to cart");
                          }}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-dark ms-1 mt-1"
                        onClick={() => {
                          increaseQuantity(p._id);
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to cart");
                        }}
                      >
                        ADD TO CART
                      </button>
                    )}
                    <button
                      className="btn btn-info ms-1 mt-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
