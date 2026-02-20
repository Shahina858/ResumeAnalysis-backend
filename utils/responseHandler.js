export const successResponse = (res, data, code = 200) => {
  res.status(code).json({ success: true, data });
};

export const errorResponse = (res, message, code = 500) => {
  res.status(code).json({ success: false, message });
};
