//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract EstatePlanningFactory {
    address admin; // only one admin
    EstatePlanning[] public deployedContracts;
    address[] users;

    function createTrustContract(
        string memory _trustName,
        address[] memory _users
    ) public {
        EstatePlanning newContract = new EstatePlanning(
            _trustName,
            msg.sender,
            _users
        );
        admin = msg.sender;
        deployedContracts.push(newContract);
    }

    function getDeployedTrustContract()
        public
        view
        returns (EstatePlanning[] memory)
    {
        return deployedContracts;
    }

    //getters and setters for admin

    function getAdmin() public view returns (address) {
        return admin;
    }

    function setAuthenticatedUsers(address[] memory _users) public {
        require(admin == msg.sender);
        users = _users;
    }
}

contract EstatePlanning {
    //the contracts block

    //The variables

    address admin; // only one admin
    address[] users;

    address public trustor;

    address[] trustees;

    mapping(address => uint256) public beneficiariesPercentage;
    address[] beneficiaries; //new change created the array of beneficiaries

    uint256 totalAmount;

    string trustName; //keyword

    bool activeStatus = true;

    bool isRevoked;

    mapping(address => bool) activeTrustor;

    uint256[] percentages;

    //the functions

    function setRevoked(bool _isRevoked) public requireTrustorOnly {
        isRevoked = _isRevoked;
    }

    //This is the new pay function
    function payoutTrust() public requireAdminTrustorOnly {
        require(isRevoked == true);
        uint256 arrayLength = beneficiaries.length;
        for (uint256 i = 0; i < arrayLength; i++) {
            // payout the contract to all beneficiaries...
            address payable payoutAddress = payable(beneficiaries[i]);
            // get the percentage assigned to this beneficiary
            uint256 percentage = beneficiariesPercentage[payoutAddress];
            // finish the payout ...
            payoutAddress.transfer(
                (address(this).balance * percentage) / 100.0
            );
        }
    }

    modifier requireAdminTrustorOnly() {
        require(msg.sender == admin || msg.sender == trustor); // admin and trustor both
        _;
    }

    //The constructor

    constructor(
        string memory _trustName,
        address _admin,
        address[] memory _users
    ) payable {
        admin = _admin;
        trustName = _trustName;
        users = _users;
    }

    function enter(
        address[] memory _beneficiaries,
        uint256[] memory _percentages,
        address[] memory _trustees
    ) public payable {
        trustor = msg.sender;
        totalAmount = msg.value; //trust amount
        beneficiaries = _beneficiaries;
        percentages = _percentages;
        trustees = _trustees;
    }

    //the destructor

    function deleteContract() private requireTrustorOnly {
        selfdestruct(payable(trustor)); //typecast to payable bcuz not supported after 0.8.0
        activeStatus = false; //The contract is no longer active
    }

    //getters and setters for trustor

    function setTrustor(address _trustor) public requireAdminOnly {
        trustor = _trustor;
    }

    function getTrustor()
        public
        view
        requireAdminTrustorOnly
        returns (address)
    {
        return trustor;
    }

    //getters for trustees

    function getTrustees()
        public
        view
        requireAdminTrustorOnly
        returns (address[] memory)
    {
        return trustees;
    }

    //getters and setters for beneficiaries

    function setBeneficiaries(address beneficiary, uint256 num)
        public
        requireTrustorOnly
    {
        beneficiariesPercentage[beneficiary] = num;
        beneficiaries.push(beneficiary);
        percentages.push(num);
    }

    function getBeneficiaries()
        public
        view
        requireAdminTrustorOnly
        returns (address[] memory)
    {
        return beneficiaries;
    }

    // temporary method to return some minimal trust details needed for displaying landing screen in app
    // TODO complete this method.
    // So far trustor, trustees, beneficiaries, totalAmount, trustName is added to be returned
    function getTrustDetails()
        public
        view
        requireAdminTrustorOnly
        returns (
            address,
            address[] memory,
            uint256,
            string memory,
            bool,
            address[] memory,
            uint256[] memory,
            bool
        )
    {
        return (
            trustor,
            trustees,
            totalAmount,
            trustName,
            activeStatus,
            beneficiaries,
            percentages,
            isRevoked
        );
    }

    //restricted modifiers for admin, address, amount, status not revoke

    modifier requireAdminOnly() {
        require(msg.sender == admin);

        _;
    }

    //set trustee active status(restricted, contracts is in revokeable state, is actually trustor)

    modifier requireTrustorOnly() {
        require(msg.sender == trustor);

        _;
    }
    modifier requireTrusteeTrustorOnly() {
        require(msg.sender == trustor);

        _;
    } //isTrusteeArray()

    modifier requireAuthenticatedUsers() {
        //require(msg.sender == trustor);

        _;
    }

    //adding trustees

    function setTrustees(address[] memory trustee)
        public
        payable
        requireTrustorOnly
    {
        trustees = trustee;
    }
}
