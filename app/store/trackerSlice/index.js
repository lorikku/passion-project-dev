import { createSlice, nanoid } from '@reduxjs/toolkit';

//Voorbeeld 'starter state'
const initialState = [];

/* De redux toolkit slice, die andere reducers combineert en in 
1 grote reducer steekt dat zich als het ware 
als een 'slice' van de root reducer gedraagt */
export const trackerSlice = createSlice({
  name: 'tracker',
  initialState,
  reducers: {
    addData: (state, action) => {
        state.push({
          id: nanoid(),
          ...action.payload,
        });
    },
  },
});

//Action types exporten om een dispatch te kunnen uitvoeren naar de juiste reducer
export const { addData } = trackerSlice.actions;

//Een select functie die de store 'select query' returnt om te gebruiken bij useSelector()
export const selectTracker = (store) => store.tracker;

//De 'sliced' reducer die ge-export wordt om toe te voegen aan de globale store
export default trackerSlice.reducer;
