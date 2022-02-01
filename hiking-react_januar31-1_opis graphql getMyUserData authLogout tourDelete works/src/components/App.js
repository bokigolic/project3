import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionAuthGetMyUserData } from "../redux/actions";
import { init } from "../utils/init";
import { CircularProgress } from "@mui/material";
import Website from "./Website";

const App = () => {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.initialized);

  useEffect(() => {
    // run only once when App mount

    // INIT
    init()
      .then(() => {
        // after succesful initialization
        dispatch({
          type: 'INITIALIZED'
        });
        dispatch(actionAuthGetMyUserData());
      })

  }, []);

  let jsx = (
    <CircularProgress />
  );
  if (initialized) {
    jsx = (
      <Website />
    );
  }

  return (
    <div className="App" >
      {jsx}
    </div >
  );
}

export default App;