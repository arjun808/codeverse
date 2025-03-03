import React, { useEffect, useState } from "react";

function Dashboard() {
  const accessToken = localStorage.getItem("token");
  const [user, setUser] = useState();

  const getUserAuth = async () => {
    try {
      const responce = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        console.log(res);
        return res.json();
      });

      setUser(responce);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user, "this is the user");
  useEffect(() => {
    getUserAuth();
  }, [accessToken]);
  return (
    <div>
      <h1>Welcome {user?.firstName}</h1>
      <div className="border p-4">
      <div>
        
      </div>
      <img className="h-10 w-10" src={user.image} alt="profile" />
        <h1 className="text-3xl">Profile Section</h1>
     
        <h2>First Name: {user?.firstName}</h2>
        <h2>Last Name: {user?.lastName}</h2>
         
      </div>
    </div>
  );
}

export default Dashboard;
