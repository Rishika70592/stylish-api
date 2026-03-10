const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel");



router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId })
      .populate("userId", "name"); 

    if (!reviews.length) {
      return res.json({
        averageRating: 0,
        totalReviews: 0,
        reviews: []
      });
    }

  
    const totalRating = reviews.reduce((sum, review) => {
      return sum + review.rating;
    }, 0);

    const averageRating = (totalRating / reviews.length).toFixed(1);


    const formattedReviews = reviews.map(review => ({
      userName: review.userId.name,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt.toISOString().split("T")[0]
    }));

    res.json({
      averageRating: Number(averageRating),
      totalReviews: reviews.length,
      reviews: formattedReviews
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;