import "./chat.scss";
import { to_Decrypt, to_Encrypt } from "../aes.js";
import { process } from "../store/action/index";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
//Classe chat 
//obtient les données de l’objet d’action et des réducteurs définis précédemment
function Chat({ username, roomname, socket }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();

  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher));
  };
  //se lance à l'initiation du composant chat ou si un message est reçu (changement sur socket)
  useEffect(() => {
    socket.on("message", (data) => {
      //decryptage
      const ans = to_Decrypt(data.text, data.username);
      dispatchProcess(false, ans, data.text);
      console.log(ans);
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      });
      setMessages([...temp]);
    });
  }, [socket]);

  const sendData = () => {
    if (text !== "") {
      //encryptage
      const ans = to_Encrypt(text);
      socket.emit("chat", ans);
      setText("");
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  //Se lance a chaque fois qu'on scroll vers le bas et si il y a un nouveau message qui depasse la fenetre
  useEffect(scrollToBottom, [messages]);

  console.log(messages, "mess");
  //Retourne le front
  return (
    <div className="chat">
      <div className="user-name">
        <h2>
          {username} <span style={{ fontSize: "0.7rem" }}>is in the room {roomname}</span>
        </h2>
      </div>
      
      <div className="chat-message">
        {messages.map((i) => {
          if (i.username === username) {
            //Affichage du message envoyé à droite de l'écran
            return (
              <div className="message mess-right">
                <p>{i.text}</p>
                <span>{i.username}</span>
              </div>
            );
          } else {
            //affiche le message recu à gauche
            return (
              <div className="message">
                <p>{i.text} </p>
                <span>{i.username}</span>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="send">
        <input //zone d'ecrit du message
          placeholder="Saisir votre message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
            }
          }}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
    </div>
  );
}
export default Chat;
