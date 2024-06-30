var game = new Chess();

// Initialize the chessboard
var board = Chessboard('myBoard', {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
});

// Handle the onDragStart event
function onDragStart(source, piece, position, orientation) {
  // Only allow the player to move their own pieces
  if (game.turn() === 'w' && piece.search(/^b/) !== -1) return false;
  if (game.turn() === 'b' && piece.search(/^w/) !== -1) return false;

  // Check if the move is legal
  var move = game.move({
     from: source,
     to: position,
     promotion: 'q' // Promote to a queen for example
  });

  // If the move is illegal, prevent the piece from moving
    if (move === null) return false;
}

// Handle the onDrop event
function onDrop(source, target) {
  // Try to make the move
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // Promote to a queen for example
  });

  // If the move is illegal, put the piece back on its original square
  if (move === null) return 'snapback';

   // Update the board with the new position
   board.position(game.fen());
}

// Handle the onSnapEnd event
function onSnapEnd() {
  board.position(game.fen());
}
