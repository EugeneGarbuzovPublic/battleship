namespace Battleship.Models
{
    public class PlayerGrid
    {
        public string PlayerId { get; set; }

        public SquareState[,] Grid { get; set; }
    }
}
