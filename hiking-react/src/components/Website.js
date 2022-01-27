import { useDispatch } from "react-redux";
import { actionAuthLogout, actionAuthGetMyUserData } from "../redux/actions";
import PageRouter from "./PageRouter";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import FormReview from "./FormReview";
import FormTour from "./FormTour";
import { Button } from "@mui/material";


const Website = (props) => {
  const dispatch = useDispatch();

  const handleCheck = () => {
    console.log('click check');
    dispatch(actionAuthGetMyUserData());

  };

  const handleLogout = () => {
    console.log('click logout');
    dispatch(actionAuthLogout());

  };

  return (
    <>
      <div className={"wrapper"}>
        <header>
          <h1>American Hiking Club</h1>
          <br />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleCheck}
          >Check is logged in</Button>
          <br />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogout}
          >Logout</Button>
        </header>
        <div className="page-body">
          <PageRouter />
        </div>
        <h2>forms...</h2>
        <FormTour />
        <FormReview />
        <FormLogin />
        <FormRegister />
      </div>
    </>
  );
}

export default Website;