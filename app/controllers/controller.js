function getDataForm() {
  var ten = document.getElementById("TenSP").value;
  var gia = document.getElementById("GiaSP").value;
  var manHinh = document.getElementById("ManHinh").value;
  var cameraSau = document.getElementById("CameraSau").value;
  var cameraTruoc = document.getElementById("CameraTruoc").value;
  var hinhAnh = document.getElementById("HinhSP").value;
  var moTa = document.getElementById("MoTaSP").value;
  var nhanHieu = document.getElementById("NhanHieu").value;
  return {
    name: ten,
    price: gia,
    screen: manHinh,
    blackCamera: cameraSau,
    frontCamera: cameraTruoc,
    img: hinhAnh,
    desc: moTa,
    type: nhanHieu,
  };
}
function showDataForm(product) {
  document.getElementById("TenSP").value = product.name;
  document.getElementById("GiaSP").value = product.price;
  document.getElementById("ManHinh").value = product.screen;
  document.getElementById("CameraSau").value = product.blackCamera;
  document.getElementById("CameraTruoc").value = product.frontCamera;
  document.getElementById("HinhSP").value = product.img;
  document.getElementById("MoTaSP").value = product.desc;
  document.getElementById("NhanHieu").value = product.type;
}

function turnOnLoading() {
  document.querySelector("#spinner").style.display = "flex";
}
function turnOffLoading() {
  document.querySelector("#spinner").style.display = "none";
}
