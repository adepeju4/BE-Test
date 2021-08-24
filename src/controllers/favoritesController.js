import Favorite from "../models/favoriteModel.js"

export const getFavorites = async (req, res) => {
  try {
    const findFavorites = await Favorite.find().populate("dishes");
    if (findFavorites.length > 0) {
      res.status(200).send({ message: 'success', data: findFavorites }).end();
      console.log(findFavorites);
      
    } else {
      res.status(404).send({ message: "You do not have any favorites...yet" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: `Invalid request` }).end();
  }
};


export const postFavorite = async (req, res) => {
      try {
        const { dishId } = req.params;
        const { user } = req;

        let findFavorite = await Favorite.findOne({ user: user._id });

        

        const isAdded =
          findFavorite.dishes.filter((dish) => dish._id.toString() === dishId)
            .length > 0;

        console.log(isAdded, 'the item that exists');
        if (isAdded) {
          return res.status(401).send('Dish already exists in favorites');
        }
        const addedItem = await findFavorite.dishes.unshift(dishId);
        await findFavorite.save();
        res.status(200).send({ message: 'success', data: findFavorite }).end();
      } catch (err) {
        console.log(err);
        res.status(400).send({ message: `Invalid request hmm` }).end();
      }
}


export const deleteFavoriteItem = async (req, res) => {
  try {
    const { dishId } = req.params;
    const { user } = req;

    let findFavorite = await Favorite.findOne({ user: user._id });

    const notExistent =
      findFavorite.dishes.filter((dish) => dish._id.toString() === dishId).length ===
      0;

    if (notExistent) {
      return res.status(401).send('Dish does not exist in favorites');
    }
    const indexOfDishToDelete = await findFavorite.dishes
      .map((dish) => {
        return dish._id.toString();
      })
      .indexOf(dishId);
    await findFavorite.dishes.splice(indexOfDishToDelete, 1);
    await findFavorite.save();
    res
      .status(200)
      .send({ data: findFavorite, message: 'Successfully deleted favorite' });
  } catch (err) {
    res.status(400).send({ message: 'inavlid request' });
  }
};