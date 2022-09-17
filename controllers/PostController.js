import {
  deletePostById,
  fetchPostdetails,
  fetchPostForAllAdmin,
  fetchPostForAllUser,
  fetchPostForUser,
  fetchUserdetails,
  savePost,
  updatePostStatus,
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
    status: "Pending",
    paymentList: null,
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

export const updateStatus = async (req, res) => {
  const { id, status } = req.body;
  console.log("get all post-inside updateStatus", id, status);
  const result = await updatePostStatus(id, status);

  console.log("get all post-inside updateStatus", result);
  if (!result) {
    return res.send({
      message: "Error in updating status.Please try again later",
      success: false,
    });
  }

  res.send({
    message: "status updated  successfully",
    success: true,
    result: result,
  });
};

export const deletePost = async (req, res) => {
  const { id } = req.body;
  console.log("get all post-inside deletePost", id);
  const result = await deletePostById(id);

  console.log("get all post-inside updateStatus", result);
  if (!result) {
    return res.send({
      message: "Error in updating status.Please try again later",
      success: false,
    });
  }

  res.send({
    message: "Post deleted  successfully",
    success: true,
  });
};
