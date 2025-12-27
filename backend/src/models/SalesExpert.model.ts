import mongoose from "mongoose";

const salesExpertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        trim: true
    },
    region: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    officeLocationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OfficeLocation"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model("SalesExpert", salesExpertSchema);
