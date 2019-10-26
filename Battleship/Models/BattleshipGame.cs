using System;
using System.Collections.Generic;
using System.Linq;

namespace Battleship.Models
{
    public class BattleshipGame
    {
        private const int RequiredPlayersCount = 2;

        private const int MinSquareIndex = 0;

        private const int MaxSquareIndex = GridSize - 1;

        private const bool ShouldAddUselessShots = true;

        // todo battleship consider optimizing for 2 players
        private readonly List<PlayerGrid> _playersGrids =
            new List<PlayerGrid>(RequiredPlayersCount);

        private int? _currentPlayerIndex;

        public const int GridSize = 10;

        public static int MaxShipSize => 4;

        public string CurrentPlayerId =>
            _currentPlayerIndex.HasValue
                ? _playersGrids[_currentPlayerIndex.Value].PlayerId
                : null;

        private PlayerGrid EnemyGrid =>
            _playersGrids.First(g => g.PlayerId != CurrentPlayerId);

        public bool AreShipsArranged =>
            _playersGrids.Count == RequiredPlayersCount &&
            _playersGrids.All(playerGrid => playerGrid.Ships != null);

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
            var currentPlayer = GetPlayerGrid(playerId);
            if (currentPlayer == null)
            {
                /*todo battleship localize*/
                throw new ArgumentException(
                    $"Player with ID {playerId} not found.");
            }

            /*todo battleship check correctness*/
            if (AreShipsArranged)
            {
                /*todo battleship localize*/
                throw new InvalidOperationException(
                    "Ships rearrangement is not allowed.");
            }

            var grid = new SquareState[GridSize, GridSize];
            foreach (var shipSquare in shipSquares)
            {
                grid[shipSquare[0], shipSquare[1]] =
                    SquareState.IntactShipPart;
            }

            currentPlayer.Grid = grid;

            if (AreShipsArranged)
            {
                /*todo battleship use a stronger algorithm*/
                _currentPlayerIndex =
                    new Random().Next(0, RequiredPlayersCount);
            }
        }

        public ShotResult Shoot(string playerId, int row, int column)
        {
            var noneResult = new ShotResult
            {
                Actions = new List<Action>(),
                TurnsSwitched = false,
            };

            if (playerId != CurrentPlayerId)
            {
                return noneResult;
            }

            CheckSquareIndex(row, nameof(row));
            CheckSquareIndex(column, nameof(column));

            var currentShot = new Square(row, column);

            var shots = EnemyGrid.Shots;
            var isAlreadyShot = shots.Exists(shot => shot == currentShot);
            if (isAlreadyShot)
            {
                return noneResult;
            }

            var result = new ShotResult
            {
                Actions = new List<Action>(),
                TurnsSwitched = true,
            };

            var hitShip = EnemyGrid.Ships.FirstOrDefault(ship =>
                ship.Squares.Any(
                    sq => sq == currentShot));
            if (hitShip != default(Ship))
            {
                var otherSquares =
                    hitShip.Squares.Where(sq => sq != currentShot);
                var isSunk = otherSquares.All(sq =>
                    shots.Exists(sh => sh == currentShot));
                if (isSunk)
                {
                    result.Actions.Add(new Action
                    {
                        Square = currentShot,
                        Result = SquareShotResult.Hit,
                    });
                    // ReSharper disable once ConditionIsAlwaysTrueOrFalse
                    if (ShouldAddUselessShots)
                    {
                        AddUselessShots(hitShip, shots);
                    }
                }
                else
                {
                    result.Actions.Add(new Action
                    {
                        Square = currentShot,
                        Result = SquareShotResult.Hit,
                    });
                }
            }
            else
            {
                result.Actions.Add(new Action
                {
                    Square = currentShot,
                    Result = SquareShotResult.Miss,
                });
            }

            SetNextTurn();
            return result;
        }

        public static void CheckSquareIndex(int index, string indexName)
        {
            if (IsCorrectSquareIndex(index))
            {
                return;
            }

            var message = string.Format(
                Resources.BattleshipGame.IncorrectIndex, nameof(index),
                MinSquareIndex, MaxSquareIndex);
            throw new ArgumentException(message, indexName);
        }

        private static bool IsCorrectSquareIndex(int index)
        {
            // todo battleship bind to game settings
            return index >= MinSquareIndex && index <= MaxSquareIndex;
        }

        private PlayerGrid GetPlayerGrid(string id)
        {
            return _playersGrids.Find(playerGrid => playerGrid.PlayerId == id);
        }

        private static void AddUselessShots(Ship ship, ShotList shots)
        {
            var squares = ship.Squares;
            foreach (var square in squares)
            {
                var shifts = new[]
                {
                    -1, 0, 1
                };
                var pointShifts = shifts.SelectMany(rowShift =>
                        shifts.Select(columnShift => (rowShift, columnShift)))
                    .Where(pointShift =>
                        pointShift.rowShift != 0 &&
                        pointShift.columnShift != 0);

                /*todo battleship rename all vertical to row
                and all horizontal to column*/
                var closeSquaresIndices = pointShifts.Select(pointShift =>
                    (rowIndex: square.VerticalIndex + pointShift.rowShift,
                        columnIndex: square.HorizontalIndex +
                                     pointShift.columnShift));

                var existingSquares = closeSquaresIndices.Where(
                    closeSquareIndices =>
                        IsCorrectSquareIndex(closeSquareIndices.rowIndex) &&
                        IsCorrectSquareIndex(closeSquareIndices.columnIndex));

                var uselessShots = existingSquares.Select(existingSquare =>
                    new Square(existingSquare.rowIndex,
                        existingSquare.columnIndex));
                shots.AddRange(uselessShots);
            }
        }

        private void SetNextTurn()
        {
            if (_currentPlayerIndex == _playersGrids.Count - 1)
            {
                _currentPlayerIndex = 0;
            }
            else
            {
                _currentPlayerIndex++;
            }
        }
    }
}
