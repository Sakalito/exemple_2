
const c_users = [];

// rejoint l’utilisateur à la salle de chat spécifique
function join_User(id, username, room) {
  const p_user = { id, username, room };

  c_users.push(p_user);
  console.log(c_users, "users");

  return p_user;
}

console.log("user out", c_users);

// Obtient un identifiant d’utilisateur particulier pour retourner l’utilisateur actuel
function get_Current_User(id) {
  return c_users.find((p_user) => p_user.id === id);
}

// appelé lorsque l’utilisateur quitte le chat et son objet utilisateur supprimé du tableau
function user_Disconnect(id) {
  const index = c_users.findIndex((p_user) => p_user.id === id);

  if (index !== -1) {
    return c_users.splice(index, 1)[0];
  }
}

module.exports = {
  join_User,
  get_Current_User,
  user_Disconnect,
};
