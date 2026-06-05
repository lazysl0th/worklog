import type { RowSelectionState } from '@tanstack/react-table';

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface WorkLogListState {
  rowSelection: RowSelectionState;
}

const initialState: WorkLogListState = {
  rowSelection: {},
};

export const workLogListSlice = createSlice({
  name: 'workLogList',
  initialState,
  selectors: {
    getSelectedRows: (state) => state.rowSelection,
  },
  reducers: {
    setRowSelection: (state, action: PayloadAction<RowSelectionState>) => {
      state.rowSelection = action.payload;
    },
    clearSelection: (state) => {
      state.rowSelection = {};
    },
  },
});

export const { setRowSelection, clearSelection } = workLogListSlice.actions;
export const { getSelectedRows } = workLogListSlice.selectors;
