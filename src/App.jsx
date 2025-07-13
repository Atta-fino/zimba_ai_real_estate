import React from "react";
import Routes from "./Routes";
import { DiasporaProvider } from "./context/DiasporaContext";

function App() {
  return (
    <DiasporaProvider>
      <Routes />
    </DiasporaProvider>
  );
}

export default App;
