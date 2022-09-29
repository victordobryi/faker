import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface App {
  region: string;
  seed: number;
  error: number;
}

const initialState: App = {
  region: '',
  seed: 123,
  error: 0
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
    },
    setError(state, action: PayloadAction<number>) {
      state.error = action.payload;
    }
  }
});

export default appSlice.reducer;
