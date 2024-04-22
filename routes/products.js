const express = require("express");
const router = express.Router();
let Product = require("../models/Products");
let Restaurant = require("../models/restaurant");
//  create api for Product

// router.post("/product", async (req, res) => {
//   try {
//     let product = new Product(req.body);
//     await product.save();
//     res.status(201).send(product);
//   } catch {
//     console.log("err");
//     res.send({ msg: "err" });
//   }
// });



router.post('/product', async(req, res) => {
  try {
      const {name,description,price,image,restroId}=req.body
      const restaurant =await Restaurant.findById(restroId);
      console.log(restaurant,"rrrr");
      if(!restaurant){
          return res.status(404).json({message:'Restaurant not found'});
      }
      const product=new Product({
          name,
          description,
          image,
          price,
          restaurant: restroId
      })
      await product.save();
      return res.status(201).json(product);

  }
  catch(err){
      console.error(err);
      return res.status(500).json({message:'Server error'})
  }
})


//   get all Restraurant
router.get("/product", async (req, res) => {
  try {
    let product = await Product.find();
    if (!product) {
      res.send("products not foundddd");
    } else {
      res.send(product);
    }
  } catch {
    console.log("err");
    res.send({ msg: "errrr" });
  }
});

//    get particular products by id
router.get("/product/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send("not founddddd");
    } else {
      res.send(product);
    }
  } catch {
    res.send("err");
  }
});

//  update productss by id
router.patch("/product/:id", async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (product) {
      res.send(product);
    } else {
      res.send("not foundddddd not updateddddd");
    }
  } catch (err) {
    console.log("errr", err);
  }
});

router.delete("/product/:id", async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id, { new: true });
    if (!product) {
      res.send("not founddd");
    } else {
      res.send("deleteddd");
    }
  } catch {
    res.send("errrrrr");
  }
});

module.exports = router;
