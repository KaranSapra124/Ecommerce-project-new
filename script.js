// Asynchronous programming , 2 ways in javascript

// Promise , Async Await
// Code -> Successfully , Error
// Promise -> It doesnt matter whether your code will run successfully or wil get errors , I will give you a promising result.
// Promise -> Pending , Fulfilled , Rejected

// Usage -> Asynchronous ? -> database , third party data download

// let num = 22;
// const p1 = new Promise(function (res, rej) {
//   if (num % 2 == 0) {
//     res("Number is Even");
//   } else {
//     rej("Number is Odd!");
//   }
// });
// // --------------------------------------------------------------------->>>>>>>Promise()
// // |
// // |
// // <
// p1.then(function (data) {
//   //then will work if promise is resolved
//   console.log(data);
// }).catch(function (data) {
//   //catch will work if promise is rejected
//   console.log(data);
// });

// console.log("HELLO");

// let num = 22;
// const p1 = new Promise(function (res, rej) {
//   if (num % 2 == 0) {
//     res("Even");
//   } else {
//     rej("Odd");
//   }
// });

// p1.then(function (data) {
//   console.log(data);
// })
//   .catch(function (data) {
//     console.log(data);
//   })
//   .finally(function () {
//     console.log("I am final");
//   });

//Event Loop

// function executes , after doing the task , its scope from the call stack gets vanished

// API -> Application Programming Interface

