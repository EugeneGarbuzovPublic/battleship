using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Battleship.Hubs
{
    public class BattleshipHub : Hub
    {
        /*todo move into a game entity*/
        private int _playersCount = 0;

        public async Task ArrangeGrid()
        {
            if (_playersCount >= 2)
            {
                await Clients.Caller.SendAsync("MaxPlayers");
            }
            /*todo continue*/
        }

        public override Task OnConnectedAsync()
        {
            _playersCount++;
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            _playersCount--;
            return base.OnDisconnectedAsync(exception);
        }
    }
}
