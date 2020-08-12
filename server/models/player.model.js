const mongoose = require('mongoose')

const PlayerSchema = new mongoose.Schema(
    { 
        name: {
            type: String,
            required: [true, "Player name is required"],
            minlength: [2, "Player name must be at least 2 characters in length"]
        },
        position: {
            type: String,
            enum: {values: ['Goalkeeper', 'Forward', 'Defender', 'Midfielder', ''], message: 'Preferred position is optional, but must be a valid position (if entered)'}
        },
        status: {
            type: [String],
        },
    },
    { timestamps: true }
);

const Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;