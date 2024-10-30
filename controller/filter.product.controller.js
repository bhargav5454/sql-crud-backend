const { fn, col } = require("sequelize");
const { productSchema } = require("../model");

const getTotalProducts = async (req, res) => {
    try {
        const totalProducts = await productSchema.count();
        res.json({ totalProducts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const avgprice = async (req, res) => {
    try {
        const result = await productSchema.findOne({
            attributes: [[fn('AVG', col('price')), 'avgPrice']]
        });

        const avgPrice = result ? result.dataValues.avgPrice : null; // Handle case where there are no products
        res.json({ avgPrice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const countProductsByCategory = async (req, res) => {
    try {
        const categoryCounts = await productSchema.findAll({
            attributes: ['category', [fn('COUNT', col('id')), 'count']], // Count products in each category
            group: ['category'] // Group by category
        });
        res.json(categoryCounts); // Send counts grouped by category
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

module.exports = {
    getTotalProducts,
    avgprice,
    countProductsByCategory
};

