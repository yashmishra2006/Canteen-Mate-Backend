import CanteenSettings from '../models/settings.model.js';

// GET /api/settings
export const getSettings = async (req, res) => {
  let settings = await CanteenSettings.findOne();
  if (!settings) {
    settings = await CanteenSettings.create({ openTime: '08:00', closeTime: '20:00', holidays: [] });
  }
  res.json(settings);
};

// PUT /api/settings (admin/staff only)
export const updateSettings = async (req, res) => {
  const { openTime, closeTime, holidays } = req.body;

  let settings = await CanteenSettings.findOne();
  if (!settings) {
    settings = await CanteenSettings.create({ openTime, closeTime, holidays });
  } else {
    settings.openTime = openTime || settings.openTime;
    settings.closeTime = closeTime || settings.closeTime;
    settings.holidays = holidays || settings.holidays;
    await settings.save();
  }

  res.json(settings);
};
