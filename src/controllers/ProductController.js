import Dishes from '../models/ProductModel.js';
import Reviews from '../models/ReviewModel.js';



export const getDishes = async (req, res) => {
  try {
     const { dishId } = req.params;
    let dishes = await Dishes.find().exec();
    const getReviews = await Reviews.find({ dishId }).exec();

    let { featured } = req.query;

   

    if (featured) {
      
    } else if (!featured) {
     
    }
   
    res.statusCode = 200;
    res.json({ dishes, getReviews }).status("success").end();
  } catch (err) {
    console.log(err);
  }
};

export const updateDish = async (req, res) => {
  try {
    const { dishId } = req.params;
    const Dish = req.body;
    const update = await Dishes.findOneAndUpdate({ _id: dishId }, Dish, {
      new: true,
    });
   
    res.status(201).json({
      status: "success", data: {
        dish: update
    }}).end();
  } catch (err) {
    console.log(err);
  }
};

export const postDish = async (req, res) => {
  try {
    let newDish = req.body;
    const createDish = await Dishes.create(newDish);
    res.statusCode = 200;
      res.send({createDish, status: 'success' }).end();
  } catch (err) {
    console.log(err);
  }
};

export const getDish = async (req, res) => {
  try {
    const { dishId} = req.params;

    const getOneDish = await Dishes.findById(dishId).exec();
    const getReviews = await Reviews.find({ dishId }).exec();
     res.statusCode = 200;
    res.send({
      data: {
        getOneDish,
        reviews: getReviews
      },
      status: 'success'
    });
  } catch (err) {
    console.log(err);
  }
};


export const getDishesByQuery = async (req, res) => {
  try {
    // const { type, value } = req.query;
     const { dishId } = req.params;

    const getMultipleDishes = await Dishes.find(req.query)
      .lean()
      .exec();
    
    const getReviews = await Reviews.find({ dishId }).exec();
    res.statusCode = 200;
    res.send({
      data: getMultipleDishes,
      getReviews,
      status: 'success',
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteDish = async (req, res) => {
  try {
    const { dishId } = req.params;
    const { name } = req.body;
    await Dishes.findByIdAndDelete(dishId).exec();
    res.statusCode = 200;
    res.send({
      status: 'successfully deleted dish ' + name,
      message: `Deleted Dish with the title ${name}`,
    });
  } catch (err) {
    console.log(err);
  }
};




