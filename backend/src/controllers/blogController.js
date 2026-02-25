

export function getAllPosts(req, res){
    res.status(200).json({ message: "Get all posts Successfully" });
}

export function getPostById(req, res){
    res.status(200).json({ message: `Get post with id ${req.params.id} Successfully` });
}
export function createPost(req, res){
    res.status(201).json({ message: "Post is created Successfully" });
}
export function updatePost(req, res){
    res.status(200).json({ message: `Post with id ${req.params.id} is updated Successfully` });
}
export function deletePost(req, res){
    res.status(200).json({ message: `Post with id ${req.params.id} is deleted Successfully` });
}
