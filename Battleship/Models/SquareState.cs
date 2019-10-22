namespace Battleship.Models
{
    public enum SquareState
    {
        // todo battleship there is a match between Empty and Miss states and
        // between IntactShipPart and Hit
        Empty,
        IntactShipPart,
        Miss,
        Hit
    }
}
