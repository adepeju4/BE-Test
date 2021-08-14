import Checkout from '../models/checkoutModel.js';

export const getCartItems = async (req, res) => {
  try {
    
    const findCartItems = await Checkout.find();
    console.log(findCartItems)
    res.status(200).send({ message: 'success', data: findCartItems }).end();
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: `Invalid request` }).end();
  }
};


export const postCartItem = async (req, res) => {
  try {
    const { dishId } = req.params;
    const { user } = req;
    
    let findCart = await Checkout.findOne({ user: user._id });
  
    const isAdded = findCart.cart.find((dish) => {
   
      return dish == dishId;
    });
    

    if (isAdded) {
      return res.status(401).send("Dish already exists in cart");
    }
    else {
    
        
     const addedItem = await Checkout.findOneAndUpdate({ user: user._id },
        {
          $push: {
            
            cart: dishId
          }
        }, {new: true});
      
     
      res.status(200).send({ message: "success", data: addedItem}).end();
   
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: `Invalid request` }).end();
  }

}
export const getCartItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const findCartItems = await Checkout.find({ user: userId });
    
      res.status(200).send({ message: 'success', data: findCartItems }).end();
    
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: `Invalid request` }).end();
  }
};

export const deleteCartItem = async (req, res) => {
  try {
      const { dishId } = req.params;
      const { user } = req;

      let findCart = await Checkout.findOne({ user: user._id });

      const itExists = findCart.cart.find((dish) => {
        return dish == dishId;
      });

      if (itExists) {
       
      
        const removeItem = await Checkout.findOneAndUpdate(
          { user: user._id },
          {
            $pull: {
              cart: dishId,
            },
          },
          { new: true }
        );

        res.status(200).send({ message: 'success', data: removeItem }).end();
      } else {
         return res.status(401).send('Dish does not exist in cart');
      }
  } catch (err) {
    res.status(400).send({ message: 'inavlid request' });
  }
};