import { useEffect } from "react";
import { init } from "../utils/init";
import Website from "./Website";

const App = () => {
  useEffect(() => {
    // INITIALIZING SCRIPTS
    init()
  }, []);

  return (
    <div className="App" >
      <Website />
    </div >
  );
}

export default App;