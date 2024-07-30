import Post from "../models/post.model.js";
export const getjobs = async(req, res, next) => {
    try{
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const post = await Post.find({
            ...(req.query.jobId && { jobId: req.query.jobId}),
        }).sort({updatedAt: sortDirection}).skip(startIndex).limit(limit);
    }catch (error) {
        next(error)
    }
}
