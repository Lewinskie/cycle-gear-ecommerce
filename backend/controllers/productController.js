const Product = require("../models/productModel");

//FILTER,SOERTING AND PARGINATING
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString=req.body
    console.log({ before: queryObj }); //before delete page

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((item) => delete queryObj[item]);

    console.log({ after: queryObj }); //after delete page

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    console.log({ queryObj, queryStr });
    this.query.find(JSON.parse(queryStr));

    // gte = GREATER THAN OR EQUAL TO
    //lte = LESS THAN OR EQUAL TO
    // lt = LESS THAN
    // gt = GREATER THAN

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join("");
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

//FETCH PRODUCTS
const getProducts = async (req, res) => {
  try {
    //QUERIES
    const features = new APIfeatures(Product.find(), req.query)
      .filtering()
      .sorting()
      .paginating();
    const products = await features.query;

    res.json({
      status: "Success",
      result: products.length,
      products: products,
    });

    // const products = await Product.find();
    // if (products.length === 0)
    //   return res.status(400).json({ msg: "No products found!" });

    // return res.status(200).json({ products: products });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//CREATE NEW PRODUCT
const createProduct = async (req, res) => {
  try {
    //DESTRUCTURE REQUEST.BODY
    const { product_id, title, price, description, content, images, category } =
      req.body;

    //CHECK IF IMAGE IS EMPTY
    if (!images) return res.status(400).json({ msg: "No image uploaded" });

    //CHECK IF PRODUCT EXISTS USING ITS UNIQUE ID
    const product = await Product.findOne({ product_id });

    if (product)
      return res.status(400).json({ msg: "This product already exists!" });

    //IF PRODUCT DOESNT EXIST CREATE IT
    const newProduct = await new Product({
      product_id,
      title,
      price,
      description,
      content,
      images,
      category,
    });

    //SAVE NEW PRODUCT
    await newProduct.save();
    res.status(201).json({ msg: "Created a product" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//DELETE A PRODUCT USING ID
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    return res.status(200).json({ msg: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//UPDATE A PRODUCT USING ID
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { product_id, title, price, description, content, images, category } =
      req.body;

    //CHECK IF IMAGE IS BLANK
    if (!images) return res.status(400).json({ msg: "No image uploaded" });

    //UPDATE PRODUCT
    const product = await Product.findOneAndUpdate(id, {
      product_id,
      title,
      price,
      description,
      content,
      images,
      category,
    });

    return res.status(201).json({ msg: "Product updated!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getProducts = getProducts;
exports.createProduct = createProduct;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;
