import "./App.css";

import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { TodoCount } from "./components/TodoCount";

function App() {
  return (
    <div className="App">
      <h1 className="App__title">use-sync-external-store</h1>
      <div className="App__layout">
        <TodoForm />
        <TodoList />
        <TodoCount />
      </div>
    </div>
  );
}

export default App;
