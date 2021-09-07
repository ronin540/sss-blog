const express = require("express");

const Blog = require("../models/Blog");
const { checkToken } = require("./auth/tokenValidation");

const router = express.Router();

// add blog
router.post("/api/blog/add", checkToken, async (req, res) => {
  try {
    req.body.user_id = req.verifiedUser.userId;
    const blog = new Blog();
    await blog.create(req.body);
    res.status(201).json({
      success: 1,
      message: "blog created successfully",
    });
  } catch (error) {
    res.status(501).json({
      success: 0,
      message: "something went wrong",
    });
  }
});

//update blog
router.post("/api/blog/update/:id", checkToken, async (req, res) => {
  try {
    const blog_id = req.params.id;
    const blog = new Blog();
   const updated =  await blog.update(req.body, { blog_id });
   if(updated.affectedRows === 0) {
    return res.status(400).json({
      success: 0,
      message: "Invalid input",
    });
   }
    res.status(200).json({
      success: 1,
      message: "blog updated successfully",
    });
  } catch (error) {
    res.status(501).json({
      success: 0,
      message: "something went wrong",
    });
  }
});

// fetch one blog by id
router.get("/api/blog/:id", async (req, res) => {
  try {
    const blog_id = req.params.id;
    const blog = new Blog();
    const [blogData] = await blog.getOneBy({ blog_id });
    res.status(200).json({
      success: 1,
      blogData,
    });
  } catch (error) {
    res.status(500).json({
      succes: 0,
      message: "something went wrong",
    });
  }
});

// fetch all blogs
router.get("/api/blogs/all", async (req, res) => {
  try {
    const blog = new Blog();
    const allBlogs = await blog.getAll();
    res.status(200).json({
      success: 1,
      allBlogs,
    });
  } catch (error) {
    res.status(500).json({
      success: 0,
      message: "something went wrong",
    });
  }
});

// fetch all blogs by userId
router.get("/api/user/blogs/all/:userId", async (req, res) => {
  try {
    const user_id = req.params.userId;
    const blog = new Blog();
    const allBlogs = await blog.getOneBy({ user_id });
    if(!allBlogs.length > 0){
       return res.status(200).json({
            success: 1,
            message : 'no blogs found with this user'
          });
    }
    res.status(200).json({
      success: 1,
      allBlogs,
    });
  } catch (error) {
      console.log(error);
    res.status(500).json({
      success: 0,
      message: "something went wrong",
    });
  }
});

module.exports = router;
