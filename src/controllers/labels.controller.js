import Label from "../models/label.model.js"


export const createLabel = async (req, res) => {
    const userId = req.user.id
    const { label_name } = req.body
    try {

        if (!label_name) {
            return res.status(400).json({  success: false,message: "Name fields are Required",data:"" })
        }
        if (!userId) {
            return res.status(400).json({ message: "User are Required" })
        }
        const existingLabels = await Label.findOne({ label_name });
        if (existingLabels) {
            return res.status(409).json({ message: "Labels name already exists" });
        }

        const label = new Label({
            label_name, createdBy: userId
        })
        const savedLabel = await label.save();
        return res.status(201).json({
            success: true,
            message: "Label created successfully",
            data: savedLabel,
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getLabels = async (req, res) => {
    const page = req.query.page
    try {
        const limit = 10
        const skip = (page - 1) * limit
        const projects = await Label.find().skip(skip)
            .limit(Number(limit))
        const totalProjects = await Label.countDocuments();
        res.status(200).json({
            success: true,
            message: "Label fetched successfully",
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


export const updateLabel = async (req, res) => {

    const { labelId } = req.params
    const data = req.body

    try {
        if (!labelId) {
            return res.status(400).json({ message: " Label Id is required" })
        }
        if (!data) {
            return res.status({ message: "Fields are required" })
        }
        const updatedTask = await Label.findByIdAndUpdate(labelId, data)

        return res.status(200).json({ message: "Label Updated Successfully", updatedTask })
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}

export const deleteLabel = async (req, res) => {
    const { labelId } = req.params
    const userId = req.user.id

    try {
        if (!labelId) {
            return res.status(400).json({ message: "labelId is required" })
        }
        if (!mongoose.Types.ObjectId.isValid(labelId)) {
            return res.status(400).json({ success: false, message: "Invalid labelId ID" });
        }

        // Check if task exists
        const label = await Label.findById(labelId);
        if (!label) {
            return res.status(404).json({ success: false, message: "Label not found" });
        }
        if (!userId) {
            return res.status(400).json({ message: "unathourized" })
        }
        await Label.findByIdAndDelete(labelId)
        res.status(200).json({ message: "Label deleted Successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}