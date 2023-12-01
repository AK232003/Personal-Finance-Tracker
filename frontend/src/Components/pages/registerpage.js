import { useState } from "react";
import RegisterImage1 from '../images/RegisterImage1.svg'
import logo from '../images/Logo.jpg'
import { Navigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  // const [college, setCollege] = useState("");
  const [limit, setLimit] = useState(0)
  const years = [
    "B.Tech - First",
    "B.Tech - Second",
    "B.Tech - Third",
    "B.Tech - Fourth",
    "IDD - Fifth",
    "M.Tech",
    "PhD",
  ];
  // const [year, setYear] = useState(years[0]);
  const [redirect, setRedirect] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ username, password, name, limit}),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("Registration successful! Please login");
      setRedirect(true);
    } else {
      alert("Username in already in use.");
    }
  }
  if(redirect){
    return <></>
    // return <Navigate to= {"/login"} />
  }
  return (
    <div class="card d-flex justify-content-center align-items-center m-5" style={{width: "600px"}}>
      <h1> Register</h1>
<form >
  <div class="form-outline mb-4">
    <label class="form-label" for="form2Example1">Email address</label>
    <input type="email" id="form2Example1" class="form-control" />
  </div>

  <div class="form-outline mb-4">
    <label class="form-label" for="form2Example2">Password</label>
    <input type="password" id="form2Example2" class="form-control" />
  </div>

  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label class="form-check-label" for="form2Example31"> Remember me </label>
      </div>
    </div>

    <div class="col">
      <a href="#!">Forgot password?</a>
    </div>
  </div>

  <button type="button" class="btn btn-primary btn-block mb-4">Sign in</button>

  <div class="text-center">
    <p>Not a member? <a href="#!">Register</a></p>
    <p>or sign up with:</p>
    <button type="button" class="btn btn-link btn-floating mx-1">
      <i class="fab fa-facebook-f"></i>
    </button>

    <button type="button" class="btn btn-link btn-floating mx-1">
      <i class="fab fa-google"></i>
    </button> 

    <button type="button" class="btn btn-link btn-floating mx-1">
      <i class="fab fa-twitter"></i>
    </button>

    <button type="button" class="btn btn-link btn-floating mx-1">
      <i class="fab fa-github"></i>
    </button>
  </div>
</form>
</div>
  );
}

export default RegisterPage;