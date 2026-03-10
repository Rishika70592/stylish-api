const express = require("express");
const router = express.Router();

const Address = require("../models/addressModel");
const authMiddleware = require("../middleware/authMiddleware");

router.post ("/", authMiddleware, async(res,req) => {
    try {
        const {name, street, city,state, pincode, phone} = req.body;
      const newAddress = Address.create ({
        userId : req.user.id,
         name,
      street,
      city,
      state,
      pincode,
      phone
      }) ;

      res.json({
        success: true,
         message: "Address added successfully",
      addressId: newAddress._id
      });

    }catch(err) {
       res.statusCode(500).json({message : err.message});
    }
}


);

router.get("/", authMiddleware, async(res,req) => {
    try {
        const addresses = await Adress.findById({userId : req.user.id});
        const formattedAddress = addresses.map (addr => ({
            addressId: addr._id,
      city: addr.city,
      pincode: addr.pincode
        }));
res.json({
    addresses : formattedAddress
})
    } catch (err){
        res.status(500).json({message:err.message});
    }
});

module.exports = router;