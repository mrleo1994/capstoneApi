var selectedId = null;

function renderProductList(productArr) {
  var contentHTML = "";
  for (var i = 0; i < productArr.length; i++) {
    var product = productArr[i];
    var trString = `<tr class='product-row' data-type='${product.type}'>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.screen}</td>
        <td>${product.blackCamera}</td>
        <td>${product.frontCamera}</td>
        <td>${product.image}</td>
        <td>${product.desc}</td>
        <td>${product.type}</td>

        <td>
        <button onclick=editProduct(${product.id}) class='btn btn-warning'>Edit</button>
        <button onclick=deleteProduct(${product.id}) class='btn btn-danger'>Delete</button>
        </td>
        <td>
        <button onclick=buyProduct(${product.id},${product.price}) class='btn btn-success'>Mua</button>
        </td>
        </tr>`;
    contentHTML += trString;
  }
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}
function fetchFoodList() {
  axios({
    url: "https://65118c99829fa0248e4052b6.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      turnOffLoading();
      renderProductList(res.data.reverse());
    })
    .catch(function (err) {
      turnOffLoading();
      console.log("🚘 ~ fetchFoodList ~ thất bại:", err);
    });
}

fetchFoodList();
function deleteProduct(id) {
  turnOnLoading();
  axios({
    url: `https://65118c99829fa0248e4052b6.mockapi.io/product/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      console.log("🚘 ~ deleteProduct ~ xóa thành công:", res);
      fetchFoodList();
    })
    .catch(function (err) {
      turnOffLoading();
      console.log("thất bại");
    });
}

function addProduct() {
  turnOnLoading();
  var newProduct = getDataForm();
  axios({
    url: "https://65118c99829fa0248e4052b6.mockapi.io/product",
    method: "POST",
    data: newProduct,
  })
    .then(function (res) {
      fetchFoodList();
    })
    .catch(function (err) {
      turnOffLoading();
      console.log("thất bại");
    });
}

function editProduct(id) {
  selectedId = id;
  axios({
    url: `https://65118c99829fa0248e4052b6.mockapi.io/product/${id}`,
    method: "GET",
  })
    .then(function (res) {
      console.log(res);
      $("#myModal").modal("show");
      showDataForm(res.data);
    })
    .catch(function (err) {
      console.log("🚘 ~ editProduct ~ err:", err);
    });
}
function updateProduct() {
  var product = getDataForm();
  turnOnLoading();
  axios({
    url: `https://65118c99829fa0248e4052b6.mockapi.io/product/${selectedId}`,
    method: "PUT",
    data: product,
  })
    .then(function (res) {
      $("#myModal").modal("hide");
      fetchFoodList();
    })
    .catch(function (err) {
      turnOffLoading();
    });
}
const cart = [];

// Hàm thêm sản phẩm vào giỏ hàng
function buyProduct(productName, price) {
  let productExists = false;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === productName) {
      cart[i].quantity++;
      productExists = true;
      break;
    }
  }
  if (!productExists) {
    const product = { name: productName, price: price, quantity: 1 };
    cart.push(product);
  }

  updateCart();
}
// Hàm cập nhật giỏ hàng và hiển thị tổng giá trị
function updateCart() {
  var cartElement = document.getElementById("cart");
  var totalElement = document.getElementById("total");
  cartHTML = "";
  total = 0;

  for (var i = 0; i < cart.length; i++) {
    cartHTML += `<div>${cart[i].name} - ${cart[i].price} VND x ${cart[i].quantity}
                <button onclick="increaseQuantity(${i})">+</button>
                <button onclick="decreaseQuantity(${i})">-</button></div>`;
    total += cart[i].price * cart[i].quantity;
  }

  cartElement.innerHTML = cartHTML;
  totalElement.textContent = total;
}
// Hàm tăng số lượng sản phẩm
function increaseQuantity(index) {
  cart[index].quantity++;
  updateCart();
}

// Hàm giảm số lượng sản phẩm
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1); // Xóa sản phẩm nếu số lượng bằng 0
  }
  updateCart();
}
// lọc danh sách Samsung và Iphone
function filterProducts() {
  var selectedType = document.getElementById("filter").value;
  var productRows = document.getElementsByClassName("product-row");

  for (var i = 0; i < productRows.length; i++) {
    var productType = productRows[i].getAttribute("data-type");
    if (selectedType === "all" || selectedType === productType) {
      productRows[i].style.display = "table-row";
    } else {
      productRows[i].style.display = "none";
    }
  }
}
