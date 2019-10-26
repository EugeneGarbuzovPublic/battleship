using System.Collections.Generic;

namespace Battleship.Models
{
    public class ShotResult
    {
        public List<Action> Actions { get; set; }

        public bool TurnsSwitched { get; set; }
    }
}
