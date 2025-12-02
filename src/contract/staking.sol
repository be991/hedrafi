// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Simple Hedera Token Service interface
interface IHederaTokenService {
    function transferToken(
        address token,
        address sender,
        address receiver,
        int64 amount
    ) external returns (int responseCode);

    function associateToken(address account, address token) external returns (int responseCode);
}

int constant HEDERA_SUCCESS = 22;

contract HedraFiYieldFarm{ 
    IHederaTokenService constant HTS = IHederaTokenService(address(0x167));

    address public admin;                  // Admin address
    address public rewardToken;            // HTS token address
    uint256 public totalStakedHBAR;        // Total HBAR staked
    uint256 public rewardRatePerSecond;    // Fixed HTS tokens per HBAR per second
    uint256 public totalRewardPaid;        // Total HTS distributed
    uint256 public totalUsers;             // Total unique stakers

    uint256 constant INT64_MAX = 9223372036854775807; // 2^63 - 1

    struct UserInfo {
        uint256 stakedAmount;      // HBAR staked
        uint256 rewardDebt;        // HTS already claimed
        uint256 lastUpdate;        // Last timestamp rewards were calculated
    }

    mapping(address => UserInfo) public users;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    constructor(address _rewardToken, uint256 _rewardRatePerSecond) {
        require(_rewardToken != address(0), "Invalid reward token");
        admin = msg.sender;
        rewardToken = _rewardToken;
        rewardRatePerSecond = _rewardRatePerSecond;
    }

    // Stake HBAR
    function stake() external payable {
        require(msg.value > 0, "Must stake positive amount");

        UserInfo storage user = users[msg.sender];

        // Calculate and transfer pending rewards
        uint256 pending = pendingReward(msg.sender);
        if (pending > 0) {
            _safeRewardTransfer(msg.sender, pending);
            totalRewardPaid += pending;
            user.rewardDebt += pending;
        }

        // Update user stake
        if (user.stakedAmount == 0) {
            totalUsers += 1;
        }

        user.stakedAmount += msg.value;
        user.lastUpdate = block.timestamp;
        totalStakedHBAR += msg.value;

        emit Staked(msg.sender, msg.value);
    }

    // Unstake HBAR
    function unstake(uint256 amount) external {
        UserInfo storage user = users[msg.sender];
        require(user.stakedAmount >= amount, "Not enough staked");

        // Update rewards
        uint256 pending = pendingReward(msg.sender);
        if (pending > 0) {
            _safeRewardTransfer(msg.sender, pending);
            totalRewardPaid += pending;
            user.rewardDebt += pending;
        }

        user.stakedAmount -= amount;
        user.lastUpdate = block.timestamp;
        totalStakedHBAR -= amount;

        // Transfer HBAR back to user
        payable(msg.sender).transfer(amount);

        emit Unstaked(msg.sender, amount);
    }

    // Claim HTS rewards without unstaking
    function claimReward() external {
        uint256 pending = pendingReward(msg.sender);
        require(pending > 0, "No rewards to claim");

        users[msg.sender].lastUpdate = block.timestamp;
        users[msg.sender].rewardDebt += pending;
        totalRewardPaid += pending;

        _safeRewardTransfer(msg.sender, pending);

        emit RewardClaimed(msg.sender, pending);
    }

    // View pending HTS reward
    function pendingReward(address userAddr) public view returns (uint256) {
        UserInfo storage user = users[userAddr];
        if (user.stakedAmount == 0 || totalStakedHBAR == 0) return 0;

        uint256 elapsed = block.timestamp - user.lastUpdate;
        uint256 reward = (user.stakedAmount * rewardRatePerSecond * elapsed) / 1e18;
        return reward;
    }

    // Admin can update reward rate
    function setRewardRate(uint256 _rewardRatePerSecond) external onlyAdmin {
        rewardRatePerSecond = _rewardRatePerSecond;
    }

    // Admin can withdraw extra HBAR (not user stakes)
    function adminWithdrawHBAR(uint256 amount) external onlyAdmin {
        payable(admin).transfer(amount);
    }

    // Internal function to safely transfer HTS rewards
    function _safeRewardTransfer(address to, uint256 amount) internal {
        require(amount <= INT64_MAX, "Amount exceeds int64 max");
        int64 amt = int64(int256(amount)); 
        int response = HTS.transferToken(rewardToken, address(this), to, amt);
        require(response == HEDERA_SUCCESS, "HTS transfer failed");
    }

    // Frontend-friendly getters
    function userStake(address userAddr) external view returns (uint256) {
        return users[userAddr].stakedAmount;
    }

    function userRewardDebt(address userAddr) external view returns (uint256) {
        return users[userAddr].rewardDebt;
    }
 
    
    function associateSelf(address token) external onlyAdmin returns (int) {
        int response = HTS.associateToken(address(this), token); 
        require(response == 22, "Association failed");
        return response;
    } 
}
