import React from "react";

const Profile = () => {
  
  return (
    <div>
      <h2>Profile</h2>
      <p>Hello, {user?.unom}</p>
      <button onClick={(e) => {}}>Logout</button>
    </div>
  );
};

export default Profile;
