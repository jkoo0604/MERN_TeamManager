const Player = require("../models/Player.model");

module.exports.findAllPlayers = (req, res) => {
    Player.find().sort('name')
        .then(allPlayers => res.json({players: allPlayers}))
        .catch(err => res.status(400).json(err));
};

module.exports.findOnePlayer = (req, res) => {
    Player.findOne({_id: req.params.id})
        .then(onePlayer => res.json({player: onePlayer}))
        .catch(err => res.status(400).json(err));
};

module.exports.newPlayer = (req, res) => {
    const { name, position, status } = req.body;
    const tempArr = name.match(/\S+/g) || [];
    const newName = tempArr.map(char=>char[0].toUpperCase()+char.substring(1).toLowerCase()).join(' ');
    Player.exists({name: newName})
        .then(userExists=>{
            if (userExists) {
                return Promise.reject({errors: {name: {properties: {message: 'This player already exists'}}}});
            }
            return Player.create({name: newName, position, status})
        })
        .then(newPlayer => res.json({player: newPlayer}))
        .catch(err => {
            return res.status(400).json(err.errors)
        });
};

module.exports.updatePlayer = (req, res) => {
    const { name, position, status } = req.body;
    const tempArr = name.match(/\S+/g) || [];
    const newName = tempArr.map(char=>char[0].toUpperCase()+char.substring(1).toLowerCase()).join(' ');
    Player.exists({name: newName, _id: {$ne: req.params.id}})
        .then(userExists=>{
            if (userExists) {
                return Promise.reject({errors: {name: {properties: {message: 'This player already exists'}}}});
            }
            return Player.findOneAndUpdate({_id: req.params.id}, {name: newName, position, status}, {new: true, runValidators: true})
        })
        .then(updatedPlayer => res.json({player: updatedPlayer}))
        .catch(err => res.status(400).json(err.errors));
};

module.exports.updatePlayerStatus = (req, res) => {
    const { status } = req.body;
    Player.findOneAndUpdate({_id: req.params.id}, {status}, {new: true})
        .then(updatedPlayer => res.json({player: updatedPlayer}))
        .catch(err => res.status(400).json(err));
};

module.exports.deletePlayer = (req, res) => {
    Player.deleteOne({_id: req.params.id})
        .then(deletedPlayer => res.json({player: deletedPlayer}))
        .catch(err => res.status(400).json(err));
};