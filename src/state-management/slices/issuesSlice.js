import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { taskStatusModel } from '../../view/pages/cabinetBoard/constants';
import { collection, db, getDocs } from '../../services/firebase/firebase';

const initialState = {
    issueColumns: {},
    count: 0,
    loading: false
}

export const fetchIssuesData = createAsyncThunk(
  'data/fetchData',
  async () => {
      const updatedTaskStatusModel = taskStatusModel();
      const queryData = await getDocs(collection(db, 'issue'));
      queryData.docs.forEach(doc => {
          const data = doc.data();
          const { status } = data;

          if (updatedTaskStatusModel[status]) {
              updatedTaskStatusModel[status].items.push(data)
          }

      });

      return updatedTaskStatusModel;
  }
)

const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {
      changeIssueColumns: (state, action) => {
        const columns = state.issueColumns;
        const { source, destination }  = action.payload;
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [ removed ] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);

        let changedColumns = {};
        if (source.droppableId !== destination.droppableId) {
          changedColumns = {
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceItems
            },
            [destination.droppableId]: {
              ...destColumn,
              items: destItems
            }
          }
        } else {
          const sourceColumn = columns[source.droppableId];
          const sourceColumnItems = sourceColumn.items;
          const [removed] = sourceColumnItems.splice(source.index, 1);
          sourceColumnItems.splice(destination.index, 0, removed);
          changedColumns = {
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceColumnItems
            }
          }
        }

        state.issueColumns = changedColumns;
      }

    },
    extraReducers: (promise) => {
        promise
          .addCase(fetchIssuesData.pending, (state) => {
              state.loading = true;
          })
          .addCase(fetchIssuesData.fulfilled, (state, action) => {
              state.loading = false;
              state.issueColumns = action.payload
          })
    }
});

export const { changeIssueColumns } = issuesSlice.actions;
export default issuesSlice.reducer;


