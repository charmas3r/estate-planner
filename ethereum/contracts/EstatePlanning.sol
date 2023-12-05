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


    //The variables

    address  admin;// only one admin

    address public trustor;
    

    address[] trustees;

    mapping(address => uint) public  beneficiariesPercentage;
    address[] beneficiaries;//new change created the array of beneficiaries
    

    uint totalAmount;

    string trustName;//keyword


    bool activeStatus = true;


    mapping(address => bool) activeTrustor;


    //the functions

    

    //This is the new pay function
    function payoutTrust() public { 
        require (msg.sender == admin || msg.sender == trustor);// admin and trustor both 
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

   
//The constructor

    constructor(string memory _trustName) payable {
        trustor = msg.sender;
        trustName = _trustName;
    }

    //the destructor

    function deleteContract() private requireTrustorOnly returns(bool) {
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

    //getters for trustees


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
        bool,
        address[] memory
    ){
        return (
            trustor,
            trustees,
            beneficiariesPercentage[beneficiary],//percentage details
            totalAmount,
            trustName,
            activeStatus,
            beneficiaries
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




   
    //adding trustees

    function addTrustees(address [] memory trustee) public payable requireAdminOnly {

        trustees = trustee;

    }

}