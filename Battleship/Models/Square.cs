using System;

namespace Battleship.Models
{
    public class Square : IEquatable<Square>
    {
        public int VerticalIndex { get; }

        public int HorizontalIndex { get; }

        public Square(int verticalIndex, int horizontalIndex)
        {
            BattleshipGame.CheckSquareIndex(verticalIndex,
                nameof(verticalIndex));
            BattleshipGame.CheckSquareIndex(horizontalIndex,
                nameof(horizontalIndex));

            VerticalIndex = verticalIndex;
            HorizontalIndex = horizontalIndex;
        }

        public bool Equals(Square other)
        {
            if (ReferenceEquals(null, other))
            {
                return false;
            }
            if (ReferenceEquals(this, other))
            {
                return true;
            }
            return VerticalIndex == other.VerticalIndex &&
                   HorizontalIndex == other.HorizontalIndex;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj))
            {
                return false;
            }
            if (ReferenceEquals(this, obj))
            {
                return true;
            }
            return obj.GetType() == GetType() && Equals((Square)obj);
        }

        public override int GetHashCode()
        {
            unchecked
            {
                return (VerticalIndex * 397) ^ HorizontalIndex;
            }
        }

        public static bool operator ==(Square left, Square right)
        {
            return Equals(left, right);
        }

        public static bool operator !=(Square left, Square right)
        {
            return !Equals(left, right);
        }
    }
}
