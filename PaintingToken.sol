pragma solidity ^0.5.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC20/ERC20Detailed.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/math/SafeMath.sol";

//painting contract

contract PaintingToken is ERC20Detailed {
    using SafeMath for uint256;

    mapping (address => uint256) private _balances;

    mapping (address => mapping (address => uint256)) private _allowances;

    uint256 private _totalSupply;
    
    mapping (address => uint256) public percentageShare;
    
    uint256 public percentageTotal;

    mapping (address => bool) public participants;
    
    uint256 public totalParticipants = 0;
    
    constructor(string memory name, string memory symbol, uint8 decimals,uint256 totalSupply) ERC20Detailed(name,symbol,decimals) public {
        _totalSupply = totalSupply;
        _balances[msg.sender] = _totalSupply;
    }


    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

 
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }


    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
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
        
        uint256 balanceOfReceiver = balanceOf(recipient);
        uint256 balanceOfSender = balanceOf(sender);
        
        uint256 percentage = (balanceOfReceiver/_totalSupply)*100;
        uint256 percentageOfSender = (balanceOfSender/_totalSupply)*100;
        
        // to maintain the % share of receiver
        if(percentage>1){
            if(percentage>=25 && percentage <50){
                percentageShare[recipient] = 1;    
                percentageTotal = percentageTotal.add(1);
            }else if(percentage>=50 && percentage <75){
                percentageShare[recipient] = 2;
                percentageTotal = percentageTotal.add(2);
            }else if(percentage>=75){
                percentageShare[recipient] = 3;
                percentageTotal = percentageTotal.add(3);
            }
        }
        
        if(participants[recipient]==false){
            totalParticipants = totalParticipants.add(1);
            participants[recipient] = true;
        }
        
        // to maintian the % share of sender also
    	if(percentageOfSender < 25){
    	    
            participants[sender] = false;
            totalParticipants = totalParticipants.sub(1);
            percentageTotal.sub(percentageShare[sender]);
            percentageShare[sender] = 0;
            
	    }else{
	         if(percentageOfSender>=25 && percentageOfSender <50){
	           
	            percentageTotal.sub(percentageShare[sender]);
                percentageShare[sender] = 1;
                percentageTotal.add(percentageShare[sender]);
            }else if(percentageOfSender>=50 && percentageOfSender <75){
                
                percentageTotal.sub(percentageShare[sender]);
                percentageShare[sender] = 2;
                percentageTotal.add(percentageShare[sender]);

            }else if(percentageOfSender>=75){
                
                percentageTotal.sub(percentageShare[sender]);
                percentageShare[sender] = 3;
                percentageTotal.add(percentageShare[sender]);

                
            }
            participants[sender] = true;
    	}
        emit Transfer(sender, recipient, amount);
    }


    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
    
    function getParticipantState(address _address) public view returns (bool){
        return participants[_address];
    }
    
    function getPercentageShare(address _address) public view returns (uint256){
        return percentageShare[_address];
    }
    
    function getTotalParticipant() public view returns (uint256){
        return totalParticipants;
    }
    
    function getTotalPercentage() public view returns (uint256){
        return percentageTotal;
    }
}
