var mongoose = require('mongoose');
var modelName = 'Posts';

var postSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  content: { type: String, default: '' },
  time: Date,
  views : {type : Number , defalt : 0 }
});


postSchema.index({ id: 1 }); // schema level

postSchema.pre('save', function(next) {
  var user = this;
  this.time = new Date();
  this.id = Math.floor(Math.random() *  1000000000 );
  next();
  
});

postSchema.virtual('summary').get(function () {
  return this.content.substring(0, 100);
});


postSchema.methods.increaseViews = function( callback) {
  this.model(modelName).update({ _id: id }, { $inc: { views: 1 }}, function(e , r){
    callback();
  });
};

postSchema.statics.newPost = function (data ,  cb) {
  var post = new this(data);
  post.save(cb);

}

postSchema.statics.getById = function (id, cb) {
  return this.find({ id: id }, cb);
}

postSchema.statics.getAll = function ( cb) {
  this.find({ }, cb);
}

module.exports = mongoose.model(modelName , postSchema);
