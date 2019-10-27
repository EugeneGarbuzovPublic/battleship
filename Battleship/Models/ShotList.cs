using System;
using System.Collections.Generic;

namespace Battleship.Models
{
    public class ShotList
    {
        private readonly List<Square> _squares =
            new List<Square>(BattleshipGame.GridSize * BattleshipGame.GridSize);

        public bool Add(Square square)
        {
            if (_squares.Contains(square))
            {
                return false;
            }

            _squares.Add(square);
            return true;
        }

        public bool Exists(Predicate<Square> match)
        {
            return _squares.Exists(match);
        }
    }
}
