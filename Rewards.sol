pragma solidity ^0.5.0;


import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC20/ERC20Detailed.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/math/SafeMath.sol";
import "./PaintingToken.sol";
//incentivetoken contract

contract IncentiveToken is ERC20Detailed {
    using SafeMath for uint256;
    
    uint256 private _totalSupply;

    mapping (address => uint256) private _balances;

    mapping (address => mapping (address => uint256)) private _allowances;
    
    uint256 public basePercent = 100;


// distributor properties
    uint256 public roundMask;
    uint256 public lastMintedBlockNumber;
    uint256 public tokensPerBlock; 
    uint256 public blockFreezeInterval; 
    address public tokencontractAddress = address(this);

    PaintingToken public contractInstance ;
    mapping(address => uint256) public participantMask;
    
    constructor(string memory name, string memory symbol, uint256 totalSupply,uint256 _tokensPerBlock, uint256 _blockFreezeInterval,address addr) ERC20Detailed(name,symbol,2) public {
        _totalSupply = totalSupply;
        contractInstance=PaintingToken(addr);
        _balances[msg.sender] = _totalSupply;
	    lastMintedBlockNumber = block.number;
        tokensPerBlock = _tokensPerBlock;
        blockFreezeInterval = _blockFreezeInterval;
    }
    

     modifier isAuthorized() {
//        require(isMinter(msg.sender));
	    require(contractInstance.getParticipantState(msg.sender) == true);
        _;
    }

  
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

 
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }


    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(address(this), recipient, amount);
        return true;
    }

  
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }


    function approve(address spender, uint256 amount) public returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }


    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender,msg.sender, _allowances[sender][msg.sender].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }


    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].add(addedValue));
        return true;
    }


    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));
        return true;
    }


    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }


    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
    
    
    function mint(address account, uint256 amount) public isAuthorized returns (bool) {
        _mint(account, amount);
        return true;
    }
    

    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
    
    // for reward we are using the same contract


    function trigger() external isAuthorized returns (bool) {
        bool res = readyToMint();
        if(res == false) {
            return false;
        } else {
            mintTokens();
        return true;
        }
    }


    function withdraw() external isAuthorized returns (bool) {
        uint256 amount = calculateRewards();
        require(amount >0);
        transfer(msg.sender, amount.add(amount.mul(contractInstance.getPercentageShare(msg.sender))));
    }

    function readyToMint() public view returns (bool) {
        uint256 currentBlockNumber = block.number;
        uint256 lastBlockNumber = lastMintedBlockNumber;
        if(currentBlockNumber > lastBlockNumber + blockFreezeInterval) { 
            return true;
        } else {
            return false;
    	}
    }


    function calculateRewards() private returns (uint256) {
        uint256 playerMask = participantMask[msg.sender];
        uint256 rewards = roundMask.sub(playerMask);
        updateParticipantMask(msg.sender);
        return rewards;
    }

  
    function mintTokens() private returns (bool) {
        uint256 currentBlockNumber = block.number;
        
        //multiply to cover up % reward
        uint256 tokenReleaseAmount = (currentBlockNumber.sub(lastMintedBlockNumber)).mul(tokensPerBlock);
        if(contractInstance.getTotalPercentage() != 0){
             tokenReleaseAmount = tokenReleaseAmount.mul(contractInstance.getTotalPercentage());     
        }
                lastMintedBlockNumber = currentBlockNumber;
        mint(tokencontractAddress, tokenReleaseAmount);
        calculateTPP(tokenReleaseAmount);
        return true;
    }
    


    function calculateTPP(uint256 tokens) private returns (bool) {
        uint256 tpp = tokens.div(contractInstance.getTotalParticipant());
        updateRoundMask(tpp);
        return true;
    }


    function updateRoundMask(uint256 tpp) private returns (bool) {
        roundMask = roundMask.add(tpp);
        return true;
    }


    function updateParticipantMask(address participant) private returns (bool) {
        uint256 previousRoundMask = roundMask;
        participantMask[participant] = previousRoundMask;
        return true;
    }
    
}
