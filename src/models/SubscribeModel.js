import mongoose from 'mongoose';
import validator from 'validator';


const {Schema, model} = mongoose
const { isEmail } = validator 

const subscribeSchema = new Schema (
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            validate: [isEmail, 'Please enter your email']
        },
    },
    {timestamps: true}
)

export const Subscribe = model('subscribe', subscribeSchema)