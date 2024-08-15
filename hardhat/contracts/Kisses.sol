// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Kisses {
    address public owner;

    // Mappings to store the interactions and points
    mapping(address => mapping(address => string)) public actions;
    mapping(address => uint256) public points;

    // Struct to store action details
    struct Action {
        address player1;
        address player2;
        string action1;
        string action2;
    }

    // Struct to store player details for the leaderboard
    struct Player {
        address playerAddress;
        uint256 playerPoints;
    }

    // Array to store the latest actions
    Action[] public latestActions;

    // Array to store the top 10 players for the leaderboard
    Player[10] public leaderboard;

    // Modifier to restrict function access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    // Modifier to ensure a player can't act on the same person twice
    modifier noRepeatedActions(address _sender, address _recipient) {
        require(
            keccak256(abi.encodePacked(actions[_sender][_recipient])) == keccak256(abi.encodePacked("")),
            "Action already taken on this person"
        );
        _;
    }

    // Constructor to set the owner as the contract deployer
	constructor(address _owner) {
		owner = _owner;
	}

    // Internal function to record an action
    function _recordAction(address _sender, address _recipient, string memory _action) internal {
        actions[_sender][_recipient] = _action;
        _resolvePoints(_sender, _recipient);
        _storeAction(_sender, _recipient);
        _updateLeaderboard(_sender);
        _updateLeaderboard(_recipient);
    }

    // Function to record a kiss
    function kiss(address _sender, address _recipient) external onlyOwner noRepeatedActions(_sender,_recipient) {
        _recordAction(_sender, _recipient, "kiss");
    }

    // Function to record a slap
    function slap(address _sender, address _recipient) external onlyOwner noRepeatedActions(_sender, _recipient) {
        _recordAction(_sender, _recipient, "slap");
    }

    // Function to resolve points based on the actions
    function _resolvePoints(address _player1, address _player2) internal {
        string memory action1 = actions[_player1][_player2];
        string memory action2 = actions[_player2][_player1];

        if (keccak256(abi.encodePacked(action1)) == keccak256(abi.encodePacked("kiss")) &&
            keccak256(abi.encodePacked(action2)) == keccak256(abi.encodePacked("kiss"))) {
            points[_player1] += 1;
            points[_player2] += 1;
        } else if (keccak256(abi.encodePacked(action1)) == keccak256(abi.encodePacked("kiss")) &&
                   keccak256(abi.encodePacked(action2)) == keccak256(abi.encodePacked("slap"))) {
            points[_player2] += 2;
        } else if (keccak256(abi.encodePacked(action1)) == keccak256(abi.encodePacked("slap")) &&
                   keccak256(abi.encodePacked(action2)) == keccak256(abi.encodePacked("kiss"))) {
            points[_player1] += 2;
        } else if (keccak256(abi.encodePacked(action1)) == keccak256(abi.encodePacked("slap")) &&
                   keccak256(abi.encodePacked(action2)) == keccak256(abi.encodePacked("slap"))) {
            // No points are awarded when both players slap each other
        }
    }

    // Function to store the latest action
    function _storeAction(address _player1, address _player2) internal {
        Action memory newAction = Action({
            player1: _player1,
            player2: _player2,
            action1: actions[_player1][_player2],
            action2: actions[_player2][_player1]
        });

        if (latestActions.length < 10) {
            latestActions.push(newAction);
        } else {
            for (uint256 i = 0; i < 9; i++) {
                latestActions[i] = latestActions[i + 1];
            }
            latestActions[9] = newAction;
        }
    }

    // Function to update the leaderboard
    function _updateLeaderboard(address _player) internal {
        uint256 playerPoints = points[_player];

        for (uint256 i = 0; i < 10; i++) {
            if (leaderboard[i].playerAddress == _player) {
                leaderboard[i].playerPoints = playerPoints;
                break;
            } else if (playerPoints > leaderboard[i].playerPoints) {
                for (uint256 j = 9; j > i; j--) {
                    leaderboard[j] = leaderboard[j - 1];
                }
                leaderboard[i] = Player({playerAddress: _player, playerPoints: playerPoints});
                break;
            }
        }
    }

    // Function to get the leaderboard
    function getLeaderboard() external view returns (Player[10] memory) {
        return leaderboard;
    }

    // Function to get the latest actions
    function getLatestActions() external view returns (Action[] memory) {
        return latestActions;
    }

    // Function to check points of a specific player
    function getPoints(address _player) external view returns (uint256) {
        return points[_player];
    }

    // Function to check the last action between two players
    function getAction(address _from, address _to) external view returns (string memory) {
        return actions[_from][_to];
    }
}