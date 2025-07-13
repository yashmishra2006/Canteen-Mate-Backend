import Cart from '../models/cart.model.js';
import Order from '../models/order.model.js';

// POST /api/orders - place order
export const placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId }).populate('items.menuItem');

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const totalAmount = cart.items.reduce((sum, item) => {
    return sum + item.menuItem.price * item.quantity;
  }, 0);

  const order = await Order.create({
    user: req.userId,
    items: cart.items.map(item => ({
      menuItem: item.menuItem._id,
      quantity: item.quantity
    })),
    totalAmount
  });

  // Clear the cart after order
  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

// GET /api/orders - get all orders of logged-in user
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.userId }).populate('items.menuItem');
  res.json(orders);
};

// GET /api/orders/:id - get one order
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.menuItem');

  if (!order || order.user.toString() !== req.userId) {
    return res.status(404).json({ message: 'Order not found or access denied' });
  }

  res.json(order);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').populate('items.menuItem');
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'accepted', 'rejected', 'ready'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = status;
  await order.save();
  res.json(order);
};
