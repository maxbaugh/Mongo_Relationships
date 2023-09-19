const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Relationship', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connection open!');
    })
    .catch(err => {
        console.log('Connection error!');
        console.log(err);
    });

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: { _id: false },
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
});

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Bob',
        last: 'Splootman'
    })
    u.addresses.push({
        street: 'Trash Ave.',
        city: 'Shire',
        state: 'Middle Earth',
        country: 'USA'
    })
    const res = await u.save();
    console.log(res);
}

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push(
        {
            street: '69 Trash Ave.',
            city: 'Shire',
            state: 'Middle Earth',
            country: 'USA'
        }
    )
    const res = await user.save();
    console.log(res);
}


addAddress('6507142c734358c160050532'); 