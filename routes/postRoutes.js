import express from "express";
import {
  createPost,
  getAdminPosts,
  getPostDetails,
  getPostsForAllUser,
  getuserDetails,
  getUserPosts,
} from "../controllers/PostController.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/all", getPostsForAllUser);
router.post("/admin", getAdminPosts);
router.post("/user", getUserPosts);
router.post("/detail", getPostDetails);
router.post("/userDetail", getuserDetails);

export const postRouter = router;
