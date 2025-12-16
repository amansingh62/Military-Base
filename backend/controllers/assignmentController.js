const Assignment = require("../models/Assignment");

exports.createAssignment = async (req, res) => {
  try {
    const record = await Assignment.create({
      ...req.body,
      date: new Date()
    });
    const populatedRecord = await Assignment.findById(record._id).populate("assetId baseId");
    res.status(201).json(populatedRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("assetId baseId")
      .sort({ date: -1 }); // Most recent first
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
