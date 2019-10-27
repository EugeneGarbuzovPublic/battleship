using System.Collections.Generic;

namespace Battleship.Models
{
    public class ShotResultForPlayer
    {
        public IEnumerable<Action> Actions { get; set; }

        public bool IsTurn { get; set; }
    }
}
