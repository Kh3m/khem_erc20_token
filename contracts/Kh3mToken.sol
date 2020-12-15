// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Kh3mToken {
    uint256 public totalSupply;
    string public name = "Kh3m Token";
    string public symbol = "K3T";
    string public standard = "Kh3m Token v1.0";

    // ===== EVENTS =====
    event Transfer(address indexed _from, address indexed _to, uint value);

    // ===== MODIFIERS =====
    modifier hasEnoughBalance(uint256 _value) {
        require(
            balanceOf[msg.sender] >= _value,
            "Revert No Enough Balance"
        );
        _;
    }

    mapping( address => uint256 ) public balanceOf;

    constructor( uint256 _initialSupply ) public {
        balanceOf[ msg.sender ] = _initialSupply;
        totalSupply = _initialSupply;
    }

    function transfer(address _to, uint256 _value) 
    public 
    hasEnoughBalance( _value )
    returns (bool success)
    {
        balanceOf[ msg.sender ] -= _value;
        balanceOf[ _to ] += _value; 

        emit Transfer(msg.sender, _to, _value);
        
        success = true;
    }
}