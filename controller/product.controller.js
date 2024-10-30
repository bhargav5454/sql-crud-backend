const { productService } = require("../services");

const handleCreateProduct = async (req, res) => {
    try {
        const userId = req?.user
        let body = req?.body;
        
        body = {
            ...body,
            createdBy: userId
        }
        const result = await productService.createProduct(body);
        if (!result) {
            return res.status(400).json({
                message: "Failed to create product"
            })
        }
        res.status(201).json({
            message: "Product created successfully",
            data: result
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        })
    }
}

const handleGetAllProducts = async (req, res) => {
    try {
        const userId = req?.user;
        const { page = 1, limit = 10 } = req.query;

        // Convert page and limit to numbers
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        // Validate page and limit
        if (pageNum < 1 || limitNum < 1) {
            return res.status(400).json({
                message: "Page and limit must be greater than 0."
            });
        }

        const result = await productService.getProducts(userId, pageNum, limitNum);

        if (!result) {
            return res.status(404).json({
                message: "No products found"
            });
        }

        res.status(200).json({
            message: "Products fetched successfully",
            data: result.products, 
            total: result.total, 
            page: pageNum,
            limit: limitNum
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
}

const handleGetProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req?.user
        const result = await productService.getProductById(productId, userId);
        if (!result) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json({
            message: "Product fetched successfully",
            data: result
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        })
    }
}
const handleUpdateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req?.user
        const body = req.body;
        const result = await productService.updateProduct(productId, userId, body);
        if (!result) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json({
            message: "Product updated successfully",
            data: result.data
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        })
    }
}
const handleDeleteProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req?.user
        const result = await productService.deleteProductById(productId, userId);
        if (!result) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json({
            message: "Product deleted successfully",
            data: result.data
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        })
    }
}
const handleDeleteAllProducts = async (req, res) => {
    try {
        const result = await productService.deleteAllProducts();
        if (!result) {
            return res.status(404).json({
                message: "No products found"
            })
        }
        res.status(200).json({
            message: "All products deleted successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        })
    }

}





module.exports = {
    handleCreateProduct,
    handleGetAllProducts,
    handleGetProductById,
    handleUpdateProduct,
    handleDeleteProductById,
    handleDeleteAllProducts,
}