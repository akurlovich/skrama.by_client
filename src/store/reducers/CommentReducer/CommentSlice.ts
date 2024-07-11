import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICommentResponse } from "../../../types/ICommentResponse";
import { addComment, getAllCommentByBookID, getComments, updateCommentByModerator } from "./CommentActionCreators";

interface ICommentState {
  comment: ICommentResponse,
  comments: ICommentResponse[],
  commentsByBookID: ICommentResponse[],
  isLoading: boolean,
  error: string,
};

const initialState: ICommentState = {
  comment: {} as ICommentResponse,
  comments: [],
  commentsByBookID: [],
  isLoading: false,
  error: '',
};

export const commentSlice = createSlice({
  name: 'COMMENT',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<ICommentResponse>) => {
        state.isLoading = false;
        state.comment = action.payload;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action: PayloadAction<ICommentResponse[]>) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getAllCommentByBookID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCommentByBookID.fulfilled, (state, action: PayloadAction<ICommentResponse[]>) => {
        state.isLoading = false;
        state.commentsByBookID = action.payload;
      })
      .addCase(getAllCommentByBookID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateCommentByModerator.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCommentByModerator.fulfilled, (state, action: PayloadAction<ICommentResponse>) => {
        state.isLoading = false;
        state.comment = action.payload;
      })
      .addCase(updateCommentByModerator.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default commentSlice.reducer;