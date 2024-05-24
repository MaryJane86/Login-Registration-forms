function resetErrors() {
  document.getElementById("userNameError").innerHTML = "";
  document.getElementById("emailError").innerHTML = "";
  document.getElementById("phoneError").innerHTML = "";
  document.getElementById("passwordError").innerHTML = "";
  document.getElementById("confirmPasswordError").innerHTML = "";
}

function checkFields() {
  let userName = document.getElementById("userName").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  let userNameCheck = /^[a-zA-Z]\w+$/;
  let emailCheck = /^\w+@\w+\.[a-z]{2,3}$/;
  let phoneCheck = /^\+3816\d{7,8}$/;
  let passwordCheck = /^.{12}$/;

  if (userNameCheck.test(userName) == false) {
    document.getElementById("userNameError").innerHTML =
      "User name form is not valid!";
    return false;
  } else if (emailCheck.test(email) == false) {
    document.getElementById("emailError").innerHTML =
      "The e-mail address form is not valid!";
    return false;
  } else if (phoneCheck.test(phone) == false) {
    document.getElementById("phoneError").innerHTML =
      "Phone number must be in a form +3816...!";
    return false;
  } else if (passwordCheck.test(password) == false) {
    document.getElementById("passwordError").innerHTML =
      "Password has to have 12 characters!";
    return false;
  } else if (password != confirmPassword) {
    document.getElementById("confirmPasswordError").innerHTML =
      "Passwords don't match!";
    return false;
  }
  return true;
}

let usersList = [];

function initializeData() {
  if (localStorage.getItem("users") == null) {
    localStorage.setItem("users", "");
  } else {
    let listTxt = localStorage.getItem("users");
    let list = JSON.parse(listTxt);
    usersList = list;
  }
}

function checkUsers() {
  let userName = document.getElementById("userName").value;
  for (user of usersList) {
    if (userName == user.userName) {
      document.getElementById("userNameError").innerHTML =
        "This user name alredy exists. Try different one.";
      return false;
    }
  }
  return true;
}

function addUser() {
  let userName = document.getElementById("userName").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let password = document.getElementById("password").value;

  let user = {
    userName: userName,
    email: email,
    phone: phone,
    password: password,
  };

  usersList.push(user);

  let textUsersList = JSON.stringify(usersList);
  localStorage.setItem("users", textUsersList);
}

function register() {
  resetErrors();
  let checkOK = checkFields();
  if (checkOK == true) {
    let uniqueUser = checkUsers();
    if (uniqueUser == true) {
      addUser();
      alert("Account created successfully!");
    }
  }
}

function login() {
  let userName = document.getElementById("userName").value;
  let password = document.getElementById("password").value;

  document.getElementById("userNameError").innerHTML = "";
  document.getElementById("passwordError").innerHTML = "";

  for (user of usersList) {
    if (userName == user.userName) {
      if (password == user.password) {
        return;
      } else {
        document.getElementById("passwordError").innerHTML = "Wrong pasword!";
        return;
      }
    } else {
      document.getElementById("userNameError").innerHTML =
        "This user name doesn't exist!";
    }
  }
}
