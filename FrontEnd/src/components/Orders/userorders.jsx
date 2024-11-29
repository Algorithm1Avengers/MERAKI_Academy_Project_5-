import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Collapse,
    Snackbar,
    Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DotLoader} from "react-spinners"; //loading spinner
import './userorders.css';


const UserOrders = () => {
    const token = useSelector((state) => state.login.token);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrderId, setExpandedOrderId] = useState(null);


    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/orders', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.success) {
                setOrders(response.data.orders);
            } 
            else {
                setError('Failed to fetch orders.');
            }
        }
        catch (err) {
            setError('Error fetching orders.');
            console.error(err);
        } 
        finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchOrders();
    }, []);


    const handleToggleDetails = (orderId) => {
        setExpandedOrderId((prevOrderId) => (prevOrderId === orderId ? null : orderId));
    };


    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box className="order-management slide-up-animation" sx={{ padding: 2 }}>
                {loading ? (
                    <div className="loading-indicator">
                        <DotLoader color="#3498db" size={50} />
                    </div>
                ) : (
                    <>
                        <Box sx={{ height: '30px' }} />
                        <Typography variant="h4" gutterBottom className="manage-title">
                        </Typography>
                        <Typography variant="h5.4" align="center" gutterBottom className='Your-Orders-h2 manage-title'>Your Orders</Typography>
                        <TableContainer component={Paper} className="order-table-container">
                            <Table className="order-table order-items-table">
                                <TableHead className="table-header">
                                    <TableRow>
                                        <TableCell>Order ID</TableCell>
                                        <TableCell>Order Date</TableCell>
                                        <TableCell>Total Amount</TableCell>
                                        <TableCell>Is Delivered</TableCell>
                                        <TableCell>Details</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.length > 0 ? (
                                        orders.map((order) => (
                                            <React.Fragment key={order.id}>
                                                <TableRow className="table-row">
                                                    <TableCell>{order.id}</TableCell>
                                                    <TableCell>
                                                        {new Date(order.created_at).toLocaleDateString('en-US')}
                                                    </TableCell>
                                                    <TableCell>${order.total_amount}</TableCell>
                                                    <TableCell>
                                                        {order.isDelivered ? 'Yes' : 'No'}
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton
                                                            onClick={() => handleToggleDetails(order.id)}
                                                            className="expand-button"
                                                        >
                                                            <ExpandMoreIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                                {/* Details */}
                                                <TableRow>
                                                    <TableCell colSpan={5}>
                                                        <Collapse
                                                            in={expandedOrderId === order.id}
                                                            timeout="auto"
                                                            unmountOnExit
                                                        >
                                                            <Box sx={{ margin: 1 }}>
                                                                <Table size="small">
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>Product Image</TableCell>
                                                                            <TableCell>Product ID</TableCell>
                                                                            <TableCell>Product Name</TableCell>
                                                                            <TableCell>Quantity</TableCell>
                                                                            <TableCell>Price</TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {order.items.map((item) => (
                                                                            <TableRow key={item.id}>
                                                                                <TableCell>
                                                                                    <img
                                                                                        src={item.image}
                                                                                        alt={item.name}
                                                                                        className="product-table-image"
                                                                                        style={{
                                                                                            width: '60px',
                                                                                            height: '60px',
                                                                                            objectFit: 'cover',
                                                                                            borderRadius: '50%',
                                                                                            boxShadow:
                                                                                                '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                                                        }}
                                                                                    />
                                                                                </TableCell>
                                                                                <TableCell>{item.id}</TableCell>
                                                                                <TableCell>{item.name}</TableCell>
                                                                                <TableCell>
                                                                                    {item.quantity}
                                                                                </TableCell>
                                                                                <TableCell>${item.price}</TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </Box>
                                                        </Collapse>
                                                    </TableCell>
                                                </TableRow>
                                            </React.Fragment>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="no-orders">
                                                No orders found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </Box>
        </Box>
    );
}    

export default UserOrders;
