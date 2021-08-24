import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const favoritesSchema = new Schema({
 
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  dishes: [
    {
      active: {
        type: Boolean,
        default: false
      },
      type: Schema.Types.ObjectId,
      ref: 'Dish',
    }
  ],
});

let Favorite = mongoose.model('Favorite', favoritesSchema);

export default Favorite;