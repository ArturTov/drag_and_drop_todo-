import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Toaster } from "react-hot-toast";
import CreateTask from "./components/CreateTask";
import ListTask from "./components/ListTask";
import { Light, Moon } from "./assect";
import "./App.scss";

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App" data-theme={theme}>
        <div className="them_icon">
          <div
            className="theme-svg"
            onClick={() => {
              if (theme === "light") {
                return setTheme("dark");
              }
              return setTheme("light");
            }}>
            {theme === "light" ? <Light /> : <Moon />}
          </div>
        </div>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          containerClassName=""
        />
        <div className="flex">
          <CreateTask theme={theme} />
          <ListTask />
        </div>
      </div>
      ;
    </DndProvider>
  );
}

export default App;
