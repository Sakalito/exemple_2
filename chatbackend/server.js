//Declaration des différents outils utilisés
//Framework express.js
const express = require("express");
const app = express();
//Socket
const socket = require("socket.io");
//routes
const routes = require('./routes/routes')
//Colors
const color = require("colors");
//Technique permettant de faire une requete ajax a un serveur. 
const cors = require("cors");
const { get_Current_User, user_Disconnect, join_User } = require("./dummyuser");
app.use(express());
//Utilise le port 8000 pour être en ligne.
const port = 8000;

app.use(cors());
app.use(routes);

//ecoute du serveur
var server = app.listen(
  port,
  console.log(
    `Server is running on the port no: ${(port)} `
      .green
  )
);

const io = socket(server);

//initialisation de la connexion socket io 
io.on("connection", (socket) => {
  //pour un nouvel utilisateur entrant dans la salle
  socket.on("joinRoom", ({ username, roomname }) => {
    //Créer un utilisateur
    const p_user = join_User(socket.id, username, roomname);
    console.log(socket.id, "=id");
    socket.join(p_user.room);

    //afficher un message de bienvenue à l’utilisateur qui a rejoint une salle
    socket.emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: `Welcome ${p_user.username}`,
    });

    //affiche un message de salle connectée à tous les autres utilisateurs de salle, 
    //à l’exception de cet utilisateur
    socket.broadcast.to(p_user.room).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: `${p_user.username} has joined the chat`,
    });
  });

  //utilisateur envoie un message 
  socket.on("chat", (text) => {
    //obtient l’utilisateur de la salle et le message envoyé
    const p_user = get_Current_User(socket.id);

    io.to(p_user.room).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: text,
    });
  });
  //lorsque l’utilisateur quitte la salle
  socket.on("disconnect", () => {
    //l’utilisateur est supprimé du tableau des utilisateurs et un message de salle gauche s’affiche    const p_user = user_Disconnect(socket.id);

    if (p_user) {
      io.to(p_user.room).emit("message", {
        userId: p_user.id,
        username: p_user.username,
        text: `${p_user.username} has left the chat`,
      });
    }
  });
});