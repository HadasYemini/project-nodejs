const initOrders = async () => {
  let res = await fetch("/getOrdersApprove");
  let data = await res.json();
  if (data.Error) {
    displayError(data.Error);
  } else {
    console.log(data.orders);
    displayOrders(data.orders);
  }
};

initOrders();

const displayOrder = (order, orderCon) => {
  const orderId = document.createElement("order-id");

  const id = document.createElement("div");
  id.innerHTML = order._id;
  const name = document.createElement("div");
  name.innerHTML = order.name;

  orderId.append(id);
  orderId.append(name);
  orderCon.append(orderId);

  orderId.onclick = (event) => {
    const products = event.currentTarget.nextElementSibling;
    if (products.classList.contains("hide")) {
      products.classList.remove("hide");
    } else {
      products.classList.add("hide");
    }
  };
  const productsCon = document.createElement("products-con");
  productsCon.classList.add("hide");
  const table = document.createElement("table");
  table.classList.add("table");
  const thead = document.createElement("thead");
  const th = document.createElement("th");
  for (let key in order.products[0]) {
    if (key !== "select") {
      const td = document.createElement("td");
      td.textContent = key;
      td.classList.add(key);
      th.appendChild(td);
    }
  }
  thead.appendChild(th);
  const tbody = document.createElement("tbody");
  order.products.forEach((item, index) => {
    let product = tbody.insertRow();
    product.classList.add("product");
    for (let key in item) {
      if (key !== "select") {
        const elem = product.insertCell();
        elem.textContent = item[key];
        elem.classList.add(key);
      }
    }
  });
  table.append(thead);
  table.append(tbody);
  productsCon.append(table);
  orderCon.append(productsCon);
};

const displayOrders = (orders) => {
  let con = document.getElementById("orders-con");
  orders.forEach(async (order) => {
    const orderCon = document.createElement("order-con");
    await displayOrder(order, orderCon);
    con.append(orderCon);
  });
};
