const userValidation = async () => {
  let email = document.getElementById("email").value;
  if (!validateEmail(email)) {
    displayError("Please enter a valid email adress");
    return false;
  }
let password = document.getElementById("password").value;
  if (password.length === 0) {
    displayError("You have entered an incorrect password");
    return false
  }

  let res = await fetch("/userValidation", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  let data = await res.json();
  if (data.Error) {
    console.log(`${data.Error} **** user validation`);
    displayError(data.Error);
  } else {
    window.location.href = data.url;
    console.log(data.url);
  }
};
