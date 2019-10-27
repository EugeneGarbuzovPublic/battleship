using System.Collections.Generic;

namespace Battleship.Models
{
    public class ShotResult
    {
        public Action CommonAction { get; set; }

        public List<Action> ShootingPlayerActions { get; } =
            new List<Action>();

        public string CurrentPlayerId { get; set; }
    }
}
