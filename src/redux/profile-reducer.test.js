import profileReducer, {
  addPostActionCreator,
  deletePost,
} from "./profile-reducer";

let state = {
  posts: [
    { id: 1, message: "Hi! how are you?", likesCount: 12 },
    { id: 2, message: "it's my first post", likesCount: 20 },
    { id: 3, message: "blabla", likesCount: 5 },
  ],
};

test("length of post should be incremented", () => {
  // 1. test data
  let action = addPostActionCreator("newPostText!!!");
  // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(4);
});

test("message of new post should be correct", () => {
  // 1. test data
  let action = addPostActionCreator("newPostText!!!");
  // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts[3].message).toBe("newPostText!!!");
});

test("after deleting length of posts should be decrement", () => {
  // 1. test data
  let action = deletePost(1);
  // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(2);
});

test("after deleting length of posts shouldn't be decrement if id is incorrect", () => {
  // 1. test data
  let action = deletePost(1000);
  // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(3);
});
