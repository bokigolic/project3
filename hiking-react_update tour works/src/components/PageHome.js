import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionReviewsDataNeeded, actionToursDataNeeded } from "../redux/actions";
import { selectAllReviewsForSingleTour } from "../utils/hiking-app-utils";
import { filterTours } from "../utils/tours-filter-utils";
import { CircularProgress, Typography } from "@mui/material";
import ToursItem from "./ToursItem";
import FormTourFilter from "./FormTourFilter";
// import ToursItems from "./ToursItems";

const PageHome = (props) => {
  const dispatch = useDispatch();

  const toursData = useSelector((state) => state.toursData);
  const reviewsData = useSelector((state) => state.reviewsData);
  const routeFreshness = useSelector((state) => state.routeFreshness);

  const [filterParams, setFilterParams] = useState({});

  useEffect(() => {
    // run every time when routeFreshness change
    // ask for data / ask for refresh data
    dispatch(actionToursDataNeeded());
    dispatch(actionReviewsDataNeeded());
  }, [routeFreshness]);


  const _cb = (filterState) => {
    console.log('cb');
    console.log(filterState);
    setFilterParams({ ...filterState });
  };

  let jsxData = null;
  let jsxSpinner = null;
  if (toursData.fetching) {
    jsxSpinner = (
      <CircularProgress />
    );
  } else {
    console.log(toursData)
    const arr = toursData.data;
    const filteredTours = filterTours(filterParams, arr);
    jsxData = filteredTours.map((item, index) => {
      const tourId = item._id;
      const tourReviews = selectAllReviewsForSingleTour(tourId, reviewsData.data);
      return (
        <ToursItem
          key={index}
          item={item}
          tourReviews={tourReviews}
        />
      )
    });
  }

  return (
    <>
      <Typography component="h1" variant="h3">Welcome</Typography>
      <Typography component="h2" variant="h4">Browse tours</Typography>
      <FormTourFilter cb={_cb} />
      <div className="items">
        {jsxData}
      </div>
      {jsxSpinner}
    </>
  );
}

export default PageHome;