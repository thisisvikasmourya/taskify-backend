import Comment from "../models/comment.model.js";
import Task from "../models/task.model.js";

export const addComment = async (req, res) => {
    const { taskId } = req.params;
    const { content, userId } = req.body;

    try {
        if (!taskId) return res.status(400).json({ message: "Task ID is required." });
        if (!content) return res.status(400).json({ message: "Content is required." });
        if (!userId) return res.status(400).json({ message: "User ID is required." });

        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found." });

        const newComment = new Comment({ content, task: taskId, user: userId });
        await newComment.save();

        task.comments.push(newComment._id);
        await task.save();

        return res.status(201).json({ message: "Comment added successfully.", comment: newComment });
    } catch (error) {
        console.error("Error adding comment:", error.message);
        return res.status(500).json({ message: "An error occurred while adding the comment.", error: error.message });
    }
};

export const updateComment = async (req, res) => {
    const { taskId } = req.params;
    const { content, userId, commentId } = req.body;

    try {
        if (!taskId) return res.status(400).json({ message: "Task ID is required." });
        if (!commentId) return res.status(400).json({ message: "Comment ID is required." });
        if (!content) return res.status(400).json({ message: "Content is required." });
        if (!userId) return res.status(400).json({ message: "User ID is required." });

        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: "Task not found." });

        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found." });

        comment.content = content;
        comment.user = userId;
        comment.task = taskId;
        await comment.save();

        return res.status(200).json({ message: "Comment updated successfully.", comment });
    } catch (error) {
        console.error("Error updating comment:", error.message);
        return res.status(500).json({ message: "An error occurred while updating the comment.", error: error.message });
    }
};

export const getCommentByTaskId = async (req, res) => {
    const { taskId } = req.params;

    try {
        if (!taskId) return res.status(400).json({ message: "Task ID is required." });

        const comments = await Comment.find({ task: taskId })
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({ message: "Comments retrieved successfully.", comments });
    } catch (error) {
        console.error("Error fetching comments:", error.message);
        return res.status(500).json({ message: "An error occurred while fetching comments.", error: error.message });
    }
};

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        if (!commentId) return res.status(400).json({ message: "Comment ID is required." });

        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({ message: "Comment not found." });

        await comment.deleteOne();

        return res.status(200).json({ message: "Comment deleted successfully.", comment });
    } catch (error) {
        console.error("Error deleting comment:", error.message);
        return res.status(500).json({ message: "An error occurred while deleting the comment.", error: error.message });
    }
};
