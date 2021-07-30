import mongoose from 'mongoose'

const {Schema, model} = mongoose

const mealSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        countInStock: {
            type: Number,
            required: true
        },
        numReviews: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        }

    }
)

export const Meal = model('meal', mealSchema)