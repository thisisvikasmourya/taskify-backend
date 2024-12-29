import Project from "../models/project.model.js"


export const createProject = async (req, res) => {
    const userId = req.user.id
    const { project_name, description } = req.body
    try {
        console.log(req.headers.authorization, "there")
        if (!project_name || !description) {
            return res.status(400).json({ message: "All Project fields are Required" })
        }
        if (!userId) {
            return res.status(400).json({ message: "User are Required" })
        }

        const existingProject = await Project.findOne({ project_name });
        if (existingProject) {
            return res.status(409).json({ message: "Project name already exists" });
        }

        const project = new Project({
            project_name, description, createdBy: userId
        })
        const savedProject = await project.save();
        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: savedProject,
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAllProject = async (req, res) => {
    const page = req.query.page
    try {
        const limit = 10
        // console.log(page, "page")
        const skip = (page - 1) * limit

        const projects = await Project.find().skip(skip)
            .limit(Number(limit))
        const totalProjects = await Project.countDocuments();
        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            data: projects,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(totalProjects / limit),
                totalProjects,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAllProjectList = async (req, res) => {
    try {
        const projects = await Project.find()
        console.log(projects)
        const projectList = projects.map(list=>({
            id:list._id,
            name:list.project_name
        }))
        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            data: projectList

        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateProject = async (req, res) => {

    const { projectId } = req.params
    const data = req.body
    // console.log(taskId, "taskId")
    try {
        if (!projectId) {
            return res.status(400).json({ message: " Task Id is required" })
        }
        if (!data) {
            return res.status({ message: "Fields are required" })
        }
        const updatedTask = await Project.findByIdAndUpdate(projectId, data)

        return res.status(200).json({ message: "TasK Updated Successfully", updatedTask })
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}

export const deleteProject = async (req, res) => {
    const { projectId } = req.params
    const userId = req.user.id

    try {
        console.log(req, "User")
        if (!projectId) {
            return res.status(400).json({ message: "projectId is required" })
        }
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ success: false, message: "Invalid projectId ID" });
        }

        // Check if task exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        if (!userId) {
            return res.status(400).json({ message: "unathourized" })
        }
        await Project.findByIdAndDelete(projectId)
        res.status(200).json({ message: "Project deleted Successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}