const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/Relationship', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connection open!');
    })
    .catch(err => {
        console.log('Connection error!');
        console.log(err);
    });

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
})

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     { name: 'Watermelon', price: 3.99, season: 'Summer' },
//     { name: 'Pumpkin', price: 5.99, season: 'Fall' },
//     { name: 'Zucchini', price: 2.99, season: 'Summer' },
// ])  

// const makeFarm = async () => {
//     const farm = new Farm({ name: 'Full Belly Farms', city: 'Guinda, CA' });
//     const watermelon = await Product.findOne({ name: 'Watermelon' });
//     farm.products.push(watermelon);
//     await farm.save();
//     console.log(farm);
// };
// makeFarm();

const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Full Belly Farms' });
    const pumpkin = await Product.findOne({ name: 'Pumpkin' });
    farm.products.push(pumpkin);
    await farm.save();
    console.log(farm);
}

addProduct();

//Farm.findOne({ name: 'Full Belly Farms' }).then(farm => console.log(farm)); 
Farm.findOne({ name: 'Full Belly Farms' })
    .populate('products')
    .then(farm => console.log(farm));
