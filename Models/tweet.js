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

const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async () => {
    const user = new User({ username: 'bilbobobbins', age: 111 });
    const tweet1 = new Tweet({ text: 'I am a furry footed halfling', likes: 0 });
    tweet1.user = user;
    user.save();
    tweet1.save();
}

makeTweets();