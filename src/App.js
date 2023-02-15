import './App.css';

import { AbilityContext } from './components/Can';
import { buildAbilityFor } from './config/ability';
import TodoList from "./components/TodoList";

const ability = buildAbilityFor('member');

function App() {

    console.log(ability)
    return (
        <AbilityContext.Provider value={ability}>
        <div className="App">
            <TodoList/>
        </div>
        </AbilityContext.Provider>
    );
}

export default App;
