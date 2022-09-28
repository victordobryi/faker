import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Region {
  region: string;
}

const initialState: Region = {
  region: ''
};

export const regionSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setRegion(state, action: PayloadAction<string>) {
      state.region = action.payload;
    }
  }
});

export default regionSlice.reducer;
