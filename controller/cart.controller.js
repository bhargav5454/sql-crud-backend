const { cartService } = require("../services");

const handleAddProductToCart = async (req, res) => {
  try {
    const body = req.body;
    const id = req.user;

    const result = await cartService.addToCartService(id, body);

    if (!result) {
      return res.status(400).json({ message: "Failed to add product to cart" });
    }
    res.status(201).json({
      message: "Product added to cart successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleGetCartItemById = async (req, res) => {
  try {
    const userId = req.user;
    const result = await cartService.getCartItemsService(userId);
    if (!result) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleEmptyCart = async (req, res) => {
  try {
    const result = await cartService.emptyCartService();
    res.status(200).json({
      message: "Cart emptied successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleRemoveProductFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const result = await cartService.removeProductFromCartService(cartItemId)
    res.status(200).json({
      message: "Product removed from cart successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleUpdateProductQuantityInCart = async (req, res) => {
  try {
  } catch (error) {}
};

const handleGetCartTotal = async (req, res) => {
  try {
  } catch (error) {}
};


module.exports = {
  handleEmptyCart,
  handleAddProductToCart,
  handleRemoveProductFromCart,
  handleUpdateProductQuantityInCart,
  handleGetCartTotal,
  handleGetCartItemById,
};
