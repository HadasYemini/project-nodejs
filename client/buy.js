const getTotalOrder = async () => {
  let res = await fetch("/getTotalOrder"); //get
  let data = await res.json();
  console.log("order = ", data, "=>getTotalOrder");
};

getTotalOrder();
