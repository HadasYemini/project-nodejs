let products;

const buyProducts = async () => {
  const order = products.filter((item) =>
    document.getElementById(item.name).classList.contains("select")
  );
  const user = await JSON.parse(localStorage.getItem("user"));

  let res = await fetch("/saveOrder", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      order,
    }),
  });
  let data = await res.json();
  if (data.Error) {
    displayError(data.Error);
  } else {
    user.orderId = data._id;
    await localStorage.setItem("user", JSON.stringify(user));
    window.location.href = data.url;
  }
};

const getProducts = async () => {
  let res = await fetch("/getProducts"); //get
  let data = await res.json();
  console.log("products = ", data);
  products = data;
  initProducts([...data]);
};

function initProducts(list) {
  const e = document.querySelector("table");
  if (e) e.remove();
  //  products = list;
  const table = document.createElement("table");
  table.classList.add("table");
  const thead = document.createElement("thead");
  const th = document.createElement("th");
  for (let key in list[0]) {
    const td = document.createElement("td");
    td.textContent = key;
    td.classList.add(key);
    th.appendChild(td);
  }
  thead.appendChild(th);
  const tbody = document.createElement("tbody");
  list.forEach((item, index) => {
    let product = tbody.insertRow();
    product.id = item.name;
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
      elem.classList.add(key);
    }
  });
  let con = document.getElementById("products-con");
  table.appendChild(thead);
  table.appendChild(tbody);
  con.append(table);
}

getProducts();

const getSelectedOption = () => {
  const option = document.getElementById("sort").value;

  console.log("Selected option:", option);
  sortProducts(option);
};

const sortProducts = (id) => {
  const sortedProducts = products.toSorted((a, b) => {
    let elemA;
    let elemB;
    if (id === "price") {
      elemA = Number(a[id]);
      elemB = Number(b[id]);
    } else {
      elemA = a[id].toLowerCase();
      elemB = b[id].toLowerCase();
    }

    if (elemA < elemB) {
      return -1;
    }
    if (elemA > elemB) {
      return 1;
    }
    return 0;
  });
  initProducts(sortedProducts);
};

const searchProducts = (arrayOfObjects, substring) => {
  const searchResult = arrayOfObjects.filter((obj) => {
    const name = obj.name.toLowerCase();
    return name.startsWith(substring.toLowerCase());
  });
  return searchResult;
};

const searchText = () => {
  const text = document.getElementById("search").value;
  if (text === "") {
    initProducts([...products]);
  } else {
    const searchResults = searchProducts([...products], text);
    initProducts(searchResults);
  }
};
