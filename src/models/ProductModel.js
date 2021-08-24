import mongoose from 'mongoose';
import reviewSchema from './ReviewModel.js';


const Schema = mongoose.Schema;

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    size: {
      type: String,
      default: 'Small',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    countInStock: {
      type: Number,
      min: 1,
      max: 1000,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0
    }
   
  },
  {
    timestamps: true,
  }
);

let Dishes = mongoose.model('Dish', dishSchema);

export default Dishes;
