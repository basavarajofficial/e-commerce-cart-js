let price = document.getElementById("price");

function fetchData() {
  let printData = document.querySelector("#main");

  fetch("products.json")
    .then((data) => data.json())
    .then((res) => {
      const data = res.Products;
      console.log(data);
      localStorage.setItem("products", JSON.stringify(data));
      let card = "";
      data.forEach((item) => {
        card += `<div class="product">
      <div>
        <img src=${item.image} alt="mm" width="200" height="200" />
      </div>
 
      <div>
        <p>ratings ${item.ratings}</p>
        <h3>${item.name}</h3>
        <p>${item.price}</p>
      </div>
  
        <button class="btn" onclick=(addToCart(${item.id}))>Add to Cart</button>
      </div>`;
      });
      printData.innerHTML = card;
    });
}
fetchData();

let addToCart = (id) => {
  const prods = JSON.parse(localStorage.getItem("products"));
  // console.log("prods",prods);
  let index = id - 1;
  let eachItem = prods[index];
  let cartStore = localStorage.getItem("cartStore");
  let cartObj = "";

  if (cartStore == null) {
    cartObj = [];
    cartObj.push(eachItem);
  } else { 
    cartObj = JSON.parse(cartStore);
    cartObj.forEach((item, i) => { 
      if (item.id === id) {
        eachItem = null;
        item.qty++;
        if (item.qty > 1) {
          alert(`Quantity of this product in your cart is now ${item.qty} `);
        }
      }
    });
    if (eachItem != null) {
      cartObj.push(eachItem);
      alert("Item added to cart successfully")
    }
  }
  localStorage.setItem("cartStore", JSON.stringify(cartObj));
}; 

function showCart() {
  let cartData = localStorage.getItem("cartStore");

  if (cartData == null) {
    cartObj = [];
  } else {
    cartObj = JSON.parse(cartData);
  }
  console.log(cartObj.length);

  let showCard = "";
  let TotalPrice = 0;
  cartObj.forEach((item, i) => {
    if (cartObj.length != 0) {
      let tPrice = parseInt(item.price * item.qty);
      TotalPrice += tPrice;
      console.log(TotalPrice);
    }

    showCard += `
   <div class="product">
    <div>
      <img src=${item.image} alt="mm" width="200" height="200" />
    </div>
 
  <div>
    <p>ratings ${item.ratings}</p>
    <h3>${item.name}</h3>
    <p>${item.price}</p>
  </div>
  <div class="quantity">
  <span onclick=(minus(${item.id}))>-</span>${item.qty}<span onclick=(plus(${item.id}))>+</span>
  </div>
  <button id="${i}" onclick=(removeItem(this.id))>Remove</button>
</div> `;
  });
  let cart = document.getElementById("mainCart");
  if (cartObj.length !== 0) {
    cart.innerHTML = showCard;
    price.innerHTML = `<h3>Total Price : Rs ${TotalPrice}.00</h3>`;
  } else {
    cart.innerHTML = `<h1>Your Cart is Empty!</h1>`;
    price.innerHTML = "";
  }
}
showCart();

let removeItem = (index) => {
  let CartItems = JSON.parse(localStorage.getItem("cartStore"));

  CartItems.splice(index, 1);
  localStorage.setItem("cartStore", JSON.stringify(CartItems));

  showCart();
};

function minus(id) {
  let CartItems = localStorage.getItem("cartStore");
  let qtyObj = "";
  if (CartItems == null) {
    qtyObj = [];
  } else {
    qtyObj = JSON.parse(CartItems);
  }
  qtyObj.forEach((item) => {
    if (item.id === id) {
      if (item.qty <= 1) { 
        return alert("not possible");
      }
      return [(item.qty = item.qty - 1), { ...item }];
    }
  });
  localStorage.setItem("cartStore", JSON.stringify(qtyObj));
  // window.location.reload();
  showCart();
}

function plus(id) {
  let CartItems = localStorage.getItem("cartStore");
  let qtyObj = "";
  if (CartItems == null) {
    qtyObj = [];
  } else {
    qtyObj = JSON.parse(CartItems);
  }
  qtyObj.forEach((item) => {
    if (item.id === id) {
      return [(item.qty = item.qty + 1), { ...item }];
    }
  });
  localStorage.setItem("cartStore", JSON.stringify(qtyObj));

  showCart();
}
