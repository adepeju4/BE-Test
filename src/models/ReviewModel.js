import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
    title: {
      type: String,
      default: "No Title"
    },
    author: {
      type: String,
      default: "No Name"
    },
    dishId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

let Reviews = mongoose.model('Review', reviewSchema);

export default Reviews;

