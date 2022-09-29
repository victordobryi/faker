import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface App {
  region: string;
  seed: number;
}

const initialState: App = {
  region: '',
  seed: 123
};

export const appSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setRegion(state, action: PayloadAction<string>) {
      state.region = action.payload;
    },
    setSeed(state, action: PayloadAction<number>) {
      state.seed = action.payload;
    }
  }
});

export default appSlice.reducer;
