import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, default: 1 },
            }
        ],
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ["pending", "paid", "shipped", "delivered"],
            default: "pending",
        },
        paymentIntentId: { type: String }, // Stripe Info
    },
    { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);