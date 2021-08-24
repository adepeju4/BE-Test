import mongoose from 'mongoose';

const Schema = mongoose.Schema;



const cartSchema = new Schema({
  user: {
        type: Schema.Types.ObjectId,
      ref: 'user'
  },
  cart: {
    type: [Schema.Types.ObjectId],
    ref: "Dish"
  }
  
});

let Checkout = mongoose.model('Checkout', cartSchema);

export default Checkout;