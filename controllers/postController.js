const User = require('../models/User');
const Post= require('../models/Post');

const fs = require('fs');

exports.createPost= async (req, res) => {
  
  const userID = req.session.userID;

  const user = await User.findById({_id: userID});

  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

  const title = req.body.title;
  const description = req.body.description;
  const image = '/uploads/' + uploadedImage.name
  const owner = userID;
  
  uploadedImage.mv(uploadPath, async () => {
    try {
      const Post= await Post.create({
        title,
        description,
        image,        
        owner     
    });

    await user.posts.push({ _id: post._id });
    await user.save();

    res.status(200).redirect('/admin');
    
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  });
};

exports.updatePost= async (req, res) => {
    try {
      const Post= await Post.findById(req.params.id);
      post.title = req.body.title;
      post.description = req.body.description;
      post.save();
  
      res.status(200).redirect('/admin#portfolio');
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };
  
  exports.deletePost= async (req, res) => {
    try {
      const Post= await Post.findById(req.params.id);
      let deletedImage = __dirname + '/../public' + post.image;
      fs.unlinkSync(deletedImage);
      await Post.findByIdAndRemove(req.params.id);
      res.status(200).redirect('/#portfolio');
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };