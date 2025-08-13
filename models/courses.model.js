const mongoose = require("mongoose");

// প্রতিটি course
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  seats: { type: Number, required: true },
  minimum_qualification: [{ type: String, required: true }],
});

// পুরো institute
const instituteSchema = new mongoose.Schema(
  {
    institute: { type: String, required: true },
    project: { type: String, required: true },
    under: { type: String, required: true },
    admission: {
      status: { type: String, required: true },
      fees: { type: String, required: true },
    },
    courses: [courseSchema],
    admission_requirements: [{ type: String }],
    facilities: [{ type: String }],
    contact: {
      phone: [{ type: String }],
      email: { type: String },
      address: { type: String },
    },
  },
  { collection: "courses" }
); // এখানে collection ফিক্স করো

// Model তৈরি
const Courses = mongoose.model("Courses", instituteSchema);

module.exports = Courses;
