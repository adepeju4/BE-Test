
import Reviews from '../models/ReviewModel.js';

export const getReviews = async (req, res) => {
  try {
    let reviews = await Reviews.find().exec();
    res.status(200).json({ reviews }).end();
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: `Invalid request` }).end();
  }
}


export const getReview = async (req, res) => {
  try {
    const { dishId } = req.params;
    const getOneReview = await Reviews.findById({ _id: dishId }).exec();
  
    if (getOneReview !== null) {
      res.status(200).json({getOneReview }).status('success').end();
    } else {
       res
         .status(404)
         .send({ message: `there are no reviews with this dish id` })
         .end();
  }
  } catch (err) {
    res.status(400).send({ message: `Invalid dish id` }).end();
  }
}


export const postReviews = async (req, res) => {
  try {
    const review = req.body;
    const { dishId } = req.params;
    if (!dishId) {
      res.status(400).send({ message: `No dishId present for this review`}).end()
      return
    }
    if (review.rating && isNaN(review.rating)) {
      res.status(400).send({ message: `Rating is invalid`}).end()
      return
    }
    const addReview = await Reviews.create({...review, dishId });
    if (addReview) {
      res.status(200).send({
        status: "success",
        data: addReview
      })
    } else {
      res.status(400).send({ message: `Could not create review`}).end()
    }
  } catch (err) {
    console.log(err)
  } 
};

export const deleteReview = async (req, res) => {
  try {
     const { reviewId } = req.params;
    
    const deleteOne = await Reviews.findByIdAndDelete({ _id: reviewId }).exec();
   
    if (deleteOne !== null) {
     res
       .status(200)
       .send({ message: `deleted review with the id: ${reviewId}` })
       .end();
    } else {
      res
    .status(404)
    .send({ message: `there are no reviews with this id` })
    .end();
  return;
  }
  
  } catch (err) {
    
    res.status(400).send({ message: `Invalid review id` }).end();
  }
}

export const deleteReviews = async (req, res) => {
  try {
    const { dishId } = req.params;
    const deleteAll = await Reviews.deleteMany({ dishId }).exec(); 
    if (deleteAll.n > 0) {
      res.status(200).send({ message: `deleted reviews for ${dishId}`}).end()
    } else {
      res.status(404).send({ message: `There are no reviews for this dish id`}).end()
    }       
  } catch (err) {
    res.status(400).send({ message: `Invalid dish id`}).end()
  }
  
};


