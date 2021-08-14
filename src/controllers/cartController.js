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

    console.log(findCart, "the cart with the user id")

    const isAdded = findCart.cart.filter(dish => dish._id.toString() === dishId)
      .length > 0;
    
console.log(isAdded, "the item that exists") 
    if (isAdded) {
      return res.status(401).send("Dish already exists in cart");
    }
      const addedItem = await findCart.cart.unshift(dishId);
      await findCart.save();
      res.status(200).send({ message: "success", data: findCart}).end();
   
    
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

      const notExistent =
        findCart.cart.filter((dish) => dish._id.toString() === dishId).length === 0;

      if (notExistent) {
        return res.status(401).send('Dish does not exist in cart');
    }
    const indexOfDishToDelete = await findCart.cart
      .map((dish) => {
        return dish._id.toString();
      })
      .indexOf(dishId);
    await findCart.cart.splice(indexOfDishToDelete, 1);
    await findCart.save();
    res.status(200).send({ data: findCart, message: "Successfully deleted cart item" });
  } catch (err) {
    res.status(400).send({ message: 'inavlid request' });
  }
};