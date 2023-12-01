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

    address public admin;// only one admin

    address public trustor;

    address[] trustees;

    mapping(address => uint) public beneficiaries;


    uint totalAmount;

    string trustName;//keyword

    bool isRevoked;


    mapping(address => bool) activeTrustor;

    mapping(address => uint) trustes;

    //the functions
    //The constructor

    constructor(string memory _trustName) payable {
        trustor = msg.sender;
        trustName = _trustName;
    }

    //the destructor

    function deleteContract() public {
        selfdestruct(payable(trustor));//typecast to payable bcuz not supported after 0.8.0
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

        beneficiaries[beneficiary] = num;

    }

    function getBeneficiaries(address beneficiary) public view returns (uint) {

        return beneficiaries[beneficiary];

    }

    // temporary method to return some minimal trust details needed for displaying landing screen in app
    // TODO complete this method.
    function getTrustDetails() public view returns (
        address,
        uint256,
        string memory
    ){
        return (
            trustor,
            totalAmount,
            trustName
        );
    }

    //restricted modifiers for admin, address, amount, status not revoke

    modifier restricted1() {

        require(msg.sender == admin);

        //require(address(this).balance >=);

        //require(isRevoked == false);

        _;

    }

    //set trustee active status(restricted, contracts is in revokeable state, is actually trustor)

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

    function addTrustees(address [] memory trustee) public restricted2 {

        trustees = trustee;

    }

}
