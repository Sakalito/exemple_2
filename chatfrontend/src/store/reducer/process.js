
//initialiser la fonction avec deux arguments
export const ProcessReducer = (state = {}, action) => {
  switch (action.type) {
    //renvoie l’état mis à jour
    case "PROCESS":
      return { ...action.payload };
    //sinon l’état actuel est conservé
    default:
      return state;
  }
};
