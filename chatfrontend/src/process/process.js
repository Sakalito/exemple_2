import { useSelector } from "react-redux";
import "./process.scss";
//Classe processus pour le cryptage des messages
function Process() {

  const state = useSelector((state) => state.ProcessReducer);

  return (
    <div className="process">
      <h5>
       <span></span>
      </h5>
      <div className="incoming">
        <h4></h4>
        <p>{state.cypher}</p>
      </div>
      <div className="crypt">
        <h4></h4>
        <p>{state.text}</p>
      </div>
    </div>
  );
}
export default Process;
