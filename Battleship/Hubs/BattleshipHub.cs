using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Battleship.Models;
using Microsoft.AspNetCore.SignalR;

namespace Battleship.Hubs
{
    public class BattleshipHub : Hub
    {
        /*todo move into a game entity*/
        private static readonly List<string> _players
            = new List<string>(BattleshipGame.MaxPlayersCount);

        public async Task ArrangeGrid(int[][] shipCells)
        {
            /*todo continue*/
        }

        public override async Task OnConnectedAsync()
        {
            if (_players.Count < BattleshipGame.MaxPlayersCount)
            {
                _players.Add(Context.ConnectionId);
            }
            else
            {
                await Clients.Caller.SendAsync("MaxPlayers");
            }
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (_players.Contains(Context.ConnectionId))
            {
                _players.Remove(Context.ConnectionId);
            }
            await base.OnDisconnectedAsync(exception);
        }
    }
}
