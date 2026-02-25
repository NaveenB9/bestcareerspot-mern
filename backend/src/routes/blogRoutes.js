import express from 'express';
import { getAllPosts,
        getPostById,
        createPost,
        updatePost,
        deletePost} from '../controllers/blogController.js';


const router = express.Router();

// Define routes for blog posts
router.get('/', getAllPosts);

router.get('/:id', getPostById);

router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;


