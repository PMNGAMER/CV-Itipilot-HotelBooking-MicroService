import Post from "../models/post.js";
import SavedPost  from "../models/savedpost.js";
import {cookie} from "../cookie.js";
export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const filter = {
      city: query.city || undefined,
      type: query.type || undefined,
      property: query.property || undefined,
      bedroom: parseInt(query.bedroom) || undefined,
      price: {
        $gte: parseInt(query.minPrice) || undefined,
        $lte: parseInt(query.maxPrice) || undefined,
      },
    };

    const posts = await Post.find(filter);

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  const uid = cookie._id;
  try {
    const post = await Post.findById(id).populate({
      path: "postDetail",
      model: "PostDetail",
    }).populate({
      path: "user",
      select: "username avatar",
      model: "User",
    });
    const saved = await SavedPost.findOne({
      postId: id,
      userId: uid,
    });
    res.status(200).json({ ...post._doc, isSaved: saved ? true : false });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = cookie._id;


  try {
    const newPost = await Post.create({
      ...body.postData,
      userId: tokenUserId,
      postDetail: body.postDetail,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    // Implement update logic using Mongoose update methods
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update posts" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = cookie._id;


  try {
    const post = await Post.findById(id);

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
