const displayError = (error) => {
  document.getElementById("error-con").style.display = "block";
  document.getElementById("error").innerHTML = error;
};

const hideError = (id) => {
  document.getElementById("error-con").style.display = "none";
};

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
