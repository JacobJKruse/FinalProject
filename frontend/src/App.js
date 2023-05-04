
import logo from "./logo512.png";
import cartImage from "./addtocart.png";
import React, { useState, useEffect } from "react";
import { Categories } from "./Categories"
//import items from "./selected_products.json";
import checkmark from "./404-tick.png";

export const App = () => {
  console.log("Step 1: After reading file :");
  const [showMore, setShowMore] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showPurchase, setshowPurchase] = useState(false);
  //const [ProductsCategory, setProductsCategory] = useState(items);
  const [ProductsCategory, setProductsCategory] = useState([]);
  const [query, setQuery] = useState('');
  const [state, setstate] = useState({
    query: '',
    list: []
  })

  function getAllProducts() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProductsCategory(data);
      });
  }
  useEffect(() => {
    getAllProducts();
  }, []);





  const items = ProductsCategory.map((el) => (
    <div key={el._id}>
      <img src={el.IMAGE_LINK} width={30} /> <br />
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
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;

  }
  function handleShowHideCheckout() {
    if (cart.length > 0) {
      setShowCart(!showCart);
    } else { window.alert("No items in cart"); }
  }
  function handleshowPurchase() {
    if (cart.length > 0) {
      setShowCart(!showCart);
    } else { window.alert("No items in cart"); }
  }
  function handleShowHideCart() {
    if ((cart.length > 0) || showMore) {
      setShowMore(!showMore);
    } else { window.alert("No items in cart"); }
  }
  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
    }
    setCartTotal(Math.round(totalVal * 100) / 100
    );
  };

  const addToCart = (el) => {
    setCart([...cart, el]);

  };

  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  };




  const cartItems = cart.map((el) => (

    <div key={el.id}>
      <img class="img-fluid" src={el.image} width={30} />
      {el.title}
      ${el.price}
      <div class="col">
        ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
      </div>
    </div>
  ));


  const render_products = (ProductsCategory) => {

    return <div className='category-section fixed'>


      {console.log("Step 3 : in render_products ")}
      <div class="grid grid-rows-1 grid-flow-col gap-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length}) </h2>
        <button type="button" class="btn" variant="light" onClick={() => handleShowHideCart()}> Cart<img
          alt="cart Image"
          src={cartImage}
          className=" inline pr-800 w-5 h-5 "
        /></button>

      </div>
      <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10" style={{ maxHeight: '650px', overflowY: 'scroll' }}>
        {/* Loop Products */}
        {ProductsCategory.map((el, index) => (

          <div>
            <div key={index} className="group relative shadow-lg" >
              <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-visible group-hover:opacity-75 lg:h-60 lg:aspect-none">

                <img
                  alt="Product Image"
                  src={el.IMAGE_LINK}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="flex justify-between p-2">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={el.IMAGE_LINK}>

                      <span style={{ fontSize: '12px', fontWeight: '600' }}>{el.PRODUCT_NAME}</span>

                    </a>
                    <p>Tag - {el.CATEGORY}</p>
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">Rating: {el.RATING}</p>
                  <p className="text-sm font-medium text-green-600 text-left">${el.PRICE}</p>
                  <button type="button" class="btn" variant="light" onClick={() => addToCart(el)}>Add To Cart<img src={cartImage} class="cartImage inline"></img></button>
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
          <div class="col-2">
            <img class="img-fluid" src={el.IMAGE_LINK} />
          </div>
          <div class="col">
            <div class="row text-muted">{el.PRODUCT_NAME}</div>
            <div class="row">{el.CATEGORY}</div>
          </div>
          <div class="col">
            <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
            <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
          </div>
          <div class="col">
            ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
          </div>
        </div>
      </div>
    </div>
  ));
  const listItemsList = res.map((el) => (
    // PRODUCT
    <div>
      <div class="row border-top border-bottom" key={el._id}>
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
    console.log("Step 4 : in handleClick", tag);
    let filtered = items.filter(cat => cat.category === tag);
    setProductsCategory(filtered);
    //ProductsCategory = filtered;
    console.log("Step 5 : ", items.length, ProductsCategory.length);
  }


  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log("Step 6 : in handleChange, Target Value :", e.target.value, "  Query Value :", query);
    const results = items.filter(eachProduct => {
      if (e.target.value === "") return ProductsCategory;
      return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setProductsCategory(results);
  }

  const productPage = (<div>
    <div className="flex fixed flex-row w-26">
      {console.log("Step 2 : Return App :", items.length, items.length)}
      <div className="h-screen  bg-slate-800 p-3 xl:basis-1/5" style={{ minWidth: '65%' }}>
        <img className="w-20" src={logo} alt="Sunset in the mountains" />
        <div className="px-2 py-4">
          <h1 className="text-3xl mb-2 font-bold text-white"> Product Catalog App </h1>
          <p className="text-gray-700 text-white">
            by - <b style={{ color: 'red' }}>Jacob Kruse, Oscar Lenkaitis</b>
          </p>
          <div className="py-18">
            <input type="search" placeholder="Search" value={query} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <div className="py-5">
            {(Categories) ? <p className='text-white'>Tags : </p> : ''}
            {
              Categories.map(tag => <button key={tag} className="flex bg-amber-600 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2" onClick={() => { handleClick(tag) }}>{tag}</button>)
            }
          </div>
        </div>
      </div>
      <div className="ml-5  p-10 xl:basis-4/5">
        {console.log("Before render :", items.length, ProductsCategory.length)}
        {render_products(ProductsCategory)}
      </div>
    </div>
  </div>);

  const cartPage = (<div>
    STORE SE/ComS319
    <div class="card">
      <div class="row">
        {/* HERE, IT IS THE SHOPING CART */}
        <div class="col-md-8 cart">
          <div class="title">
            <div class="row">
              <div class="col">
                <h4>
                  <b>319 Shopping Cart</b>
                  <span class="inline"><button type="button" class="btn" variant="light" onClick={() => handleShowHideCart()}> Return to Shop<img
                    alt="cart Image"
                    src={cartImage}
                    className=" inline pr-800 w-5 h-5 "
                  /></button></span>
                </h4>
              </div>
              <div class="col align-self-center text-right text-muted">
                Products selected {cart.length}
              </div>
            </div>
          </div>
          <div>{listItems}</div>
        </div>
        <div class="float-end">
          <p class="mb-0 me-5 d-flex align-items-center">
            <span class="small text-muted me-2">Order total:</span>
            <span class="lead fw-normal">${cartTotal}</span>

          </p>
          <span class="inline"><button type="button" class="btn" variant="light" onClick={() => handleShowHideCheckout()}> Proceed to Checkout<img
            alt="cart Image"
            src={cartImage}
            className=" inline pr-800 w-5 h-5 "
          /></button></span>
        </div>
      </div>
    </div>
  </div>);

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
        <div>
          <div class="popup" id="popup">
            <h1>Thank You</h1>
            <img src={checkmark} ></img>
            <p>Shipping Information:<br></br>{paymentInfo.name}<br></br>{paymentInfo.address}<br></br>{paymentInfo.city} {paymentInfo.state} {paymentInfo.zip}</p>
            <button type="button" className='btn' id="showReceipt" onClick={() => displayReceipt()} >Show Receipt</button>
            <button type="button" className='btn' onClick={() => window.location.reload(false)} >Return to Store</button>
          </div>
          <div class="Receipt" id="Receipt">
            <h1>Receipt</h1>
            <p>Receipt:<br></br>Cost:{cartTotal}<br></br>{listItemsList}</p>
            <button type="button" className='btn' onClick={() => window.location.reload(false)} >Return to Store</button>
          </div>
          <div id="switch">
            <h1>Payment:</h1>
            <div>
              <span class="inline"><button type="button" class="btn" variant="light" onClick={() => handleShowHideCheckout()}> Return to cart<img
                alt="cart Image"
                src={cartImage}
                className=" inline pr-800 w-5 h-5 "
              /></button></span>
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




  //final return
  return (

    <div>
      <div> {(!showMore && !showCart) && productPage}</div>

      <div> {(showMore && !showCart) && cartPage}</div>
      <div>{(((showMore && showCart) && cart.length > 0) && !showPurchase) && displayCheckOutPage()}</div>


    </div>


  );

} //end App
export default App;
