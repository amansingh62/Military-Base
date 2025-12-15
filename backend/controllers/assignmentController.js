const Assignment = require("../models/Assignment");

exports.createAssignment = async (req, res) => {
  const record = await Assignment.create({
    ...req.body,
    date: new Date()
  });
  res.status(201).json(record);
};

exports.getAssignments = async (req, res) => {
  res.json(
    await Assignment.find().populate("assetId baseId")
  );
};