// Dine In (Customer) -Request-> Waiter -Request-> Chef (In Process)
// Chef -Response-> Waiter -Response-> Dine In (Customer) (Request fulfilled)
const products = document.getElementById("products");
const individualProduct = document.getElementById("individualProduct");
const cartItems = document.getElementById("cartItems");
const similarProduct = document.getElementById("similarProduct");
const alertBox = document.getElementById("alertBox");
const priceSummary = document.getElementById("priceSummary");
const searchProduct = document.getElementById("searchProduct");
const selectedInp = document.getElementById("selectedInp");
let flag = false;
const id = new URLSearchParams(window.location.search);
const val = id.get("id");
let star = "⭐";
let productArr = [];
// console.log(val);
function getProducts(url) {
  fetch(url)
    .then(function (data) {
      return data.json(); //JSON -> Javascript Object Notation , light weight data format which is easy for machine to parse and store it and also easy for humans to read and write it.
    })
    .then(function (data) {
      // console.log(data,"DATA");
      productArr?.push(...data);
      displayProducts(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function getIndividualProduct(url) {
  fetch(url)
    .then(function (data) {
      return data.json(); //JSON -> Javascript Object Notation , light weight data format which is easy for machine to parse and store it and also easy for humans to read and write it.
    })
    .then(function (data) {
      console.log(data);
      displayIndividualProduct(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

const getProductsByCategory = (url) => {
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      displaySimilarProducts(data);
    });
};

searchProduct?.addEventListener("input", (e) => {
  const filterProduct = productArr.filter((elem) => {
    return elem.title.includes(e.target.value);
  });
  displayProducts(filterProduct);
});

selectedInp?.addEventListener("click", () => {
  const filterProduct = productArr.filter((elem) => {
    return elem.category == selectedInp.value;
  });
  console.log(filterProduct)
  displayProducts(filterProduct);
});

function displayProducts(arr) {
  products.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    products.innerHTML += `
     <a href="../productpage.html?id=${arr[i].id}">
     <div class="max-w-sm rounded overflow-hidden shadow-lg m-4 flex flex-col justify-center items-center">
     <img class="w-52" src="${arr[i].image}" alt="No Image">
     <div class="px-6 py-4">
       <div class="font-bold text-xl mb-2">${arr[i].title}</div>
       <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">${
         arr[i].category
       }</span>

       <p class="text-gray-700 text-base font-bold">₹${Math.round(
         arr[i].price * 80
       )}</p>
     </div>
   </div>

     </a>
    `;
  }
}

function displayIndividualProduct(obj) {
  getProductsByCategory(
    `https://fakestoreapi.com/products/category/${obj.category}`
  );
  individualProduct.innerHTML = `
  <div class="container  m-auto max-w-xl mt-8">
  <div class="max-w-sm  rounded overflow-hidden shadow-lg m-4">
      <img class="w-full" src="${obj.image}" alt="No Image">
      <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${obj.title}</div>
          <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-green-400">${
            obj.category
          }</span>
          <p class="text-gray-700 text-base font-bold">₹${Math.round(
            obj.price * 80
          )}</p>
          <p class="text-gray-700 text-base font-bold bg-green-200 border border-green-400 w-fit rounded p-1">${star.repeat(
            Math.round(obj.rating.rate)
          )}</p>
      </div>
      <div class="px-6 py-4">
      
          <button onclick="AddToCart('${obj.image}','${obj.title}',${
    obj.price
  },${
    obj.rating.rate
  })" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Add to Cart
          </button>
      </div>
  </div>
</div>

    `;
}

const displaySimilarProducts = (arr) => {
  // console.log(val); //string
  const filteredArr = arr.filter((elem) => {
    return elem.id !== +val; //[]
  });

  filteredArr.map((elem) => {
    console.log(elem.image);
    return (similarProduct.innerHTML += `
    <a href="../productpage.html?id=${elem.id}">
    <div class="shadow-xl hover:scale-110 hover:duration-1000 p-2  flex flex-col justify-center items-center bg-[#fff]">
    <img class="w-24" src='${elem.image}'/>
    <h4>${
      elem.title.length < 20 ? elem.title : elem.title.substring(0, 18) + "..."
    }</h4>
    <p class="text-gray-700 text-base font-bold">₹${Math.round(
      elem.price * 80
    )}</p>
    <p class="text-gray-700 text-base font-bold bg-green-200 border border-green-400 w-fit rounded p-1">${star.repeat(
      Math.round(elem.rating.rate)
    )}</p>

    </div>
    </a>
    `);
  });
};

const Hide = () => {
  alertBox.innerHTML = "";
};

// CART
const AddToCart = (img, title, price, rating) => {
  flag = true;
  if (flag !== false) {
    setTimeout(() => {
      Hide();
    }, 5000);
  }
  alertBox.innerHTML = `
  <div id="alert-3" class="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div class="ms-3 text-sm font-medium">
    Product Added To Cart!
  </div>
  <button type="button" onclick="Hide()" class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
    <span class="sr-only" >Close</span>
    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
  </button>
</div>`;
  let arr = [];
  const obj = {
    productImg: img,
    prodTitle: title,
    prodPrice: price,
    prodRating: rating,
  };
  // arr.push(obj); //bag [bag]
  if (localStorage.getItem("cart")) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.push(obj);
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    arr.push(obj);
    localStorage.setItem("cart", JSON.stringify(arr));
  }
};

const getCart = () => {
  let str = "⭐";
  const cartItem = JSON.parse(localStorage.getItem("cart"));
  // console.log(cartItem);
  let total = cartItem.reduce((acc, curr) => {
    return acc + Math.round(curr.prodPrice * 80);
  }, 0);
  let Discount = total >= 10000 ? Math.round((total * 10) / 100) : 0;
  cartItem.map((elem) => {
    return (cartItems.innerHTML += `<div class="w-52 ml-5 border rounded p-5 shadow-lg mb-2 h-80">
    <img class="w-[150px]" src=${elem.productImg} alt="No Img"/>
    <h3 class="text-xs" >${elem.prodTitle}</h3>
    <p>₹ ${Math.round(elem.prodPrice * 80)}</p>
    <h5>${str.repeat(Math.round(elem.prodRating))}</h5>
    
    </div>`);
  });
  priceSummary.innerHTML = `<div>
  <h1 class="text-gray-500 font-bold">Price Details</h1>
  <hr class="mt-2 mb-2"/>
  <div>
  <span>Price (${
    cartItem.length
  } items) <span class="ml-5">₹ ${total}</span></span>
  </div>
  <div>
  <span>Discount <span class="ml-16">₹ ${
    total >= 10000 ? Math.round((total * 10) / 100) : 0
  }</span></span>
  </div>
  <div>
  <span>Delivery Charges <span class="ml-5"> ${
    total >= 10000 ? "Free" : `₹ ${200}`
  }</span></span>
  </div>
  <div>
  <hr class="mt-5 mb-5"/>
  <span class="font-bold">Total Amount<span class="ml-5">₹ ${
    total - Discount
  }</span></span>
  </div>
  
  </div>`;
  // cartItem.reduce((acc, curr) => {
  //   return (priceSummary.innerHTML = `<div>${acc + curr.prodPrice}</div>`);
  // }, 0);
};

if (products !== undefined && products !== null) {
  getProducts("https://fakestoreapi.com/products");
}
if (individualProduct) {
  getIndividualProduct(`https://fakestoreapi.com/products/${val}`);
}

if (window.location.pathname.includes("/cart.html")) {
  getCart();
}
