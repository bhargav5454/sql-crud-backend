const { productSchema } = require("../model");
const userSchema = require("../model/user.model");

const createProduct = async (body) => {
  try {
    // First, create the new product
    const newProduct = await productSchema.create(body);

    if (!newProduct) {
      throw new Error("Failed to create product");
    }

    // Then, retrieve the product with the associated user details
    const createdProductWithUser = await productSchema.findOne({
      where: { id: newProduct.id },
      include: [
        {
          model: userSchema,
          as: "creator",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    return createdProductWithUser;
  } catch (error) {
    throw error;
  }
};

const getProducts = async (userId, { limit, offset }) => {
  try {
    const result = await productSchema.findAndCountAll({
      where: {
        createdBy: userId,
      },
      limit,
      offset,
      include: [
        {
          model: userSchema,
          as: "creator",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id, userId) => {
  try {
    const product = await productSchema.findOne({
      where: {
        id,
        createdBy: userId,
      },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (id, userId, body) => {
  try {
    const product = await productSchema.findOne({
      where: {
        id,
        createdBy: userId,
      },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    await product.update(body);
    const createdProductWithUser = await productSchema.findOne({
      where: { id: product.id },
      include: [
        {
          model: userSchema,
          as: "creator",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    return {
      message: "Product updated successfully",
      data: createdProductWithUser,
    };
  } catch (error) {
    throw error;
  }
};

const deleteProductById = async (id, userId) => {
  try {
    const product = await productSchema.findOne({
      where: {
        id,
        createdBy: userId,
      },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    await product.destroy();
    return { message: "Product deleted successfully", data: product };
  } catch (error) {
    throw error;
  }
};

const deleteAllProducts = async () => {
  try {
    await productSchema.destroy({ where: {} });
    return { message: "All products deleted successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProductById,
  deleteAllProducts,
};
