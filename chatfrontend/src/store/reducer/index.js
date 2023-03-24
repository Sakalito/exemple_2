// importer les réducteurs
import { ProcessReducer } from "./process";
import { combineReducers } from "redux";
// définir l’objet et appeler l’action
const rootReducers = combineReducers({
  ProcessReducer: ProcessReducer,
});
// sinon retourne default root reducer
export default rootReducers;
