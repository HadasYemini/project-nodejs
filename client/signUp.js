const userValiditaion = async () => {
  let name = document.getElementById("name").value;
  if (name.length < 4 || name.length > 15) {
    displayError(
      "You have entered an incorrect name <br>Must be between 4-15 characters"
    );
    return false;
  }
  let email = document.getElementById("email").value;
  if (!validateEmail(email)) {
    displayError("Please enter a valid email adress");
    return false;
  }
  let password = document.getElementById("password").value;
  if (!validatePassword(password)) {
    displayError(
      "You have entered an incorrect password<br>Must be between 5-10 characters"
    );
    return false;
  }
  console.log(name, email, password);
  let res = await fetch("/addNewUser", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
  let data = await res.json();
  if (data.Error) {
    displayError(data.Error);
  } else {
    await localStorage.setItem("user", JSON.stringify({ name, email }));
    window.location.href = data.url;
    console.log(data.url);
  }
};
