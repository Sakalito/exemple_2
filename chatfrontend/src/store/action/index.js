export const process = (encrypt, text, cypher) => {
  //ici nous exportons le processus de fonction avec les paramètres définis 
  //et définir l’objet d’action PROCESS, qui retournera les mêmes paramètres que la charge utile.
  return {
    type: "PROCESS",
    payload: {
      encrypt,
      text,
      cypher,
    },
  };
};
