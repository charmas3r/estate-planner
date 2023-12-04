//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract EstatePlanningFactory {
    EstatePlanning[] public deployedCampaigns;

    function createCampaign(string memory _trustName) public {
        EstatePlanning newCampaign = new EstatePlanning(_trustName);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (EstatePlanning[] memory) {
        return deployedCampaigns;
    }
}


contract EstatePlanning { //the contracts block

    //new contracts

    //The variables

    //string[2] owner = ["admin","trustor"];

    address public admin;// only one admin

    address public trustor;
    
    address Owner1 = admin;//for require
    address Owner2 = payable( trustor);//for require

    address[] trustees;

    mapping(address => uint) public  beneficiariesPercentage;
    address[] beneficiaries;//new change created the array of beneficiaries
    uint256 numOfBeneficiaries;//new change


    uint totalAmount;

    uint256 public payPercentage;//new change

    string trustName;//keyword

    bool isRevoked;

    bool activeStatus = true;


    mapping(address => bool) activeTrustor;

    mapping(address => uint) trustes;

    //the functions
    //The constructor

    //This is the new pay function
    function payoutTrust() public { 
        require (msg.sender == Owner1 || msg.sender == Owner2);// admin and trustor both 
        uint256 arrayLength = beneficiaries.length;
        for (uint256 i = 0; i < arrayLength; i++) { 
    // payout the contract to all beneficiaries... 
        address payable payoutAddress = payable(beneficiaries[i]); 
    // get the percentage assigned to this beneficiary 
        uint256 percentage = beneficiariesPercentage[payoutAddress];
     // finish the payout ... 
        payoutAddress.transfer(address(this).balance * percentage / 100.0);
     } 
     }


    /*function payNow(address beneficiary) public { 
        uint arrayLength = beneficiaries.length;
         for (uint i=0; i<arrayLength; i++)
          { if (beneficiaries[i] == beneficiary)
           { // payout the contract. 
           address payable payoutAddress = payable(beneficiaries[i]); 
           payoutAddress.transfer(address(this).balance);
            } 
            } 
            }*/

   /* function payNow(address payable beneficiary) public payable {
        require (msg.sender == Owner1 || msg.sender == Owner2);// admin and trustor both 
        beneficiary.transfer(address(this).balance);
        
    }*/

    //This is the new function to pay the beneficiaries, only accessed by trustor
   // function payBeneficiaries(uint256 reward)public requireTrustorOnly {
    //for(uint256 i = 0; i < numOfBeneficiaries; i++){
       // address payable beneficiarypay = payable(beneficiaries);
      //  beneficiarypay.transfer((totalAmount[beneficiarypay] * payPercentage)/ 100.0);
   // }
   //}
   

    constructor(string memory _trustName) payable {
        trustor = msg.sender;
        trustName = _trustName;
    }

    //the destructor

    function deleteContract() public returns(bool) {
        selfdestruct(payable(trustor));//typecast to payable bcuz not supported after 0.8.0
        activeStatus = false;//The contract is no longer active
        return activeStatus;
    }

    //getters and setters for admin

    function setAdmin(address admn) public {

        admin = admn;

    }

    function getAdmin() public view returns (address) {

        return admin;

    }

    //getters and setters for trustor

    function setTrustor(address trustors) public {

        trustor = trustors;

    }

    function getTrustor() public view returns (address) {

        return trustor;

    }

    //getters and setters for trustees

    function setTrustees(address [] memory trustee) public {

        trustees = trustee;

    }

    function getTrustees() public view returns (address [] memory) {

        return trustees;

    }

    //getters and setters for beneficiaries

    function setBeneficiaries(address beneficiary, uint num) public {
        beneficiariesPercentage[beneficiary] = num;
        beneficiaries.push(beneficiary); 
    }

    function getBeneficiaries(address beneficiary) public view returns (uint) {

        return beneficiariesPercentage[beneficiary];

    }

    // temporary method to return some minimal trust details needed for displaying landing screen in app
    // TODO complete this method.
    // So far trustor, trustees, beneficiaries, totalAmount, trustName is added to be returned
    function getTrustDetails(address beneficiary) public view returns (
        address,
        address[] memory,
        uint256,
        uint256,
        string memory,
        bool
    ){
        return (
            trustor,
            trustees,
            beneficiariesPercentage[beneficiary],//percentage details
            totalAmount,
            trustName,
            activeStatus
        );
    }

    //restricted modifiers for admin, address, amount, status not revoke

    modifier requireAdminOnly() {

        require(msg.sender == admin);

        //require(address(this).balance >=);

       // require(activeStatus != false);

        _;

    }

    //set trustee active status(restricted, contracts is in revokeable state, is actually trustor)

    modifier requireTrustorOnly() {

        require(msg.sender == trustor);

        // require(activeStatus != false);

        // require(isRevoked);

        // require();

        _;

    }

    //beneficiaries

    //adding beneficiaries

   /* function addBeneficiaries(address beneficiary, uint num) public {

        beneficiariesPercentage[beneficiary] = num;
        numOfBeneficiaries++;

    }*/

    //adding trustees

    function addTrustees(address [] memory trustee) public payable requireAdminOnly {

        trustees = trustee;

    }

}

   

    