
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Helper to load models from dist
const loadModel = (modelName) => {
    try {
        const model = require(`../dist/models/${modelName}`);
        return model.default || model;
    } catch (e) {
        console.error(`Could not load model ${modelName}. Ensure project is built (npm run build).`, e.message);
        process.exit(1);
    }
};

const SalesExpert = loadModel("SalesExpert.model.js");
const OfficeLocation = loadModel("OfficeLocation.model.js");

const seedSalesExperts = async () => {
    try {
        // Connected to MongoDB (handled by index.js)

        // 🔗 Fetch offices (Use Regex for flexibility)
        const getOfficeId = async (cityPattern) => {
            const office = await OfficeLocation.findOne({
                "address.city": { $regex: cityPattern, $options: "i" }
            });
            if (!office) console.warn(`⚠️ Warning: Office location matching '${cityPattern}' not found. Expert will have no office assigned.`);
            return office ? office._id : null;
        };

        const delhiOfficeId = await getOfficeId("Delhi");
        const bangaloreOfficeId = await getOfficeId("Bangalore");
        const mumbaiOfficeId = await getOfficeId("Mumbai");
        const kolkataOfficeId = await getOfficeId("Kolkata");

        const salesExperts = [
            {
                name: "Harsh Pradhan",
                designation: "General Manager – Sales",
                region: "North",
                phone: "+91-9289729731",
                officeLocationId: delhiOfficeId
            },
            {
                name: "Varghese T C",
                designation: "Senior Manager – Sales",
                region: "South",
                phone: "+91-9746444332",
                officeLocationId: bangaloreOfficeId // Might be null if Bangalore office missing
            },
            {
                name: "Anup Kesharinath Jain",
                designation: "General Manager – Sales",
                region: "West",
                phone: "+91-9819223816",
                officeLocationId: mumbaiOfficeId
            },
            {
                name: "Satyabrata Singh",
                designation: "Deputy General Manager – Sales",
                region: "East",
                phone: "+91-9433024788",
                officeLocationId: kolkataOfficeId
            }
        ];

        for (const expert of salesExperts) {
            await SalesExpert.updateOne(
                { phone: expert.phone },
                { $set: expert }, // Use $set to update fields
                { upsert: true }
            );
        }

        console.log("✅ Sales Experts seeded details updated");

    } catch (error) {
        console.error("❌ Error seeding Sales Experts:", error);
    }
};

module.exports = seedSalesExperts;
