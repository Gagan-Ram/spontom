const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    default: 1, // Initial value for the counter
  },
});

const customerSchema = new mongoose.Schema({
  uniqueId: String,
  firstName: {
    type: String,
    max: 30,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    max: 30,
  },
  mobile: {
    type: Number,
    min: 1000000000,
    max: 9999999999,
    unique: true, // Make the 'mobile' field unique
    required: true,
  },
  aadhar: {
    type: Number,
    trim: true,
    min: 100000000000,
    max: 999999999999,
    unique: true,
    required: true,
  },
});

// Index the 'mobile and aadhar' field to enforce uniqueness
customerSchema.index({ mobile: 1, aadhar: 1 }, { unique: true });

// Function to generate the uniqueId
async function generateUniqueId() {
  // Find the counter document for customers and increment the value
  const counter = await Counter.findOneAndUpdate(
    { name: "customers" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  // Generate the uniqueId in the format "YY-<uniqueNumber>"
  const year = new Date().getFullYear() % 100; // Get last two digits of the current year
  return `${year}${counter.value.toString().padStart(4, "0")}`;
}

// Add a pre-save middleware to generate the uniqueId
customerSchema.pre("save", async function (next) {
  if (!this.uniqueId) {
    this.uniqueId = await generateUniqueId();
  }
  next();
});

customerSchema.statics.isMobileTaken = async function (mobile, custId = null) {
  let filter = {}
  if( custId === null ){
    filter = {mobile}
  }
  else{
    filter = {
      mobile,
      _id: { $ne: custId }
    }
  }
  // console.log(filter)

  const result = await CustomerModel.findOne( filter );
  return !!result;
};

customerSchema.statics.isAadharTaken = async function (aadhar, custId = null) {
  let filter = {}
  if( custId === null ){
    filter = {aadhar}
  }
  else{
    filter = {
      aadhar,
      _id: { $ne: custId }
    }
  }
  // console.log(filter)
  const result = await CustomerModel.findOne( filter );
  return !!result;
};

const Counter = mongoose.model("counter", counterSchema);
const CustomerModel = mongoose.model("customers", customerSchema);

module.exports = {
  CustomerModel,
  Counter,
};