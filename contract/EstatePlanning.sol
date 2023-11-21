//SPDX-License-Identifier: MIT 

pragma solidity ^0.8.0; 

 

contract EstatePlanning{ //the contract block 

 

//The variables 

address public admin;// only one admin 

address public trustor; 

address[] trustees; 

mapping(address => uint ) public beneficiaries; 

 

uint totalAmount; 

string trustName;//keyword 

bool isRevoked; 

 

mapping(address => bool) activeTrustor; 

mapping (address => uint) trustes; 

 

//the functions 

 

//getters and setters for admin 

function setAdmin(address admn)public{ 

    admin = admn; 

} 

function getAdmin()public view returns (address) { 

    return admin; 

} 

 

//getters and setters for trustor 

function setTrustor(address trustors)public{ 

    trustor = trustors; 

} 

function getTrustor()public view returns (address) { 

    return trustor; 

} 

 

//getters and setters for trustees 

function setTrustees(address [] memory trustee)public{ 

    trustees = trustee; 

} 

function getTrustees()public view returns (address [] memory) { 

    return trustees; 

} 

 

//getters and setters for beneficiaries 

function setBeneficiaries(address beneficiary, uint num)public{ 

    beneficiaries[beneficiary] = num; 

} 

function getBeneficiaries(address beneficiary)public view returns (uint) { 

    return beneficiaries[beneficiary]; 

} 

 

//restricted modifiers for admin, address, amount, status not revoke 

modifier restricted1() { 

        require(msg.sender == admin); 

        //require(address(this).balance >=); 

        //require(isRevoked == false); 

        _; 

    } 

 

//set trustee active status(restricted, contract is in revokeable state, is actually trustor) 

modifier restricted2() { 

        require(msg.sender == trustor); 

       // require(isRevoked); 

       // require(); 

        _; 

    } 

//beneficiaries 

//adding beneficiaries 

function addBeneficiaries(address beneficiary, uint num) public { 

      beneficiaries[beneficiary] = num; 

} 

 

//adding trustees 

function addTrustees(address [] memory trustee)public restricted2{ 

    trustees = trustee; 

} 

} 

 

 