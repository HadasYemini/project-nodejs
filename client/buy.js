const getTotalOrder = async () => {
  const user = await JSON.parse(localStorage.getItem("user"));
  console.log(user, user.name);
  let res = await fetch("/getTotalOrder", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({
      orderId: user.orderId,
    }),
  });
  const data = await res.json();
  if (data.Error) {
    displayError(data.Error);
  } else {
    document.getElementById("totalProducts").innerHTML = data.totalProducts;
    document.getElementById("totalPrice").innerHTML = data.totalPrice;
  }
};

getTotalOrder();

const approveOrder = async () => {
  const user = await JSON.parse(localStorage.getItem("user"));

  let res = await fetch("/approveOrder", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({
      orderId: user.orderId,
    }),
  });
  let data = await res.json();
  if (data.Error) {
    displayError(data.Error);
  } else {
    window.location.href = data.url;
  }
};
