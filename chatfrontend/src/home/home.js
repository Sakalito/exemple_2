import React, { useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";

//Classe menu d'accueil
function Homepage({ socket }) {
  const [username, setusername] = useState("");
  const [roomname, setroomname] = useState("");
 //active la fonction joinRoom définie sur le backend
 const sendData = () => {
    if (username !== "" && roomname !== "") {
      socket.emit("joinRoom", { username, roomname });
      //si un message d’erreur vide apparaît et revient à la même page
    } else { 
      alert("Please, enter your username and/or the name of the room");
      window.location.reload();
    }
  };
  //Retourne le front
  return ( 
    <div className="homepage">
      <h1>Welcome to My_Privaty</h1>
      <input
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      ></input>
      <input
        placeholder="Enter the name of the room"
        value={roomname}
        onChange={(e) => setroomname(e.target.value)}
      ></input>
      <Link to={`/chat/${roomname}/${username}`}>
        <button onClick={sendData}>Join</button>
      </Link>
    </div>
  );
}

export default Homepage;
