import Dishes from '../models/ProductModel.js';
import Reviews from '../models/ReviewModel.js';



export const postReviews = async (req, res) => {
  try {
    const review = req.body;
    const { dishId } = req.params;
    const addReview = await Reviews.create({...review, dishId });
  

    res.statusCode = 200;
    res.send({
      status: "success",
      data: addReview
    })
  } catch (err) {
    console.log(err)
  }

    
};

export const deleteReviews = (req, res, next) => {
  Dishes.findById(req.params.dishId)
    .then(
      (dish) => {
        if (dish != null) {
          for (var i = dish.reviews.length - 1; i >= 0; i--) {
            dish.reviews.id(dish.reviews[i]._id).remove();
          }
          dish.save().then(
            (dish) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(dish);
            },
            (err) => next(err)
          );
        } else {
          err = new Error('Dish ' + req.params.dishId + ' not found');
          err.status = 404;
          return next(err);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};

export const getReview = (req, res, next) => {
  Dishes.findById(req.params.dishId)
    .then(
      (dish) => {
        if (dish != null && dish.reviews.id(req.params.reviewId) != null) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(dish.reviews.id(req.params.reviewId));
        } else if (dish == null) {
          err = new Error('Dish ' + req.params.dishId + ' not found');
          err.status = 404;
          return next(err);
        } else {
          err = new Error('review ' + req.params.reviewId + ' not found');
          err.status = 404;
          return next(err);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};

export const updateReview = (req, res, next) => {
  Dishes.findById(req.params.dishId)
    .then(
      (dish) => {
        if (dish != null && dish.reviews.id(req.params.reviewId) != null) {
          if (req.body.rating) {
            dish.reviews.id(req.params.reviewId).rating = req.body.rating;
          }
          if (req.body.review) {
            dish.reviews.id(req.params.reviewId).review = req.body.review;
          }
          dish.save().then(
            (dish) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(dish);
            },
            (err) => next(err)
          );
        } else if (dish == null) {
          err = new Error('Dish ' + req.params.dishId + ' not found');
          err.status = 404;
          return next(err);
        } else {
          err = new Error('review ' + req.params.reviewId + ' not found');
          err.status = 404;
          return next(err);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};

export const deleteReview = (req, res, next) => {
  Dishes.findById(req.params.dishId)
    .then(
      (dish) => {
        if (dish != null && dish.reviews.id(req.params.reviewId) != null) {
          dish.reviews.id(req.params.reviewId).remove();
          dish.save().then(
            (dish) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(dish);
            },
            (err) => next(err)
          );
        } else if (dish == null) {
          err = new Error('Dish ' + req.params.dishId + ' not found');
          err.status = 404;
          return next(err);
        } else {
          err = new Error('review ' + req.params.reviewId + ' not found');
          err.status = 404;
          return next(err);
        }
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
};
