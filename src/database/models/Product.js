import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        images: [{ type: String }], // array of Cloudinary URLs
        category: { type: String, default: "clothing" },
        stock: { type: Number, default: 1 },
        recycledInfo: { type: String }, // extra field to describe material
    },
    { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);