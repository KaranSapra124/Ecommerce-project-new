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

function getProducts(url) {
  fetch(url)
    .then(function (data) {
      return data.json(); //JSON -> Javascript Object Notation , light weight data format which is easy for machine to parse and store it and also easy for humans to read and write it.
    })
    .then(function (data) {
      displayProducts(data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function displayProducts(arr) {
  for (let i = 0; i < arr.length; i++) {
    products.innerHTML += `
      <div class="max-w-sm rounded overflow-hidden shadow-lg m-4 flex flex-col justify-center items-center">
        <img class="w-52" src="${arr[i].image}" alt="No Image">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${arr[i].title}</div>
          <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">${arr[i].category}</span>

          <p class="text-gray-700 text-base font-bold">₹${Math.round(arr[i].price*80)}</p>
        </div>
      </div>
    `;
  }
}

getProducts("https://fakestoreapi.com/products");
