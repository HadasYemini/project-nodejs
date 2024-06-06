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
  const data = await res.json();
  if (data.Error) {
    console.log(`${data.Error} **** user validation`);
    displayError(data.Error);
  } else {
    const user = {
      email,
      name:data.name
    }
    console.log('=======',user,data)
    await localStorage.setItem('user',JSON.stringify(user))
    window.location.href = data.url;
  }
};
