var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test33');

var userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

userSchema.pre('save', function (next) {
    this.name = '121212';
    console.log('pre save');
    next();
});

userSchema.post('save', function () {
    console.log('post save');
});

userSchema.methods.fullName = function () {
    return 'My name: ' + this.name;
}

var User = mongoose.model('User', userSchema);

user = new User();
user.name = 'Alex';
user.age = 30;
user.save();

// User.update({name: 'Alex'}, {$set: {age: 33}});
/*
User.findById('kljjl', 'name age', function(err, obj){
    console.log(obj.fullName());
    // obj.name = 'Alex';
    // obj.save();
});
*/

user = new User({ name: 'Alex2' });
user.save();

User.findOne({ name: "Alex2" }, function (err, user) {
    user.name = 'Alex D.';
    user.save();
});

blogShema.pre('save', function (next) {
    this.date = '121212';
    console.log('pre save')
    //next();
});

blogShema.post('save', function () {
    console.log('post save')
});

blogShema.virtual('fullname').get(function () {
    return this.name + '--' + this.age;
});

var cat = new Cat({ name: 'alex', age: 30 });
Cat.aggregate(
    [{ '$match': ('name': 'alex')}], function(err, doc) {
        if (err) {
            console.log(err);
        }
        console.log(doc);
    }
);
/*
console.log(doc);
doc.name = 'Alex777';
doc.save(function (err) {
    console.log(doc);
});
))
)
*/
Cat.findOne({name:'test'},'', function(err,doc){
    if (err) {
        console.log(err);
    }
    console.log(doc.fullname);
})
/*
var kitty = new Cat({name: 'indiana'});

kitty.save(function(err){
    if (err){
        console.log(err);
    } else {
        console.log('meov');
    }
});
*/