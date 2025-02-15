import Post from "../models/post.model.js";
import User from "../models/user.model.js";
export const getJobs = async (req, res, next) => {
    try {
        if (req.params.postId) {
            // Fetch specific job post by ID
            const post = await Post.findById(req.params.postId);
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }
            return res.status(200).json(post);
        } else {
            // Fetch job posts with pagination
            const startIndex = parseInt(req.query.startIndex) || 0;
            const limit = parseInt(req.query.limit) || 9;
            const sortDirection = req.query.sort === 'asc' ? 1 : -1;

            const posts = await Post.find({
                ...(req.query.jobId && { jobId: req.query.jobId }),
            })
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

            res.status(200).json(posts);
        }
    } catch (error) {
        next(error);
    }
};

export const addcart = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const postId = req.body.postId;

        if (!userId || !postId) {
            return res.status(400).json({ message: "User ID and Post ID are required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.cart = user.cart || [];
        if (!user.cart.includes(postId)) {
            user.cart.push(postId);
        }

        await user.save();

        res.status(200).json({ message: "Post added to cart successfully", cart: user.cart });
    } catch (error) {
        next(error);
    }
};

export const addappliedjobs = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const postId = req.body.postId;

        if (!userId || !postId) {
            return res.status(400).json({ message: "User ID and Post ID are required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.appliedjobs = user.appliedjobs || [];
        if (!user.appliedjobs.includes(postId)) {
            user.appliedjobs.push(postId);
        }

        await user.save();

        res.status(200).json({ message: "Post added to applied job list successfully", appliedjobs: user.appliedjobs });
    } catch (error) {
        next(error);
    }
};



export const getcart = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartPostIds = user.cart || [];
        const cartPosts = await Post.find({ _id: { $in: cartPostIds } });

        res.status(200).json({ message: "User's cart retrieved successfully", cartPosts });
    } catch (error) {
        next(error);
    }
};

export const getapplied = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const appliedPostIds = user.appliedjobs || [];
        const appliedPosts = await Post.find({ _id: { $in: appliedPostIds } });

        res.status(200).json({ message: "User's cart retrieved successfully", appliedPosts });
    } catch (error) {
        next(error);
    }
};

export const deleteCartpost = async (req, res, next) => {
    const { cartPostIdToDelete, currentUserId } = req.params;

    try {
        // Find the user by _id
        const user = await User.findById(currentUserId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove cartPostIdToDelete from the user's cart array
        user.cart = user.cart.filter(postId => postId !== cartPostIdToDelete);

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'Cart post deleted successfully', user });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}
