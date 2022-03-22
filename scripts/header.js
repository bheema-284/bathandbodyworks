document.querySelector("button").addEventListener("click", search);
var data = JSON.parse(localStorage.getItem("data"));
function foamingSoap() {
  window.location.href = "hand.html";
}
function search() {
  var search = document.querySelector("#ser").value;

  for (var i = 0; i < data.length; i++) {
    if (data[i].search == search) {
      var a = document.querySelector("h1");
      a.textContent = "Product is Availble";
      console.log(here);
    }
  }
}
