
import { Request, Response } from "express";
import SalesExpert from "../models/SalesExpert.model";

// Add Sales Expert
export const addSalesExpert = async (req: Request, res: Response) => {
    try {
        const { name, designation, region, phone, officeLocationId, isActive } = req.body;

        const newExpert = new SalesExpert({
            name,
            designation,
            region,
            phone,
            officeLocationId,
            isActive
        });

        await newExpert.save();

        res.status(201).json({
            message: "Sales Expert added successfully",
            data: newExpert
        });
    } catch (error) {
        console.error("Error adding sales expert:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

// Get All Sales Experts
export const getSalesExperts = async (req: Request, res: Response) => {
    try {
        const experts = await SalesExpert.find()
            .populate("officeLocationId")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Sales Experts fetched successfully",
            data: experts
        });
    } catch (error) {
        console.error("Error fetching sales experts:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

// Update Sales Expert
export const updateSalesExpert = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedExpert = await SalesExpert.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        ).populate("officeLocationId");

        if (!updatedExpert) {
            return res.status(404).json({ message: "Sales Expert not found" });
        }

        res.status(200).json({
            message: "Sales Expert updated successfully",
            data: updatedExpert
        });
    } catch (error) {
        console.error("Error updating sales expert:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

// Delete Sales Expert
export const deleteSalesExpert = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedExpert = await SalesExpert.findByIdAndDelete(id);

        if (!deletedExpert) {
            return res.status(404).json({ message: "Sales Expert not found" });
        }

        res.status(200).json({
            message: "Sales Expert deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting sales expert:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
