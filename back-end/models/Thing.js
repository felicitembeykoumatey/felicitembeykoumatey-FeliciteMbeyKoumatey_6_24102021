const mongoose = require("mongoose");
const thingSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: number, required: true },
});
module.experts = mongoose.model("Thing", thingSchema);
