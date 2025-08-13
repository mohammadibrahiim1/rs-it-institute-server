const Courses = require("../models/courses.model");

const getAllCourses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search?.trim() || "";

    const courseDoc = await Courses.findOne(); // এবার পাবে

    console.log(courseDoc);

    if (!courseDoc) {
      return res.status(404).json({
        status: false,
        message: "Course data not found",
      });
    }

    let filteredCourses = courseDoc.courses || [];

    if (search) {
      const regex = new RegExp(search, "i");
      filteredCourses = filteredCourses.filter((c) => regex.test(c.name));
    }

    const totalItems = filteredCourses.length;
    const totalPages = Math.ceil(totalItems / limit);
    const offset = (page - 1) * limit;
    const paginatedCourses = filteredCourses.slice(offset, offset + limit);

    const response = {
      ...courseDoc._doc,
      courses: paginatedCourses,
      totalItems,
      currentPage: page,
      totalPages,
    };

    return res.json({ status: true, data: response });
  } catch (error) {
    console.error("Error fetching institute info:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = { getAllCourses };
