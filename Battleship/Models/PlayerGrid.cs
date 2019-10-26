using System.Collections.Generic;

namespace Battleship.Models
{
    public class PlayerGrid
    {
        public string PlayerId { get; set; }

        // todo battleship add validations
        public IEnumerable<Ship> Ships { get; set; }

        public ShotList Shots { get; } = new ShotList();
    }
}
