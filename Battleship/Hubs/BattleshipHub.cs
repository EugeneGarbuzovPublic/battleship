using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using Battleship.Models;
using Microsoft.AspNetCore.SignalR;

namespace Battleship.Hubs
{
    [SuppressMessage("ReSharper", "ClassNeverInstantiated.Global")]
    public class BattleshipHub : Hub
    {
        private static readonly BattleshipGame Game = new BattleshipGame();

        public override async Task OnConnectedAsync()
        {
            if (!Game.AddPlayer(Context.ConnectionId))
            {
                await Clients.Caller.SendAsync("MaxPlayers");
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            Game.RemovePlayer(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }

        [SuppressMessage("ReSharper", "UnusedMember.Global")]
        public async Task ArrangeGrid(IEnumerable<int[]> shipCells)
        {
            Game.ArrangeShips(Context.ConnectionId, shipCells);
            if (Game.AreShipsArranged)
            {
                var currentPlayerId = Game.CurrentPlayerId;
                const string methodName = "ShipsArranged";
                await Clients.Client(currentPlayerId)
                    .SendAsync(methodName, true);
                await Clients.AllExcept(currentPlayerId)
                    .SendAsync(methodName, false);
            }
        }

        public async Task Shoot(int row, int column)
        {
            Game.Shoot(Context.ConnectionId, row, column);
        }
    }
}
