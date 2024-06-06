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

function displayOrders(list) {
  let table = document.createElement("table");
  table.classList.add("table");
  const header = table.insertRow();
    const elem = header.insertCell();
  for (let key in list[0]) {
    elem.textContent = key;
    elem.classList.add("header");
  }
  list.forEach((item, index) => {
    const row = table.insertRow();
    row.classList.add("row");
    for (let key in item) {
      console.log(key,item[key])
      const elem = row.insertCell();
      if (key != "products") {
        row.textContent = item[key];
      }
      {
        row.textContent = item[key][0].name;
      }
    }
  });
  let con = document.getElementById("container");
  con.append(table);
}
