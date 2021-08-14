import Dishes from '../models/ProductModel.js';
import Reviews from '../models/ReviewModel.js';



export const getDishes = async (req, res) => {
  try {
    let dishes = await Dishes.find().exec();
    res.status(200).json({ dishes }).end();
  } catch (err) {
    console.log(err)
    res.status(400).send({ message: `Invalid request` }).end();
  }
};

export const updateDish = async (req, res) => {
  try {
    const { dishId } = req.params;
    const Dish = req.body;
    const update = await Dishes.findOneAndUpdate({ _id: dishId }, Dish, {
      new: true,
    });
   
    if (update !== null) {
       res.status(201).json({
        status: "success", data: {
        dish: update
    }}).end();
    } else {
       res
         .status(404)
         .send({ message: `there are no dishes with this id` })
         .end();
      return;
    }
   
  } catch (err) {
    res.status(400).send({ message: `Invalid dish id` }).end();
  }
};

export const postDish = async (req, res) => {
  try {
    let newDish = req.body;
    if (newDish.price && isNaN(newDish.price)) {
      res.status(400).send({ message: "price must be a number" });
      return;
    }
    const createDish = await Dishes.create(newDish);
    if (createDish) {
      
      res.status(200).send({createDish, status: 'success' }).end();
    } else {
       res.status(400).send({ message: `Could not create dish` }).end();
    }
    
  } catch (err) {
    console.log(err);
  }
};

export const getDish = async (req, res) => {
  try {
    const { dishId} = req.params;

    const getOneDish = await Dishes.findById({_id: dishId}).exec();
    const getReviews = await Reviews.find({ dishId }).exec();
    if (getOneDish !== null) {
        
      res.status(200).send({
        data: {
          getOneDish,
          reviews: getReviews
        },
        status: 'success'
      }).end();
    } else {
      res.status(404).send({ message: "Incorrect dishId" }).end()
      return;
    }
   
  } catch (err) {
    res.status(400).send({ message: "invalid dishId request" }).end();
  }
};


export const getDishesByQuery = async (req, res) => {
  try {

    const getMultipleDishes = await Dishes.find(req.query)
      .lean()
      .exec();
    
      res.statusCode = 200;
    res.send({
      data: getMultipleDishes,
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
   const deleteDish = await Dishes.findByIdAndDelete(dishId).exec();

    if (deleteDish !== null) {
      
      res.status(200).send({
        status: 'successfully deleted dish ' + name,
        message: `Deleted Dish with the title ${name}`,
      });
    } else {
      res.status(404).send({ message: 'Incorrect dishId' }).end();
      return;
    }
   
  } catch (err) {
    res.status(400).send({ message: "inavlid dishId request" });
  }
};




