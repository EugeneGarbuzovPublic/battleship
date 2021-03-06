﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace Battleship.Models
{
    public class BattleshipGame
    {
        private static int RequiredPlayersCount => 2;

        private static int GridSize => 10;

        private readonly List<PlayerGrid> _playersGrids =
            new List<PlayerGrid>(RequiredPlayersCount);

        private int? _currentPlayerIndex;

        public string CurrentPlayerId =>
            _currentPlayerIndex.HasValue
                ? _playersGrids[_currentPlayerIndex.Value].PlayerId
                : null;

        public bool AreShipsArranged =>
            _playersGrids.Count == RequiredPlayersCount &&
            _playersGrids.All(playerGrid => playerGrid.Grid != null);

        public bool AddPlayer(string id)
        {
            if (_playersGrids.Count >= RequiredPlayersCount)
            {
                return false;
            }

            _playersGrids.Add(new PlayerGrid
            {
                PlayerId = id
            });
            return true;
        }

        public void RemovePlayer(string id)
        {
            _playersGrids.RemoveAll(playerGrid => playerGrid.PlayerId == id);
        }

        public void ArrangeShips(string playerId,
            IEnumerable<int[]> shipSquares)
        {
            /*todo battleship check correctness*/
            var currentPlayer = GetCurrentGamePlayer(playerId);
            if (currentPlayer == null)
            {
                throw new ArgumentException(
                    $"Player with ID {playerId} not found.");
            }

            /*todo battleship check correctness*/
            if (AreShipsArranged)
            {
                throw new InvalidOperationException(
                    "Ships rearrangement is not allowed.");
            }

            var grid = new SquareState[GridSize, GridSize];
            foreach (var shipSquare in shipSquares)
            {
                grid[shipSquare[0], shipSquare[1]] = SquareState.IntactShipPart;
            }
            currentPlayer.Grid = grid;

            if (AreShipsArranged)
            {
                _currentPlayerIndex =
                    new Random().Next(0, RequiredPlayersCount);
            }
        }

        private PlayerGrid GetCurrentGamePlayer(string id)
        {
            return _playersGrids.Find(playerGrid => playerGrid.PlayerId == id);
        }
    }
}
