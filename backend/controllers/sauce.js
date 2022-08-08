const Sauce = require('../models/sauce');
const fs = require('fs'); // file system

exports.createSauce = (req, res, next) => {
  // console.log(filename);
  if(typeof req.body.sauce === "string"){
    req.body.sauce = JSON.parse(req.body.sauce)
  }else{
  req.body.sauce = req.body.sauce }
  const url = req.protocol + '://' + req.get('host');
  const sauce = new Sauce({
    userId: req.body.sauce.userId,
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    mainPepper: req.body.sauce.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,
    heat: req.body.sauce.heat,
    likes: 0,
    dislikes: 0,
    userLiked: req.body.sauce.userLiked,
    userDisliked: req.body.sauce.userDisliked
  });
  // const thing = new Thing({
  //   title: req.body.thing.title,
  //   description: req.body.thing.description,
  //   imageUrl: url + '/images/' + req.file.filename,
  //   price: req.body.thing.price,
  //   userId: req.body.thing.userId
  // });
  console.log(sauce);
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};


exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = req.body;
    sauce = {
      _id: req.params.id,
      // userId: req.params.userId,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      mainPepper: req.body.sauce.mainPepper,
      imageUrl: url + '/images/' + req.file.filename,
      heat: req.body.sauce.heat,
    };
  } else {
    sauce = {
      _id: req.params.id,
      userId: req.params.userId,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      mainPepper: req.body.mainPepper,
      imageUrl: req.body.imageUrl,
      heat: req.body.heat,
    };
  }
  Sauce.updateOne({_id: req.params.id}, sauce).then(
    () => {
      res.status(201).json({
        message: 'Sauce updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id}).then(
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        Sauce.deleteOne({_id: req.params.id}).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};

exports.getAllSauces = (req, res, next) => {
  console.log('I am here');
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
 );
};

exports.getRating = (req, res, next) => {
};