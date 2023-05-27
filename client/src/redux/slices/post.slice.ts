import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface PostState {
  createPost: {
    isShow: boolean;
    content?: any;
  };
  editPost: {
    isShow: boolean;
    content?: any;
  };
}

const initialState: PostState = {
  createPost: { isShow: false },
  editPost: { isShow: false },
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setCreatePost: (state, action: PayloadAction<PostState['createPost']>) => {
      state.createPost = action.payload;
    },
    setEditPost: (state, action: PayloadAction<PostState['editPost']>) => {
      state.editPost = action.payload;
    },
  },
});

export const { setCreatePost, setEditPost } = postSlice.actions;
export const createPostSelector = (state: RootState) => state.post.createPost;
export const editPostSelector = (state: RootState) => state.post.editPost;

export default postSlice.reducer;
