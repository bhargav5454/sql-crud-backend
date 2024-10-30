const { cartSchema, userSchema, productSchema } = require("../model");

const addToCartService = async (id, body) => {
  try {
    const data = {
      ...body,
      createdBy: id,
    };
    const cartData = await cartSchema.create(data);
    if (!cartData) {
      throw new Error("Failed to add product to cart");
    }
    return cartData;
  } catch (error) {
    throw error;
  }
};

const getCartItemsService = async (userId) => {
  try {
    const cartItems = await cartSchema.findAll({
      where: {
        createdBy: userId,
      },
      include: [
        {
          model: productSchema,
          as: "product",
          attributes: ["id", "name", "description", "price"],
        },
      ],
    });
    if (!cartItems) {
      throw new Error("Failed to fetch cart items");
    }
    return cartItems;
  } catch (error) {
    throw error;
  }
};

const emptyCartService = async () => {
  try {
    return cartSchema.destroy({
      where: {},
    });
  } catch (error) {
    throw error;
  }
};

const removeProductFromCartService = async (cartItemId) => {
  console.log("🚀 ~ removeProductFromCartService ~ cartItemId:", cartItemId);
  try {
    const cartItem = await cartSchema.findOne({
      where: {
        id: cartItemId,
      },
    });
    if (!cartItem) {
        throw new Error("Product not found in cart");
    }
    
    cartItem.destroy();
    if (!cartItem) {
      throw new Error("Product not found in cart");
    }
  } catch (error) {
    throw error;
  }
};

const updateProductQuantityInCartService = async () => {
  try {
  } catch (error) {}
};

const getCartTotalService = async () => {
  try {
  } catch (error) {}
};

module.exports = {
  addToCartService,
  emptyCartService,
  removeProductFromCartService,
  updateProductQuantityInCartService,
  getCartTotalService,
  getCartItemsService,
};
