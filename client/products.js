

let products;

const buyProducts = async () => {
    const order = products.filter(item => document.getElementById(item.name).classList.contains('select'))

   let res = await fetch("/saveOrder", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({
        order
    }),
  });
  let data = await res.json();
  if (data.Error) {
    console.log(`${data.Error} **** buy products`);
    displayError(data.Error);
  } else {
    console.log(data);
    window.location.href = data.url;
  }
};



const getProducts = async () => {
  let res = await fetch("/getProducts"); //get
  let data = await res.json();
  console.log("products = ", data);
  initProducts(data);
};

function initProducts(list) {
  products = list;
  //  const e = document.querySelector("table");
  //  if (e) e.remove();
  let table = document.createElement("table");
  table.classList.add("table");
  const header = table.insertRow();
  for (let key in list[0]) {
    const elem = header.insertCell();
    elem.textContent = key;
    elem.classList.add("header");
  }
  list.forEach((item, index) => {
    let product = table.insertRow();
    product.id = item.name
    product.classList.add("product");
    product.onclick = () => {
      if (product.classList.contains("select")) {
        product.classList.remove("select");
      } else {
        product.classList.add("select");
      }
    };
    for (let key in item) {
      const elem = product.insertCell();
      elem.textContent = item[key];
      //elem.classList.add(key);
    }
  });
  let con = document.getElementById("products-con");
  con.append(table);
}

getProducts();
