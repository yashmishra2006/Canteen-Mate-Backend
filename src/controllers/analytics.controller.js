import Order from '../models/order.model.js';
import MenuItem from '../models/menu.model.js';

// GET /api/analytics/sales
export const getTotalSales = async (req, res) => {
  const result = await Order.aggregate([
    { $match: { status: { $ne: 'rejected' } } },
    { $group: { _id: null, totalSales: { $sum: '$totalAmount' } } }
  ]);

  res.json({ totalSales: result[0]?.totalSales || 0 });
};

// GET /api/analytics/popular-items
export const getPopularItems = async (req, res) => {
  const result = await Order.aggregate([
    { $unwind: '$items' },
    { $group: {
        _id: '$items.menuItem',
        totalOrdered: { $sum: '$items.quantity' }
      }
    },
    { $sort: { totalOrdered: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: 'menuitems',
        localField: '_id',
        foreignField: '_id',
        as: 'menuItem'
      }
    },
    { $unwind: '$menuItem' },
    {
      $project: {
        name: '$menuItem.name',
        totalOrdered: 1
      }
    }
  ]);

  res.json(result);
};

// GET /api/analytics/orders
export const getOrderStatusStats = async (req, res) => {
  const result = await Order.aggregate([
    { $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const stats = {};
  result.forEach(r => {
    stats[r._id] = r.count;
  });

  res.json(stats);
};
