import Product from './productModel.js';
import mongoose from 'mongoose';

const productActions = {
  getProducts,
  getProductById,
  getProductsByTag,
  createProduct,
  searchProduct,
  updateProduct,
  hideProduct,
};

function isValidObjectId(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    if (String(new mongoose.Types.ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

async function getProductById(productId) {
  if (productId && isValidObjectId(productId)) {
    const product = await Product.findById(productId);
    return product;
  } else {
    throw new Error('bad request');
  }
}

async function getProducts() {
  const products = await Product.find();
  console.log(products);
  return products;
}

async function getProductsByTag(category) {
  console.log(category);
  const product = await Product.find({ tags: { $all: category } }).limit(20);
  return product;
}

async function createProduct(name, img, price, description, tags, hot) {
  const newProduct = new Product({
    name,
    img,
    price,
    description,
    tags,
    hot,
  });
  return await newProduct.save();
}

async function searchProduct(query) {
  console.log(query);
  const product = await Product.find({
    name: { $regex: query, $options: 'i' },
    // tags: { $regex: query, $options: 'i' },
  }).limit(40);
  return product;
}

async function updateProduct(productId, newPrice, hot, newDescription) {
  const updatedProperties = {};

  if (newPrice) {
    updatedProperties.price = newPrice;
  }
  if (hot !== undefined) {
    updatedProperties.hot = hot;
  }
  if (newDescription) {
    updatedProperties.description = newDescription;
  }

  const result = await Product.findOneAndUpdate(
    { _id: productId },
    { $set: updatedProperties },
    { new: true },
  );
  return result;
}

async function hideProduct(params) {}

export default productActions;
