const PlayerController = require('../controllers/Player.controller');

module.exports = app => {
    app.get("/api/players", PlayerController.findAllPlayers);
    app.get("/api/players/:id", PlayerController.findOnePlayer);
    app.post("/api/players/new", PlayerController.newPlayer);
    app.put("/api/players/update/:id", PlayerController.updatePlayer);
    app.delete("/api/players/delete/:id", PlayerController.deletePlayer);
};