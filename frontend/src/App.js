
import logo from "./logo512.png";
import cartImage from "./addtocart.png";
import adminImage from "./icon-admin.png";
import React, { useState, useEffect } from "react";


//import items from "./selected_products.json";
import checkmark from "./404-tick.png";

export const App = () => {
  console.log("Step 1: After reading file :");
  const [showMore, setShowMore] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const [showPurchase, setshowPurchase] = useState(false);
  //const [ProductsCategory, setProductsCategory] = useState(items);
  const [ProductsCategory, setProductsCategory] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const [query, setQuery] = useState('');
  const [state, setstate] = useState('products');
  const [Categories, setCategory] = useState([]);
  function getAllProducts() {
    fetch("http://10.49.84.39:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProductsCategory(data);
      });
  }
  function getAllCategory() {
    fetch("http://10.49.84.39:4000/cat/tag")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setCategory(data);
      });
  }
  useEffect(() => {
    getAllProducts();
    getAllCategory();
  }, []);





  const items = ProductsCategory.map((el) => (
    <div key={el._id}>
      <img src={el.IMG_LINK} width={30} /> <br />
      Title: {el.PRODUCT_NAME} <br />
      Category: {el.CATEGORY} <br />
      Price: {el.PRICE} <br />
      Rate :{el.RATING} <br />
    </div>
  ));



  const [paymentInfo, setPaymentInfo] = useState({
    name: '',
    email: '',
    card: '',
    address: '',
    city: '',
    state: '',
    zip: 0
  });
  //cart var
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);


  //cart fumctions
  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem._id === id);
    return hmot.length;

  }

  function handleshowPurchase() {
    if (cart.length > 0) {
      setstate("cart");
    } else { window.alert("No items in cart"); }
  }

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].PRICE;
    }
    setCartTotal(Math.round(totalVal * 100) / 100
    );
  };

  const addToCart = (el) => {
    setCart([...cart, el]);

  };

  const removeFromCart = (el) => {
    const copy = cart.filter((cartItem) => cartItem._id !== el._id);
    setCart(copy);
  };




  const cartItem = cart.map((el) => (

    <div key={el._id}>
      <img class="img-fluid" src={el.IMG_LINK} width={30} />
      {el.PRODUCT_NAME}
      ${el.PRICE}
      <div class="col">
        ${el.PRICE} <span class="close">&#10005;</span>{howManyofThis(el._id)}
      </div>
    </div>
  ));


  const render_products = (ProductsCategory) => {
    
    return <div className='category-section filled'>
      {console.log("Step 3 : in render_products ")}

      <div className="m-0 p-3 mt-0 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-4 lg:grid-cols-4 xl:gap-x-10" style={{ maxHeight: '100%', overflowY: 'auto' }}>
        {/* Loop Products */}
        {ProductsCategory.map((el, index) => (

          <div>
            <div key={index} className="group relative shadow-lg" >
              <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-visible group-hover:opacity-75 lg:h-60 lg:aspect-none">

                <img
                  alt="Product Image"
                  src={el.IMG_LINK}
                  className="w-60 h-60 object-center object-contain  lg:w-96 lg:h-full"
                />
              </div>
              <div className="flex justify-between p-2">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={el.IMG_LINK}>
                    </a>
                    <h2 style={{ fontWeight: '600' }}>{el.PRODUCT_NAME}</h2>
                    <p>Tag - {el.CATEGORY}</p>
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">Rating: {el.RATING} %</p>
                  <p className="text-sm font-medium text-green-600 text-left">${el.PRICE}</p>
                  <button type="button" class=" p-5  ml-28 rounded-lg outline-black-500  border-2 hover:bg-slate-200" variant="light" onClick={() => addToCart(el)}>Add To Cart<img src={cartImage} class="cartImage inline"></img></button>
                </div>
                
              
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  }
  const res = [...new Set(cart)];
  const listItems = res.map((el) => (
    // PRODUCT
    <div>
      <div class="row border-top border-bottom" key={el._id}>
        <div class="row main align-items-center">
          <div class="mb-5 shadow-lg ">

            <img class="border-2 border-slate-500 mr-5" src={el.IMG_LINK} />
            <div>
              <div>
                <div class=" text-muted">{el.PRODUCT_NAME}</div>
                <div>${el.PRICE} <span class="close">&#10005;</span>{howManyofThis(el._id)}</div>
                <button type="button" class="border-2  border-bottom border-slate-500 mr-5 hover:bg-slate-200" variant="heavy" onClick={() => removeFromCart(el)} > Remove </button>{" "}
                <button type="button" variant="heavy" class="border-2 border-slate-500 px-3 hover:bg-slate-200" onClick={() => addToCart(el)}> + </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  ));
  const listItemsList = res.map((el) => (
    // PRODUCT
    <div class=" ">
      <div class=" row border-top border-bottom " key={el._id}>
        <div class="row main align-items-center">

          <div class="col">
            <div class="row text-muted">{el.PRODUCT_NAME}</div>
          </div>

          <div class="col">
            ${el.PRICE} <span class="close">&#10005;</span>{howManyofThis(el._id)}
          </div>
        </div>
      </div>
    </div>
  ));




  function handleClick(tag) {
    console.log(tag);
    fetch("http://10.49.84.39:4000/" + "tag/" + tag)
      .then((response) => response.json())
      .then((data) => {
        console.log("Show one product :", tag);
        console.log(data);
        setProductsCategory(data);
      });
  }


  const handleChange = (e) => {
    console.log("change" + e);
    console.log("http://10.49.84.39:4000/" + e.target.value);
    if (e.target.value == '') {
      setQuery('');
      getAllProducts();
    } else {
      setQuery(e.target.value);
      fetch("http://10.49.84.39:4000/" + e.target.value)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", e);
          console.log(data);
          setProductsCategory(data);
        });
    }
  }


  const newProductPage = () => {

    return (
      <div class="flex">
        <nav className="fixed z-10">
          <div className="w-screen  bg-slate-800 pt-2 pb-2 xl:basis-1/5 " style={{ minWidth: '65%' }}>
            <div className="flex justify-normal"><img className="w-56 " src={logo} alt="16-Bit Shop logo" />
              <input type="search" placeholder="Search" onChange={handleChange} className="mt-3  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700
dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
dark:focus:ring-blue-500 align-items: flex-end  dark:focus:border-blue-500" />
              <button type="button" className=" border-solid bg-white rounded-lg border-2 border-neutral-50 mx-20 px-5 hover:bg-slate-200" variant="light" onClick={() => handleshowPurchase()}> Cart<img
                alt="cart Image"
                src={cartImage}
                className=" inline pr-800 w-5 h-5 "
              />
              </button>
              <div>{cart.length > 0 && <p class="-translate-x-24  -translate-y-1 text-center  w-5 text-white bg-red-600 rounded-full">{cart.length}</p>}
              </div>
              <button type="button" className="border-solid bg-white rounded-lg border-2 border-neutral-50 mx-6 px-5 hover:bg-slate-200" variant="light" onClick={() => setstate('admin')}> admin<img
                alt="admin Image"
                src={adminImage}
                className=" inline pr-800 w-5 h-5 "
              /></button>

              <div class="dropdown">
                <button class="dropbtn">Tags</button>
                <div class="dropdown-content">
                  <ul> <a className="flex bg-amber-600 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2" onClick={() => { getAllProducts() }}>Clear</a></ul>

                  {
                    Categories.map(tag => <ul><a className="flex bg-grey rounded-full p-1 text-sm font-semibold text-gray-700 " onClick={() => { handleClick(tag) }}>{tag}</a></ul>)
                  }
                </div>
              </div>






              <div class="text-center">

              </div>
            </div>
          </div>
        </nav>
        <div className="w-full pt-24">
          {console.log("Before render :", items.length, ProductsCategory.length)}
          {render_products(ProductsCategory)}





        </div>



      </div>
    );
  }



  const newCartPage = () => {
    return (
      <div className=" ">
        <h1 class="text-center text-4xl bg-slate-100 rounded-lg w-screen ">CART</h1>

        <div class="max-w-sm mb-10 rounded overflow-hidden shadow-lg  m-auto pt-10 mt-10 border-2 col">
          <span class="border-2 p-2 mt-2 rounded-lg   grid place-items-center hover:bg-slate-200 ">
            <button type="button" variant="light" onClick={() => setstate("products")}> Return to Shop
              <img
                alt="cart Image"
                src={cartImage}
                className=" inline pr-800 w-5 h-5 "
              /></button></span>
          {cart.length >= 0 && <div>

            {listItems}</div>}
          {cart.length <= 0 && <div><h1>YOUR CART IS EMPTY</h1></div>}

          <div class="float-end">
            <p class="mb-0 me-5 d-flex align-items-center">
              <span class="text-lg text-muted me-2">Order total:</span>
              <span class="lead text-lg fw-normal">${cartTotal}</span>

            </p>
            <span class="inline"><button type="button" class="border-2 mb-5  mx-24 p-2 rounded-lg hover:bg-slate-200 " variant="light" onClick={() => setstate("checkout")}> Proceed to Checkout<img
              alt="cart Image"
              src={cartImage}
              className=" inline pr-800 w-5 h-5 "
            /></button></span>
          </div>
        </div>

      </div>
    );
  }



  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }
  let cardNumberFunctionality = (e) => {
    const inputCard = document.getElementById('inputCard');
    if (!inputCard || !inputCard.value) {
      return e.preventDefault() // stops modal from being shown
    } else {
      inputCard.value = inputCard.value.replace(/-/g, '')
      let newVal = ''
      for (var i = 0, nums = 0; i < inputCard.value.length; i++) {
        if (nums !== 0 && nums % 4 === 0) {
          newVal += '-'
        }
        newVal += inputCard.value[i]
        if (isNumeric(inputCard.value[i])) {
          nums++
        }
      }
      inputCard.value = newVal
    }
  }
  let showErrorMessage = () => {
    document.getElementById("submitErrorMessage").classList.remove("invisible");
    document.getElementById("submitErrorMessage").classList.add("visible");
  }
  let validate = () => {
    let val = true;
    let payInfo = {
      name: '',
      email: '',
      card: '',
      address: '',
      city: '',
      state: '',
      zip: 0
    };
    let name = document.getElementById('inputName');
    let email = document.getElementById('inputEmail');
    let card = document.getElementById('inputCard');
    let address1 = document.getElementById('inputAddress');
    let address2 = document.getElementById('inputAddress2');
    let city = document.getElementById('inputCity');
    let state = document.getElementById('inputState');
    let zip = document.getElementById('inputZip');

    if (!email.value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      email.setAttribute("class", "form-control is-invalid");
      val = false;
    }
    else {
      email.setAttribute("class", "form-control is-valid");
      payInfo.email = email.value
    }

    if (name.value.length === 0) {
      name.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      name.setAttribute("class", "form-control is-valid");
      payInfo.name = name.value
    }

    if (!card.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/)) {
      card.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      card.setAttribute("class", "form-control is-valid");
      payInfo.card = card.value
    }

    if (!(zip.value.length === 5) || !isNumeric(zip.value)) {
      zip.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      zip.setAttribute("class", "form-control is-valid");
      payInfo.zip = zip.value
    }

    if (address1.value.length === 0) {
      address1.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      address1.setAttribute("class", "form-control is-valid");
      payInfo.address = address1.value + address2.value;
    }

    if (city.value.length === 0) {
      city.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      city.setAttribute("class", "form-control is-valid");
      payInfo.city = city.value;
    }

    if (state.value.length === 0) {
      state.setAttribute("class", "form-control is-invalid")
      val = false
    }
    else {
      state.setAttribute("class", "form-control is-valid");
      payInfo.state = state.value;
    }

    console.log(payInfo);
    setPaymentInfo(payInfo);
    return val;
  }

  function displayPopup() {
    let popup = document.getElementById("popup");
    popup.classList.add("open-popup");
    let switch1 = document.getElementById("switch");
    switch1.classList.add("hide-switch");
  }

  function displayReceipt() {
    let popup = document.getElementById("Receipt");
    popup.classList.add("open-popup");
    let switch1 = document.getElementById("popup");
    switch1.classList.add("hide-switch");
  }

  const displayCheckOutPage = () => {

    return (
      <div >
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous"
        />
        <div>
          <div class="popup " id="popup">
            <h1>Thank You</h1>
            <img src={checkmark} ></img>
            <p>Shipping Information:<br></br>{paymentInfo.name}<br></br>{paymentInfo.address}<br></br>{paymentInfo.city} {paymentInfo.state} {paymentInfo.zip}</p>
            <button type="button" className='btn' id="showReceipt" onClick={() => displayReceipt()} >Show Receipt</button>
            <button type="button" className='btn' onClick={() => window.location.reload(false)} >Return to Store</button>
          </div>
          <div class="Receipt " id="Receipt">
            <h1>Receipt</h1>
            <p>Receipt:<br></br>Cost:{cartTotal}<br></br>{listItemsList}</p>
            <button type="button" className='btn' onClick={() => window.location.reload(false)} >Return to Store</button>
          </div>
          <div id="switch">
            <h1>Payment:</h1>
            <div>
              <div class="grid grid-cols-2 gap-4 place-content-center  m-5 ">
                <span class="border-2 text-center h-10 hover:bg-slate-100 "><button type="button" class=" " variant="light" onClick={() => setstate("cart")}> Return to cart<img
                  alt="cart Image"
                  src={cartImage}
                  className=" inline pr-800 w-5 h-5 "
                /></button></span>
                <span class="border-2 text-center hover:bg-slate-100 "><button type="button" class="  " variant="light" onClick={() => setstate("products")}> Return to Prodcuts<img
                  alt="cart Image"
                  src={cartImage}
                  className=" inline pr-800 w-5 h-5 "
                /></button></span>
              </div>
              <div className="row">
                <div className="col-2"></div>

                <div className="col-8">


                  <form className="row g-3 checkoutform z-0" id="checkout-form">

                    <div className="col-md-6">
                      <label htmlFor="inputName" className="form-label">Full Name</label>
                      <input type="text" className="form-control" id="inputName" />
                      <div className="valid-feedback">
                        Looks good!
                      </div>
                      <div className="invalid-feedback">
                        Must be like, "John Doe"
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="inputEmail" className="form-label">Email</label>
                      <input type="email" className="form-control" id="inputEmail" />
                      <div className="valid-feedback">
                        Looks good!
                      </div>
                      <div className="invalid-feedback">
                        Must be like, "Johnsmith@email.com"
                      </div>
                    </div>

                    <div className="col-md-12">
                      <label htmlFor="inputCard" className="form-label">Card</label>
                      <div className="input-group mb-3">

                        <input type="text" id="inputCard" className="form-lable" placeholder="XXXX-XXXX-XXXX-XXXX"
                          aria-label="Username" aria-describedby="basic-addon1" onInput={e => cardNumberFunctionality(e)} />
                        <div className="valid-feedback">
                          Looks good!
                        </div>
                        <div className="invalid-feedback">
                          Must be like, "8888-8888-8888-8888"
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="inputAddress" className="form-label">Address</label>
                      <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                      <div className="valid-feedback">
                        Looks good!
                      </div>
                      <div className="invalid-feedback">
                        Must have value
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="inputAddress2" className="form-label">Address 2</label>
                      <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputCity" className="form-label">City</label>
                      <input type="text" className="form-control" id="inputCity" />
                      <div className="valid-feedback">
                        Looks good!
                      </div>
                      <div className="invalid-feedback">
                        Must have value
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="inputState" className="form-label">State</label>
                      <input type="text" className="form-control" id="inputState" />
                      <div className="valid-feedback">
                        Looks good!
                      </div>
                      <div className="invalid-feedback">
                        Must have value
                      </div>
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="inputZip" className="form-label">Zip</label>
                      <input type="text" className="form-control" id="inputZip" />
                      <div className="valid-feedback">
                        Looks good!
                      </div>
                      <div className="invalid-feedback">
                        Must be a 5 digit number
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className='text-center'>
              <button type='button' className='btn btn-danger m-3' onClick={e => { validate() ? displayPopup() : showErrorMessage() }}>Order</button>
              <div id='submitErrorMessage' className='invisible text-danger'>Please review your information,there is somthing incorrect.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);

  const [viewer2, setViewer2] = useState(false);
  const [viewer4, setViewer4] = useState(false);
  const [viewer5, setViewer5] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [index, setIndex] = useState(0);







  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    PRODUCT_NAME: "No Product Name",
    PRICE: 0.0,
    PRODUCT_DESC: "No Description",
    CATEGORY: "No Category",
    PRODUCT_RELEASE_DATE: 0,
    IMG_LINK: "http://127.0.0.1:4000/images/noImage.jpg",
    RATING: 0.0,
  });
  const [defaultaddNewProduct, defaultsetAddNewProduct] = useState({
    _id: 0,
    PRODUCT_NAME: "No Product Name",
    PRICE: 0.0,
    PRODUCT_DESC: "No Description",
    CATEGORY: "No Category",
    PRODUCT_RELEASE_DATE: 0,
    IMG_LINK: "http://127.0.0.1:4000/images/noImage.jpg",
    RATING: 0.0,
  });


  function handleAdminChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      if (value === "") {
        setAddNewProduct({ ...addNewProduct, _id: defaultaddNewProduct._id });
      } else {
        setAddNewProduct({ ...addNewProduct, _id: value });
      }
    } else if (evt.target.name === "PRODUCT_NAME") {
      if (value === "") {
        setAddNewProduct({ ...addNewProduct, PRODUCT_NAME: defaultaddNewProduct.PRODUCT_NAME });
      } else {
        setAddNewProduct({ ...addNewProduct, PRODUCT_NAME: value });
      }
    } else if (evt.target.name === "PRICE") {
      if (value === "") {
        setAddNewProduct({ ...addNewProduct, PRICE: defaultaddNewProduct.PRICE });
      } else {
        setAddNewProduct({ ...addNewProduct, PRICE: value });
      }
    } else if (evt.target.name === "PRODUCT_DESC") {
      if (value === "") {
        setAddNewProduct({ ...addNewProduct, PRODUCT_DESC: defaultaddNewProduct.PRODUCT_DESC });
      } else {
        setAddNewProduct({ ...addNewProduct, PRODUCT_DESC: value });
      }
    } else if (evt.target.name === "CATEGORY") {
      if (value === "") {
        setAddNewProduct({ ...addNewProduct, CATEGORY: defaultaddNewProduct.CATEGORY });
      } else {
        if (!Categories.includes(value)) {

          Categories.push(value);

        }
        setAddNewProduct({ ...addNewProduct, CATEGORY: value });
      }
    } else if (evt.target.name === "IMG_LINK") {
      const temp = value;
      if (value === "") {
        setAddNewProduct({ ...addNewProduct, IMG_LINK: defaultaddNewProduct.IMG_LINK });
      } else {
        setAddNewProduct({ ...addNewProduct, IMG_LINK: temp });
      }
    } else if (evt.target.name === "RATING") {
      if (value === "") {
        setAddNewProduct({ ...addNewProduct, RATING: defaultaddNewProduct.RATING });
      } else {
        setAddNewProduct({ ...addNewProduct, RATING: value });
      }
    }
    else if (evt.target.name === "PRODUCT_RELEASE_DATE") {
      if (value === "") {
        setAddNewProduct({ ...addNewProduct, PRODUCT_RELEASE_DATE: defaultaddNewProduct.PRODUCT_RELEASE_DATE });
      }
      else {
        setAddNewProduct({ ...addNewProduct, PRODUCT_RELEASE_DATE: value });
      }
    }
  }

  function handleOnAdminSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://10.49.84.39:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }

  useEffect(() => {
    getAllProducts();
  }, [checked4]);

  function getOneByOneProductNext() {
    if (ProductsCategory.length > 0) {
      if (index === ProductsCategory.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (ProductsCategory.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function getOneByOneProductPrev() {
    if (ProductsCategory.length > 0) {
      if (index === 0) setIndex(ProductsCategory.length - 1);
      else setIndex(index - 1);
      if (ProductsCategory.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://10.49.84.39:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    if (ProductsCategory.length - 2 > 0) {
      setIndex(ProductsCategory.length - 2);
    } else {
      setIndex(ProductsCategory.length - 1);
    }
    setChecked4(!checked4);
  }


  function updateOneProduct(e) {
    e.preventDefault();
    //console.log(e.target.value);
    fetch("http://10.49.84.39:4000/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update product completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }
  const [updateProduct, setUpdateProduct] = useState({
    _id: 0,
    IMG_LINK: "http://127.0.0.1:4000/images/noImage.jpg",
    PRICE: 0,
    PRODUCT_DESC: "No Updated Description",
    PRODUCT_NAME: "No Updated Product Name",
    PRODUCT_RELEASE_DATE: 0,
    RATING: 0,

  });

  function updateChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setUpdateProduct({ ...updateProduct, _id: value });
    }
    else if (evt.target.name === "price") {

      setUpdateProduct({ ...updateProduct, PRICE: value });

    }
    else if (evt.target.name === "description") {
      setUpdateProduct({ ...updateProduct, PRODUCT_DESC: value });
    }
    else if (evt.target.name === "image") {
      setUpdateProduct({ ...updateProduct, IMG_LINK: value });
    }
    else if (evt.target.name === "rating") {
      setUpdateProduct({ ...updateProduct, RATING: value });
    }
    else if (evt.target.name === "name") {
      setUpdateProduct({ ...updateProduct, PRODUCT_NAME: value });
    }
    else if (evt.target.name === "date") {
      setUpdateProduct({ ...updateProduct, PRODUCT_RELEASE_DATE: value });
    }
  }
  const showAllItems = ProductsCategory.map((el) => (
    <div key={el._id}>
      <img src={el.IMG_LINK} width={30} /> <br />
      Title: {el.PRODUCT_NAME} <br />
      Category: {el.CATEGORY} <br />
      Price: {el.PRICE} <br />
      Rate :{el.RATING} <br />
    </div>
  ));

  const displayAdminPage = () => {
    return (
      <div className="bg-emerald-200">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossorigin="anonymous"
        />
        <h1>Admin Page</h1>
        <button type="button" className=" w-20 h-10 rounded-full mx-2 bg-emerald-400 hover:bg-sky-700 active:bg-black-700 focus:outline-none focus:ring focus:ring-black-300" variant="light" onClick={() => window.location.reload(false)}> Exit<img
          alt="admin Image"
          src={cartImage}
          className=" inline pr-800 w-5 h-5 "
        /></button>
        <h1>Display Product Information</h1>
        <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked5}
          onChange={(e) => setChecked5(!checked5)} />
        <button className=" w-20 h-10 rounded-full mx-2 bg-emerald-400 hover:bg-sky-700 active:bg-black-700 focus:outline-none focus:ring focus:ring-black-300" onClick={() => getOneByOneProductPrev()}>Prev</button>
        <button className=" w-20 h-10 rounded-full mx-2 bg-emerald-400 hover:bg-sky-700 active:bg-black-700 focus:outline-none focus:ring focus:ring-black-300" onClick={() => getOneByOneProductNext()}>Next</button>
        {checked5 && (
          <div key={ProductsCategory[index]._id}>
            <img class="h-1/6 w-1/6 mt-5" src={ProductsCategory[index].IMG_LINK} width={50} height={50} /> <br />
            Id:{ProductsCategory[index]._id} <br />
            Title: {ProductsCategory[index].PRODUCT_NAME} <br />
            Category: {ProductsCategory[index].CATEGORY} <br />
            Description: {ProductsCategory[index].PRODUCT_DESC} <br />
            Date: {ProductsCategory[index].PRODUCT_RELEASE_DATE} <br />
            Price: {ProductsCategory[index].PRICE} <br />
            Rate :{ProductsCategory[index].RATING}  <br />
          </div>
        )}
        <hr></hr>

        <div class=" ">
          <h1>Add a new product :</h1>
          <h3>All Boxes must be filled out</h3>
          <div key={addNewProduct._id}>
            <img class="h-1/6 w-1/6 mt-5" src={addNewProduct.IMG_LINK} width={50} height={50} /> <br />
            Id:{addNewProduct._id} <br />
            Title: {addNewProduct.PRODUCT_NAME} <br />
            Category: {addNewProduct.CATEGORY} <br />
            Description: {addNewProduct.PRODUCT_DESC} <br />
            Date: {addNewProduct.PRODUCT_RELEASE_DATE} <br />
            Price: {addNewProduct.PRICE} <br />
            Rate :{addNewProduct.RATING}  <br />
          </div>
          <form action="" className="  mx-5   gap-10 place-content-center  grid-col-1" >
            <input type="number" className="bg-emerald-100 w-50  place-content-center" placeholder="id?" name="_id" onChange={handleAdminChange} />


            <input type="text" placeholder="title?" className="bg-emerald-100 w-50  " name="PRODUCT_NAME" onChange={handleAdminChange} />
            <input type="number" placeholder="price?" className="bg-emerald-100 w-50 " name="PRICE" onChange={handleAdminChange} />
            <input type="text" placeholder="description?" className="bg-emerald-100 w-50 " name="PRODUCT_DESC" onChange={handleAdminChange} />
            <input type="text" placeholder="category?" className="bg-emerald-100 w-50 " name="CATEGORY" onChange={handleAdminChange} />
            <input type="text" placeholder="image?" className="bg-emerald-100 w-50 " name="IMG_LINK" onChange={handleAdminChange} />
            <input type="number" placeholder="rate?" className="bg-emerald-100 w-50 " name="RATING" onChange={handleAdminChange} />
            <input type="number" placeholder="release date year?" className="bg-emerald-100 w-50 " name="PRODUCT_RELEASE_DATE" onChange={handleAdminChange} />
          </form>
          <button type="submit" className=" place-content-center w-20 h-10 rounded-full mx-20 bg-emerald-400 hover:bg-sky-700 active:bg-black-700 focus:outline-none focus:ring focus:ring-black-300" onClick={handleOnAdminSubmit}>
            submit
          </button>
        </div>
        <hr></hr>

        <div class="mb-32 ps-20">
          <h3>Delete one product:</h3>

          <div>
            <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4}
              onChange={(e) => setChecked4(!checked4)} />
            <p className="">Check to Activate</p>
          </div>
          <button className=" w-20 h-10 rounded-full mx-2 bg-emerald-400 hover:bg-sky-700 active:bg-black-700 focus:outline-none focus:ring focus:ring-black-300" onClick={() => getOneByOneProductPrev()}>Prev</button>
          <button className=" w-20 h-10 rounded-full mx-2 bg-emerald-400 hover:bg-sky-700 active:bg-black-700 focus:outline-none focus:ring focus:ring-black-300" onClick={() => getOneByOneProductNext()}>Next</button>
          <button className=" w-20 h-10 rounded-full mx-2 bg-emerald-400 hover:bg-sky-700 active:bg-black-700 focus:outline-none focus:ring focus:ring-black-300" onClick={() => deleteOneProduct(ProductsCategory[index]._id)}>Delete</button>
          {checked4 && (
            <div key={ProductsCategory[index]._id}>
              <img class="h-1/6 w-1/6 mt-5" src={ProductsCategory[index].IMG_LINK} width={50} height={50} /> <br />
              Id:{ProductsCategory[index]._id} <br />
              Title: {ProductsCategory[index].PRODUCT_NAME} <br />
              Category: {ProductsCategory[index].CATEGORY} <br />
              Description: {ProductsCategory[index].PRODUCT_DESC} <br />
              Date: {ProductsCategory[index].PRODUCT_RELEASE_DATE} <br />
              Price: {ProductsCategory[index].PRICE} <br />
              Rate :{ProductsCategory[index].RATING}  <br />
            </div>
          )}
        </div>
        <hr></hr>
        <div class="mt-20">
          <h1>Update Product Price</h1>
          <h3>All Boxes must be filled out</h3>
          <button className=" w-20 h-10 rounded-full mx-2 bg-emerald-400 hover:bg-sky-700 active:bg-black-700 focus:outline-none focus:ring focus:ring-black-300" onClick={() => getOneByOneProductPrev()}>Prev</button>
          <button className=" w-20 h-10 rounded-full mx-2 bg-emerald-400 hover:bg-sky-700 active:bg-black-700 focus:outline-none focus:ring focus:ring-black-300" onClick={() => getOneByOneProductNext()}>Next</button>
          <form action="">
            <div>
              <p>ID:</p> <input type="number" name="_id" class="bg-emerald-100 w-50 " placeholder={ProductsCategory[index]._id} onChange={updateChange} /></div>
            <div>
              <p>Name:</p> <input type="text" name="name" class="bg-emerald-100 w-50  " placeholder={ProductsCategory[index].PRODUCT_NAME} onChange={updateChange} />

            </div>
            <div>
              <p>Price:</p>
              <input type="number" name="price" class="bg-emerald-100 w-50 " value={null} placeholder={ProductsCategory[index].PRICE} onChange={updateChange} />

            </div>
            <div>
              <p>Description:</p>
              <input type="text" name="description" class="bg-emerald-100 w-50 " placeholder={ProductsCategory[index].PRODUCT_DESC} onChange={updateChange} />

            </div>
            <div>
              <p>Date:</p>
              <input type="number" name="date" class="bg-emerald-100 w-50 " placeholder={ProductsCategory[index].PRODUCT_RELEASE_DATE} onChange={updateChange} />

            </div>
            <div>
              <p>Image Link:</p>
              <input type="text" name="image" class="bg-emerald-100 w-50 " placeholder={ProductsCategory[index].IMG_LINK} onChange={updateChange} />

            </div>
            <div>
              <p>Rating:</p>
              <input type="text" name="rating" class="bg-emerald-100 w-50 " placeholder={ProductsCategory[index].RATING} onChange={updateChange} />
            </div>
            <div>
              <button class=" w-20 h-10 rounded-full mx-2 bg-emerald-400 hover:bg-sky-700 active:bg-black-700 focus:outline-none focus:ring focus:ring-black-300" type="submit" onClick={updateOneProduct}>
                submit
              </button>
            </div>

          </form>
        </div>
      </div>
    );
  }


  //final return
  return (

    <div>

      <div> {state === "products" && newProductPage()}</div>
      <div>{state === "admin" && displayAdminPage()}</div>
      <div>
        {(state === "cart") && newCartPage()}</div>
      <div>{((state === "checkout" && cart.length > 0)) && displayCheckOutPage()}</div>


    </div>


  );

} //end App
export default App;
