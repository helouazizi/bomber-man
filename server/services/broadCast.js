function  broadCastWaittingRoom(room) {
    const safeRoom = getSafeRoom(room);

    room.players.forEach(element => {
        element.stream.send(JSON.stringify({
            type: "waitting_room",
            room: safeRoom
        }));
    });
}

function getSafeRoom(room) {
    return {
        id: room.id,
        players: room.players.map(p => ({
            username: p.username,
            playerNumber: p.playerNumber
        }))
    };
}

module.exports = { broadCastWaittingRoom }