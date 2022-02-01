import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHandleInputChange } from "../hooks/useHandleInputChange";
import { actionToursDataNeeded, actionTourUpdate } from "../redux/actions";
import { selectTourById } from "../utils/hiking-app-utils";
import { Box, Button, Container, createTheme, CssBaseline, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import DateAdapter from '@mui/lab/AdapterDateFns'; // date-fns
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";


// FORM TOUR EDIT

const theme = createTheme();

const FormTourEdit = (props) => {
  const editing_tour_id = props.editing_tour_id;

  const dispatch = useDispatch();

  const toursData = useSelector((state) => state.toursData);

  const preset = {
    name: '',
    description: '',
    date: '',
    difficulty: '',
    trail_length: 0,
    max_participants: 0,
  };

  const [state, handleChange, setState] = useHandleInputChange(preset); // form state

  useEffect(() => {
    // run only once when component mount
    // ask for data
    dispatch(actionToursDataNeeded());
  }, []);

  useEffect(() => {
    //
    if (toursData && Array.isArray(toursData.data)) {
      // if data is fetched
      const editingTour = selectTourById(editing_tour_id, toursData.data);
      console.log('editingTour');
      console.log(editingTour);
      if (editingTour) {
        // if there is a tour with ID we clicked...
        // inserting editing tour data into form
        setState({
          ...preset,
          ...editingTour
        });
      }
    }
  }, [toursData]);

  const _handleDateChange = (dateValue) => {
    console.log('_handleDateChange', dateValue);
    setState({
      ...state,
      date: dateValue
    });
  };

  const validator = (state) => {
    let test = true;

    if (!state.name || typeof state.name !== 'string' || state.name.length < 3) {
      test = false;
    }
    if (!state.description || typeof state.description !== 'string' || state.description === '') {
      test = false;
    }

    return test;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handle submit');
    if (validator(state)) {
      // validated
      console.log('handle submit validated');
      dispatch(actionTourUpdate(state));
    } else {
      window.alert('Form validation fail! Check your fields.');
    }
  };


  return (
    <>
      <div className={"form-login"}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  width: 300,
                  // height: 300,
                  // backgroundColor: 'primary.dark',
                  /*
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                  },
                  */
                }}>
                <Typography component="h1" variant="h4">Edit tour</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    label="Tour name"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={state.description}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={4}
                    margin="normal"
                    fullWidth
                  />
                  <MobileDatePicker
                    label="Date"
                    name="date"
                    value={state.date}
                    onChange={_handleDateChange}
                    inputFormat="MM/dd/yyyy"
                    renderInput={(params) => <TextField {...params} />}
                  />
                  {/*
                  <Select
                    label="Difficulty"
                    name="difficulty"
                    value={state.difficulty}
                    onChange={handleChange}
                  >
                    <MenuItem value={'easy'}>Easy</MenuItem>
                    <MenuItem value={'medium'}>Medium</MenuItem>
                    <MenuItem value={'hard'}>Hard</MenuItem>
                  </Select>
                  */}
                  <FormControl>
                    <FormLabel >Difficulty</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="difficulty"
                      value={state.difficulty}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="EASY" control={<Radio />} label="Easy" />
                      <FormControlLabel value="MEDIUM" control={<Radio />} label="Medium" />
                      <FormControlLabel value="HARD" control={<Radio />} label="Hard" />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    label="Trail length (miles)"
                    name="trail_length"
                    value={state.trail_length}
                    onChange={handleChange}
                    variant="outlined"
                    type="number"
                    margin="normal"
                  />
                  <TextField
                    label="Max. number of participants"
                    name="max_participants"
                    value={state.max_participants}
                    onChange={handleChange}
                    variant="outlined"
                    type="number"
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                  >Save changes</Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </LocalizationProvider>
      </div>
    </>
  );
}

export default FormTourEdit;