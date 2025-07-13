import MenuItem from '../models/menu.model.js';

// GET /api/menu
export const getAllItems = async (req, res) => {
  const { category } = req.query;
  const query = category ? { category } : {};
  const items = await MenuItem.find(query);
  res.json(items);
};

// GET /api/menu/:id
export const getItemById = async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
};

// POST /api/menu (admin/staff only)
export const addItem = async (req, res) => {
  const { name, description, price, category } = req.body;
  const item = await MenuItem.create({ name, description, price, category });
  res.status(201).json(item);
};

// PUT /api/menu/:id
export const updateItem = async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json(item);
};

// DELETE /api/menu/:id
export const deleteItem = async (req, res) => {
  const item = await MenuItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json({ message: 'Item deleted successfully' });
};

// PATCH /api/menu/:id/availability
export const toggleAvailability = async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  item.available = !item.available;
  await item.save();
  res.json(item);
};
