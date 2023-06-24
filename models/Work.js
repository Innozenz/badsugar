import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true, unique: true},
        image: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

const Work = mongoose.models.Work || mongoose.model("Work", workSchema);

export default Work;
