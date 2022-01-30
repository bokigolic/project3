import { useSelector } from "react-redux";
import PageHome from "./PageHome";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";
import FormReview from "./FormReview";
import FormTour from "./FormTour";
import PageMyTours from "./PageMyTours";


const PageRouter = (props) => {
  const route = useSelector((state) => state.route);

  let jsxRoute = null;
  if (route === 'HOME') {
    jsxRoute = (
      <PageHome />
    );
  } else if (route === 'CART') {
    jsxRoute = (
      <PageHome />
    );
  } else if (route === 'REGISTER') {
    jsxRoute = (
      <FormRegister />
    );
  } else if (route === 'LOGIN') {
    jsxRoute = (
      <FormLogin />
    );
  } else if (route === 'MY_TOURS') {
    jsxRoute = (
      <PageMyTours />
    );
  } else if (route === 'TOUR_ADD_EDIT') {
    jsxRoute = (
      <FormTour />
    );
  } else if (route === 'REVIEW') {
    jsxRoute = (
      <FormReview />
    );
  } else {
    jsxRoute = (
      <div>Route not found!</div>
    );
  }

  return (
    <>
      {jsxRoute}
    </>
  );
}

export default PageRouter;