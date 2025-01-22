var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var searchInput=document.getElementById("searchInput");
var btnAdd= document.getElementById("btnAdd");
var btnUpdate=document.getElementById("btnUpdate");

var products = [];

if (localStorage.getItem("product")) {
  products = JSON.parse(localStorage.getItem("product"));
  displayProduct();
}

function addProduct() {  
  var product = {
    pName: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
    imgSrc:`images/${productImage.files[0]?.name}`,  // ? is optional chaning
  };
  // console.log(product);
  products.push(product);
  localStorage.setItem("product", JSON.stringify(products));
  // console.log(products);
  clearInput();
  displayProduct();
}

function displayProduct() {
  var carton = ``;
  for (var i = 0; i < products.length; i++) {
    carton += `<div class="col-12 col-sm-12 col-md-4 col-lg-4 p-3">
                    <div class="product bg-light p-3 rounded ">
                        <div class="product-image">
                            <img src="${products[i].imgSrc}" alt="" >
                        </div>
                        <div class="product-body">
                            <h2 class="h3">Name: <span>${products[i].pName}</span></h2>
                            <h2 class="h3">price: <span>${products[i].price}</span></h2>
                            <h3 class="h4">Category: <span>${products[i].category}</span></h3>
                            <p class="lead"><span>Description:</span>${products[i].description}</p>
                            <div class="product-btns">
                                <button class="btn btn-outline-warning my-2" onclick="setFormToUpdate(${i})" >Update Product 🪶</button>
                                <button class="btn btn-outline-danger my-2" onclick="deleteproduct(${i})">Delete Product 🗑</button>
                            </div>
                        </div>
                    </div>
                </div>`;
  }
  // console.log(carton);
  document.getElementById("rowElements").innerHTML = carton;
}

function clearInput() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
  productImage.value = "";
}

function deleteproduct(index) {
  products.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(products));
  displayProduct(); // b3red el data b7d el mas7
}

var updateIndex; // global variable

function setFormToUpdate(index) {
  updateIndex = index;
  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
  productName.value = products[index].pName;
  productPrice.value = products[index].price;
  productCategory.value = products[index].category;
  productDescription.value = products[index].description;
}

function updateProduct(updateIndex) {
  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
  products[updateIndex].pName = productName.value;
  products[updateIndex].price = productPrice.value;
  products[updateIndex].category = productCategory.value;
  products[updateIndex].description = productDescription.value;
  displayProduct();
  localStorage.setItem("product", JSON.stringify(products));
}


function searchForproduct() {
  var term = searchInput.value;
  var cartona = ``;
  for (var i = 0; i < products.length; i++) {
    if (products[i].pName.toLowerCase().includes(term.toLowerCase())) {
      cartona += `<div class="col-12 col-sm-12 col-md-4 col-lg-4 p-3">
      <div class="product bg-light p-3 rounded ">
          <div class="product-image">
              <img src="${products[i].imgSrc}" alt="" >
          </div>
          <div class="product-body">
              <h2 class="h3">Name: <span>${products[i].pName}</span></h2>
              <h2 class="h3">price: <span>${products[i].price}</span></h2>
              <h3 class="h4">Category: <span>${products[i].category}</span></h3>
              <p class="lead"><span>Description:</span>${products[i].description}</p>
              <div class="product-btns">
                  <button class="btn btn-outline-warning my-2" onclick="setFormToUpdate(${i})" >Update Product 🪶</button>
                  <button class="btn btn-outline-danger my-2" onclick="deleteproduct(${i})">Delete Product 🗑</button>
              </div>
          </div>
      </div>
  </div>`;
    }
  }
  document.getElementById("rowElements").innerHTML=cartona;    
}


// Regex

/*

1- abc -> lazem yktbly abc gnb b3d

2- [] -> OR  "ex" -> [0125] kda mmkn yktbly 0,1,2,3

3- {} -> btkarar  "ex" -> [0-9]{5} keda hkteb 5 arkam mn 0-9

4- {2,6} -> min w max 

5- ^ -> Start

6- $ -> End

7- \d -> digit

8- \D -> not digit

9- \w -> word character (alphanumeric plus "_")

10- \W -> not word character

11- \s -> whitespace character

12- \S -> not whitespace character

13- \b -> word boundary

14- \B -> not word boundary

15- \n -> new line

16- \r -> carriage return

17- \t -> tab

18- ()? -> optional "ex" -> (002)? keda momkn ykteb 002 aw la

19- ? -> 0 or 1 "ex" -> a? keda momkn ykteb aw la

20- * -> 0 or more "ex" -> a* keda momkn myktebhab aw yktebha aktar mn mara

21- + -> 1 or more "ex" -> a+ keda momkn yktebha mara aw aktar

## regex for egyptian number " ^(002|\+2)?01[0125][0-9]{8}$ "


*/ 


//var x = /^(002){0,1}01[0125]{3}[0-9]{8}$/;
// regex for egypt phone number
