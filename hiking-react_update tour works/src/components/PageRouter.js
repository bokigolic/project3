import { useSelector } from "react-redux";
import PageHome from "./PageHome";
import FormRegister from "./FormRegister";
import FormLogin from "./FormLogin";
import PageMyTours from "./PageMyTours";
import FormTour from "./FormTour";
import FormTourEdit from "./FormTourEdit";
import FormReview from "./FormReview";


const PageRouter = (props) => {
  const route = useSelector((state) => state.route);
  const routeParams = useSelector(state => state.routeParams);

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
  } else if (route === 'TOUR_ADD') {
    jsxRoute = (
      <FormTour />
    );
  } else if (route === 'TOUR_EDIT') {
    const editing_tour_id = routeParams.editing_tour_id;
    jsxRoute = (
      <FormTourEdit editing_tour_id={editing_tour_id} />
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