import { useDispatch, useSelector } from "react-redux";
import { actionRouteSet } from "../redux/actions";
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const PageMyTours = (props) => {
  const dispatch = useDispatch();

  const myUserId = 1;
  const toursData = useSelector((state) => state.toursData);
  const reviewsData = useSelector((state) => state.reviewsData);
  const routeFreshness = useSelector((state) => state.routeFreshness);

  const handleClickAdd = (e) => {
    dispatch(actionRouteSet('TOUR_ADD_EDIT'));
  };

  console.log(toursData);

  let rows = [];
  let jsxData = null;
  let jsxSpinner = null;
  if (toursData.fetching) {
    jsxSpinner = (
      <CircularProgress />
    );
  } else {
    console.log(toursData)
    const arr = toursData.data;
    // exclude all tours that dont belong to me
    rows = arr.filter((item) => {
      if (item.user_created === myUserId) {
        // if my tour
        return true; // stay in display
      }
      return false; // all other tours will not be included
    });
    rows = arr;
  }

  return (
    <>
      <h1>My Tours</h1>
      <p>Tours created by me</p>
      <TableContainer component={Paper}>
        <Table sx={{ width: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align={'left'}>MY TOURS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item) => (
              <TableRow key={item.name}>
                <TableCell align={'left'}>
                  <div>
                    <div>{item.name}</div>
                    <div>{item.description}</div>
                    <div>{item.date}</div>
                    <div>{item.difficulty}</div>
                    <div>{item.trail_length}</div>
                    <div>{item.max_participants}</div>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={(e) => { }}
                    >Edit</Button>
                    <Button
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={(e) => { }}
                    >Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {jsxSpinner}
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleClickAdd}
      >Add new tour</Button>
    </>
  );
}

export default PageMyTours;