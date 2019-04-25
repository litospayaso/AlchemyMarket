// src/server.js
const Server = require("boardgame.io/server").Server;
const TicTacToe = require("./game").TicTacToe;
const server = Server({ games: [TicTacToe] });
server.run(8000);
console.log('\x1b[32m%s\x1b[37m%s\x1b[0m', 'Server.js: ', `server listening on http://localhost:8000`);
