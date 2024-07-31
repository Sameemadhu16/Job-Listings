import Post from "../models/post.model.js";

export const getJobs = async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error);
    }
};
