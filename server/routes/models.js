const express = require("express");
const pool = require("../db");
const router = express.Router();
const authorization=require('../middleware/authorization');

// get all models
router.get("/", async (req, res) => {
    try {
      const allModels = await pool.query("SELECT * FROM models");
      const modelRatingsData = await pool.query(
        "SELECT * FROM models LEFT JOIN (SELECT model_id,COUNT(*),TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY model_id) reviews ON models.id=reviews.model_id"
      );
      console.log("allModels",allModels.rows);
      console.log("modelRatingsData",modelRatingsData.rows);
      res.status(200).json({
        status: "success",
        results: modelRatingsData.rows.length,
        data: {
          models: modelRatingsData.rows,
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  });

  // Get a model with reviews
router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const model = await pool.query("SELECT * FROM models LEFT JOIN (SELECT model_id,COUNT(*),TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY model_id) reviews ON models.id=reviews.model_id WHERE id=$1", [
        id,
      ]);
      const reviews = await pool.query(
        "SELECT * FROM reviews WHERE model_id=$1",
        [id]
      );
      console.log(req.params);
      res.status(200).json({
        status: "success",
        data: {
          model: model.rows[0],
          reviews: reviews.rows,
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  });

  // add a model
router.post("/", async (req, res) => {
    try {
      const { name, location, rank_range } = req.body;
      const newModel = await pool.query(
        "INSERT INTO models (name,location,rank_range) VALUES ($1,$2,$3) RETURNING *",
        [name, location, rank_range]
      );
      
      console.log(req.body);
      res.status(201).json({
        status: "success",
        data: {
          model: newModel.rows[0],
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  });
  
  //update a model
router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, location, rank_range } = req.body;
      const updatedModel = await pool.query(
        "UPDATE models SET name=$1,location=$2,rank_range=$3 WHERE id=$4 RETURNING *",
        [name, location, rank_range, id]
      );
      console.log(updatedModel.rows[0]);
      res.status(200).json({
        status: "success",
        data: {
          model: updatedModel.rows[0],
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  });

  // delete  model
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedModel = await pool.query(
        "DELETE FROM models WHERE id=$1",
        [id]
      );
      res.status(204).json({
        status: "success",
      });
    } catch (err) {
      console.error(err.message);
    }
  });

  // Add a review to model
router.post("/:id/addReview", async (req, res) => {
    try {
      const { id } = req.params;
      const { model_id, name, review, rating } = req.body;
      const newReview = await pool.query(
        "INSERT INTO reviews (model_id,name, review,rating) VALUES ($1,$2,$3,$4) RETURNING *",
        [id, name, review, rating]
      );
  
      res.status(201).json({
        status: "success",
        data: {
          review: newReview.rows[0],
        },
      });
    } catch (err) {
      console.error(err.message);
    }
  });

module.exports = router;