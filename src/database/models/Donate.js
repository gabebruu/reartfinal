import mongoose from "mongoose";

const DonateSchema = new mongoose.Schema(
 {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemsDonated: {
      type: Number,
      required: true,
      min: 1,
      max: 25, // Max 25 items per user
    },
    discountEarned: {
      type: Number, // Discount in %
      default: 0,
    },
  },
  { timestamps: true }
);

// Auto-calculate discount before saving
DonateSchema.pre("save", function (next) {
  // 1 item = 2% discount (adjust if needed)
  const discountPerItem = 2;
  const maxDiscount = 50; // 50% max

  this.discountEarned = Math.min(this.itemsDonated * discountPerItem, maxDiscount);
  next();
});

export default mongoose.models.Donate || mongoose.model("Donate", DonateSchema);
