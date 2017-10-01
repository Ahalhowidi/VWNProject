import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import PostsReducer from "./reducer_posts";

const rootReducer = combineReducers({
  posts: PostsReducer,
 
});

export default rootReducer;
