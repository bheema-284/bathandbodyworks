let arr = JSON.parse(localStorage.getItem("products"));
let recommend_prods = arr["all soaps"].slice(4, 8);

let cart_items = JSON.parse(localStorage.getItem("cart_items")) || [];
let count_str = cart_items.length + " items added for Shipping";
document.querySelector("#count_text").append(count_str);

displayRecommend(recommend_prods);
function displayRecommend(arr) {
  arr.map(function (elem) {
    let rb = document.querySelector(".recommend_box");
    let main_div = document.querySelector(".recommend_box>div");
    let text_div = document.createElement("div");
    let div = document.createElement("div");

    let name = document.createElement("p");
    name.textContent = elem["Name"];
    name.style.fontSize = "15px";

    let tag = document.createElement("b");
    if (elem["Tag"] == undefined) {
      tag.textContent = "New!";
    } else {
      tag.textContent = elem["Tag"];
    }

    tag.style.fontStyle = "italic";
    tag.style.color = "blue";

    let type = document.createElement("p");
    type.textContent = elem["Type"];
    type.style.fontSize = "12px";

    let price = document.createElement("p");
    price.textContent = elem["Price"];
    price.style.fontSize = "20px";

    let footer = document.createElement("p");
    footer.textContent = elem["Footer"];
    footer.style.color = "red";
    footer.style.fontSize = "12px";

    let img = document.createElement("img");
    img.setAttribute("src", elem["img"]);

    text_div.append(tag, name, type, price, footer);
    text_div.style.lineHeight = "10px";
    div.append(img, text_div);
    main_div.append(div);
    rb.append(main_div);
  });
}

displayCart(cart_items);

function displayCart(arr) {
  document.querySelector(".display_cart").innerHTML = "";
  arr.map(function (elem, index) {
    cart_div = document.querySelector(".display_cart");

    let img_div = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", elem["img"]);

    let text_div = document.createElement("div");

    let name = document.createElement("p");
    name.textContent = elem["Name"];

    let type = document.createElement("p");
    type.textContent = elem["Type"];

    let a_tag = document.createElement("a");
    a_tag.textContent = "Add to My Love-it List";
    text_div.append(name, type, a_tag);
    img_div.append(img, text_div);

    // Setting styles through dom
    img_div.style.display = "flex";
    text_div.style.marginLeft = "100px";
    img_div.style.width = "500px";

    let price_div = document.createElement("div");
    let price = document.createElement("p");
    price.textContent = elem["Price"];
    price_div.append(price);

    let qty_div = document.createElement("div");
    let plus = document.createElement("button");
    let minus = document.createElement("button");
    let qty = document.createElement("button");
    plus.textContent = "+";
    minus.textContent = "-";
    qty.textContent = "1";
    qty_div.append(minus, qty, plus);
    qty.style.justifyContent = "space-around";

    // Adding the event listeners on plus and minus button.
    plus.addEventListener("click", function () {
      let data = increment(index, Number(qty.textContent), elem["Price"]);
      qty.textContent = data[0];
      price.textContent = data[1];
    });

    minus.addEventListener("click", function () {
      if (Number(qty.textContent) > 1) {
        data = decrement(index, Number(qty.textContent), elem["Price"]);
        qty.textContent = data[0];
        price.textContent = data[1];
      }
    });
    let del_div = document.createElement("div");
    let del = document.createElement("button");
    del.textContent = "Remove item";
    del_div.append(del);

    cart_div.append(img_div, price_div, qty_div, del_div);

    del.addEventListener("click", function () {
      deleteItem(index);
    });
  });
}

function increment(index, count, price) {
  count = count + 1;
  price = Number(price.split("$")[1]) * count;
  return [count, "$" + price];
}

function decrement(index, count, price) {
  count = count - 1;
  price = Number(price.split("$")[1]) * count;
  return [count, "$" + price];
}

function deleteItem(index) {
  cart_items.splice(index, 1);
  localStorage.setItem("cart_items", JSON.stringify(cart_items));
  displayCart(cart_items);
}

document.querySelector("#submit_bag").addEventListener("click", function () {
  window.location.href = "shipping_address.html";
});
