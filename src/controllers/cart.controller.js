import Cart from '../models/cart.model.js';

// GET /api/cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId }).populate('items.menuItem');
  res.json(cart || { user: req.userId, items: [] });
};

// POST /api/cart/items
export const addItemToCart = async (req, res) => {
  const { menuItemId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.userId });
  if (!cart) cart = await Cart.create({ user: req.userId, items: [] });

  const existingItem = cart.items.find(i => i.menuItem.toString() === menuItemId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ menuItem: menuItemId, quantity });
  }

  await cart.save();
  res.status(200).json(cart);
};

// PATCH /api/cart/items/:itemId
export const updateItemQuantity = async (req, res) => {
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.userId });
  const item = cart?.items.id(req.params.itemId);

  if (!item) return res.status(404).json({ message: 'Item not found in cart' });

  item.quantity = quantity;
  await cart.save();
  res.json(cart);
};

// DELETE /api/cart/items/:itemId
export const removeItem = async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId });
  cart.items = cart.items.filter(i => i._id.toString() !== req.params.itemId);
  await cart.save();
  res.json(cart);
};
