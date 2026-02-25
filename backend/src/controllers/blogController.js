import Blog from "../models/Blog.js";


export async function getAllPosts(_, res) {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 }); // -1 will sort in desc. order (newest first)
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getAllPosts controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function getPostById(req, res) {
  try {
    // Validate ID format before querying
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found!" });
    res.status(200).json(post);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function createPost(req, res){
  try {
    const { title, content, author} = req.body;
    const post = new Blog({ title, content, author});

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error in createPost controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function updatePost(req, res) {
  try {
    const { title, content, author } = req.body;
    const updatedPost = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      {
        new: true,
      }
    );

    if (!updatedPost) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error in updatePost controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function deletePost(req, res) {
  try {
    const deletedPost = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully!" });
  } catch (error) {
    console.error("Error in deletePost controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

