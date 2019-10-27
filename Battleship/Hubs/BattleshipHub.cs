using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Battleship.Models;
using Microsoft.AspNetCore.SignalR;
using Action = Battleship.Models.Action;

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
        public async Task ArrangeShips(
            IEnumerable<IEnumerable<SquareData>> shipsData)
        {
            var ships = shipsData.Select(shipData =>
            {
                var squares = shipData.Select(
                    squareData => new Square(squareData.Y, squareData.X)
                );
                return new Ship(squares);
            });

            var result = Game.ArrangeShips(Context.ConnectionId, ships);
            if (result.AreShipsArranged)
            {
                var currentPlayerId = result.CurrentPlayerId;
                const string methodName = "ShipsArranged";
                await Clients.Client(currentPlayerId)
                    .SendAsync(methodName, true);
                await Clients.AllExcept(currentPlayerId)
                    .SendAsync(methodName, false);
            }
        }

        // todo battleship test two consecutive shots from the same player
        // todo battleship move domain to a separate assembly
        public async Task<ShotResultForPlayer> Shoot(int row, int column)
        {
            var result = Game.Shoot(Context.ConnectionId, row, column);

            var shootingPlayerId = Context.ConnectionId;
            var currentPlayerId = result.CurrentPlayerId;

            const string methodName = "Shot";

            var commonActionList = new List<Action>();
            if (result.CommonAction != default(Action))
            {
                commonActionList.Add(result.CommonAction);
            }

            if (currentPlayerId == shootingPlayerId)
            {
                await Clients.Others.SendAsync(methodName,
                    new ShotResultForPlayer
                    {
                        Actions = commonActionList,
                        IsTurn = false
                    });
                return new ShotResultForPlayer
                {
                    Actions =
                        commonActionList.Concat(result.ShootingPlayerActions),
                    IsTurn = true
                };
            }

            await Clients.Client(currentPlayerId)
                .SendAsync(methodName, new ShotResultForPlayer
                {
                    Actions = commonActionList,
                    IsTurn = true,
                });
            await Clients.AllExcept(shootingPlayerId, currentPlayerId)
                .SendAsync(methodName, new ShotResultForPlayer
                {
                    Actions = commonActionList,
                    IsTurn = false,
                });
            return new ShotResultForPlayer
            {
                Actions =
                    commonActionList.Concat(result.ShootingPlayerActions),
                IsTurn = false,
            };
        }
    }
}
