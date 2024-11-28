const pool = require("../models/db");

// Create a new product (Just For ADMIN)
const createProduct = async (req, res) => {
    const { 
        name, description, price, 
        category_id, spot_id, image, 
        rating, extra 
    } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO products (name, description, price, category_id, spot_id, image, rating, extra) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', 
            [name, description, price, category_id, spot_id, image, rating, extra]
        );

        res.status(201).json({
            success: true,
            message: 'Product created',
            product: result.rows[0],
        });
    } 
    
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message,
        });
    }
};


// Get all products + category_name if i need it
async function getAllProducts(req, res) {
    try {
        const result = await pool.query(
            'SELECT p.*, c.category_name FROM products p LEFT JOIN Country_Categories c ON p.category_id = c.id'
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No products found'
            });
        }

        res.status(200).json({
            success: true,
            products: result.rows
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}


// Get products for specific TouristSpots By TouristSpotsId 
const getProductsByTouristSpotsId = async (req, res) => {
    const {spotId} = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM products WHERE spot_id = $1', 
            [spotId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No products found for this Tourist Spot'
            });
        }

        res.status(200).json({
            success: true,
            products: result.rows
        });
    } 
    
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};


// Get a specific product By Id + TouristSpots_name if i need it
const getProductById = async (req, res) => {
    const productId = req.params.productId;

    try {
        const result = await pool.query(
            'SELECT p.*, ts.spot_name FROM products p LEFT JOIN TouristSpots ts ON p.spot_id = ts.id WHERE p.id = $1',
            [productId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product: result.rows[0]
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


module.exports = {
    createProduct,
    getProductsByTouristSpotsId,
    getAllProducts,
    getProductById,
};
