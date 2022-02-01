import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionRouteSet, actionRouteWithParamsSet, actionTourDelete, actionToursDataNeeded } from "../redux/actions";
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const PageMyTours = (props) => {
  const dispatch = useDispatch();
  const toursData = useSelector((state) => state.toursData);
  const routeFreshness = useSelector((state) => state.routeFreshness);
  const myUserId = useSelector((state) => state.myUserId);
  const reviewsData = useSelector((state) => state.reviewsData); // ???

  useEffect(() => {
    // ask for data / ask for refresh data
    dispatch(actionToursDataNeeded());
  }, [routeFreshness]);

  const handleClickAdd = (e) => {
    dispatch(actionRouteSet('TOUR_ADD'));
  };

  const _handleClickEdit = (_id) => {
    const routeParams = {
      editing_tour_id: _id
    }
    dispatch(actionRouteWithParamsSet('TOUR_EDIT', routeParams));
  };

  const _handleClickDelete = (_id) => {
    dispatch(actionTourDelete({ tour_id: _id }));
  };


  console.log(toursData);

  let rows = [];
  let jsxZeroData = (
    <p>No itmes to display.</p>
  );
  let jsxData = null;
  let jsxSpinner = null;
  if (toursData.fetching) {
    jsxSpinner = (
      <CircularProgress />
    );
  } else {
    console.log(toursData);
    // exclude all tours that dont belong to me
    rows = toursData.data.filter((item) => {
      if (item.user_created === myUserId) {
        // if my tour
        return true; // stay in display
      }
      return false; // all other tours will not be included
    });
    if (rows.length > 0) {
      jsxZeroData = null;
    }
  }

  return (
    <>
      <Typography component="h1" variant="h3">My Tours</Typography>
      <p>You can create tour and edit or delete tours you created.</p>
      <TableContainer component={Paper}>
        <Table sx={{ width: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align={'left'}>TOURS CREATED BY ME</TableCell>
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
                      onClick={(e) => { _handleClickEdit(item._id) }}
                    >Edit</Button>
                    <Button
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={(e) => { _handleClickDelete(item._id) }}
                    >Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {jsxZeroData}
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