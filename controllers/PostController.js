import {
  fetchPostdetails,
  fetchPostForAllAdmin,
  fetchPostForAllUser,
  fetchPostForUser,
  fetchUserdetails,
  savePost,
} from "../models/PostModal.js";

export const createPost = async (req, res) => {
  const { title, description, category, username, name, amount } = req.body;

  const data = {
    title: title,
    description: description,
    category: category,
    name: name,
    username: username,
    amount: amount,
    status: "New",
    createdOn: new Date(),
  };
  const result = await savePost(data);

  if (!result) {
    return res.send({
      message: "Error in creating post..Please try again later",
      success: false,
    });
  }

  res.send({
    message: "Post created successfully",
    success: true,
    post: result,
  });
};

export const getPostsForAllUser = async (req, res) => {
  const { usetType, username } = req.body;
  let result = null;
  console.log("get all post-usetType", usetType, username);
  result = await fetchPostForAllUser();
  // if (usetType && usetType != "admin") {
  //   result = await fetchPostByUsertype(usetType, username);
  // } else {
  //   result = await fetchPostByUsertype();
  // }

  console.log("get all post-result", result);
  if (!result) {
    return res.send({
      message: "Error in getting post..Please try again later",
      success: false,
    });
  }

  res.send({
    message: "Post fetched successfully",
    success: true,
    posts: result,
  });
};

export const getAdminPosts = async (req, res) => {
  const result = await fetchPostForAllAdmin();

  console.log("get all post-inside getAdminPosts", result);
  if (!result) {
    return res.send({
      message: "Error in getting post..Please try again later",
      success: false,
    });
  }

  res.send({
    message: "Post fetched successfully",
    success: true,
    posts: result,
  });
};

export const getUserPosts = async (req, res) => {
  const { username } = req.body;
  const result = await fetchPostForUser(username);

  console.log("get all post-inside getUserPosts", result);
  if (!result) {
    return res.send({
      message: "Error in getting post..Please try again later",
      success: false,
    });
  }

  res.send({
    message: "Post fetched successfully",
    success: true,
    posts: result,
  });
};

export const getPostDetails = async (req, res) => {
  const { _id } = req.body;
  console.log("get all post-inside getPostDetails", _id);
  const result = await fetchPostdetails(_id);

  console.log("get all post-inside getPostDetails", result);
  if (!result) {
    return res.send({
      message: "Error in getting post..Please try again later",
      success: false,
    });
  }

  res.send({
    message: "Post fetched successfully",
    success: true,
    post: result,
  });
};

export const getuserDetails = async (req, res) => {
  const { username } = req.body;
  console.log("get all post-inside getuserDetails", username);
  const result = await fetchUserdetails(username);

  console.log("get all post-inside getuserDetails", result);
  if (!result) {
    return res.send({
      message: "Error in getting details..Please try again later",
      success: false,
    });
  }
  const user = {
    firstname: result.firstname,
    lastname: result.lastname,
    phone: result.phone,
    about: result.about,
  };

  res.send({
    message: "User details fetched successfully",
    success: true,
    userDetails: user,
  });
};
