const pool = require("../models/db");

const createOrder = async (req, res) => { 
    const userId = req.token.userId;
    const { shippingAddress, paymentMethod, note } = req.body;

    try {
        // Get the user's cart details
        const cartResult = await pool.query(`
            SELECT cart_items.product_id, cart_items.quantity, cart_items.price, products.name 
            FROM cart_items
            LEFT JOIN products ON cart_items.product_id = products.id
            LEFT JOIN carts ON cart_items.cart_id = carts.id
            WHERE carts.user_id = $1
        `, [userId]);

        if (cartResult.rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        // Calculate total amount
        const totalAmount = cartResult.rows.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);

        // Create a new order
        const orderResult = await pool.query(`
            INSERT INTO orders 
            (user_id, total_amount, payment_method, is_paid, is_delivered, note, full_address, street, city, state, country, latitude, longitude) 
            VALUES 
            ($1, $2, $3, FALSE, FALSE, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING id
        `, [
            userId, 
            totalAmount, 
            paymentMethod, 
            note, 
            shippingAddress.full_address, 
            shippingAddress.street, 
            shippingAddress.city, 
            shippingAddress.state, 
            shippingAddress.country, 
            shippingAddress.latitude, 
            shippingAddress.longitude
        ]);

        const orderId = orderResult.rows[0].id;

        // Add order items 
        cartResult.rows.forEach(async (item) => {
            await pool.query(`
                INSERT INTO order_items 
                (order_id, product_id, quantity, price) 
                VALUES ($1, $2, $3, $4)
            `, [orderId, item.product_id, item.quantity, item.price]);
        });

        // Delete the user cart after completing the order
        await pool.query(`
            DELETE FROM cart_items 
            USING carts 
            WHERE cart_items.cart_id = carts.id 
            AND carts.user_id = $1
        `, [userId]);

        res.status(201).json({ success: true, orderId });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
//

module.exports = { 
    createOrder,
    }