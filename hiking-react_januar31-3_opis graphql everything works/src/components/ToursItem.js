import { Rating, Typography } from "@mui/material";
import { calculateAverageRating } from "../utils/hiking-app-utils";

const ToursItem = (props) => {
  const item = props.item;
  const tourReviews = props.tourReviews;

  const averageRating = calculateAverageRating(tourReviews)

  return (
    <>
      <div className="item">
        <div>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <div>Date: {item.date}</div>
          <div>Difficulty: {item.difficulty}</div>
          <div>Trail length: {item.trail_length}</div>
          <div>Max. number of participants: {item.max_participants}</div>
        </div>
        <div>
          Average rating: {averageRating}
          <Typography component="legend">Average rating</Typography>
          <Rating
            label="Average rating"
            name="rating"
            value={averageRating}
            readOnly
          />
        </div>
      </div>
    </>
  );
}

export default ToursItem;