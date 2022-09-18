import {
  newPostEmmiter,
  updatePostEmmiter,
} from "../EventMonitors/PostEventMonitor.js";
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
import { client } from "../index.js";

export const createPost = async (req, res) => {
  const { title, description, category, username, name, amount } = req.body;
  const pipeline = [
    {
      $match: {
        operationType: "insert",
      },
    },
  ];
  newPostEmmiter(client, 10000, pipeline);

  const data = {
    title: title,
    description: description,
    category: category,
    name: name,
    username: username,
    amount: amount,
    status: "Pending",
    paymentList: [],
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
  const result = await fetchPostForAllUser();
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
  const result = await fetchPostdetails(_id);

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
  const result = await fetchUserdetails(username);

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

  if (status != "Rejected") {
    const pipeline = [
      {
        $match: {
          operationType: "update",
        },
      },
    ];

    updatePostEmmiter(client, 10000, pipeline);
  }
  const result = await updatePostStatus(id, status);

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
  const result = await deletePostById(id);

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
