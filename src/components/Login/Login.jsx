import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginData;
  const handleChange = (e) => {
    e.preventDefault();
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const userLogin = async () => {
    try {
      const respose = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginData.email,
          password: loginData.password,
          expiresInMins: 30,
        }),
      })
        .then((res) => res.json())
        .then(console.log());
      console.log(respose, "tt");
      navigate("/dashboard");
      localStorage.setItem("token", respose.accessToken);
      alert("login successfull");
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const handleLogin = () => {
    if (password.length < 6 || !email) {
      alert("please fill correct credential");
      return;
    }
    console.log(loginData);
    userLogin();
  };
  return (
    <div className="h-svh flex items-center justify-center flex-col ">
      <div className="flex flex-col items-center just-fy-center">
        <label>
          UserName:
          <input
            className="border"
            name="email"
            onChange={handleChange}
            value={email}
          ></input>
        </label>
        <label>
          Password:
          <input
            onChange={handleChange}
            className="border"
            type="password"
            name="password"
            value={password}
          ></input>
        </label>
      </div>
      <button onClick={handleLogin} className="p-1 mt-8 bg-blue-100 border">
        Login
      </button>
    </div>
  );
}

export default Login;
