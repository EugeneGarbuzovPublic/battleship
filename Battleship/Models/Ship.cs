using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace Battleship.Models
{
    public class Ship
    {
        public IReadOnlyCollection<Square> Squares { get; }

        public Ship(IEnumerable<Square> squares)
        {
            var squaresList = squares.ToList();
            var squaresNumber = squaresList.Count;
            if (squaresNumber <= 0 || squaresNumber > BattleshipGame.MaxShipSize)
            {
                var maxShipSize = BattleshipGame.MaxShipSize;
                var message = string.Format(Resources.Ship.IncorrectSquares,
                    maxShipSize);
                throw new ArgumentException(message, nameof(squares));
            }

            Squares = new ReadOnlyCollection<Square>(squaresList);
        }
    }
}
