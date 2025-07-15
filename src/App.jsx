import React from "react";
import Routes from "./Routes";
import { DiasporaProvider } from "./context/DiasporaContext";
import FloatingChatButton from "./components/ui/FloatingChatButton"; // Import the button

function App() {
  return (
    <DiasporaProvider>
      <Routes />
      <FloatingChatButton /> {/* Add the button here */}
    </DiasporaProvider>
  );
}

export default App;
