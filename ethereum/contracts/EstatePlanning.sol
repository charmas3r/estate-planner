//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EstatePlanningFactory {
    address admin;
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

    function getAdmin() public view returns (address) {
        return admin;
    }

    function setAuthenticatedUsers(address[] memory _users) public {
        require(admin == msg.sender);
        users = _users;
    }
}

contract EstatePlanning {
    //The variables

    address admin;
    address[] users;
    address public trustor;
    address[] trustees;
    mapping(address => uint256) public beneficiariesPercentage;
    address[] beneficiaries;
    uint256 totalAmount;
    string trustName;
    bool activeStatus = true;
    bool isRevoked;
    uint256[] percentages;

    //the functions

    constructor(
        string memory _trustName,
        address _admin,
        address[] memory _users
    ) payable {
        admin = _admin;
        trustName = _trustName;
        users = _users;
    }

    function setTrustor(address _trustor) public payable requireAdminOnly {
        trustor = _trustor;
    }

    function setTrustees(address[] memory trustee)
        public
        payable
        requireTrustorOnly
    {
        trustees = trustee;
    }

    function setBeneficiaries(address beneficiary, uint256 num)
        public
        requireTrustorOnly
    {
        beneficiariesPercentage[beneficiary] = num;
        beneficiaries.push(beneficiary);
        percentages.push(num);
    }

    function setRevoked(bool _isRevoked) public requireTrustorOnly {
        isRevoked = _isRevoked;
    }

    function getTrustor()
        public
        view
        requireAdminTrustorOnly
        returns (address)
    {
        return trustor;
    }

    function getTrustees()
        public
        view
        requireAdminTrustorOnly
        returns (address[] memory)
    {
        return trustees;
    }

    function getBeneficiaries()
        public
        view
        requireAdminTrustorOnly
        returns (address[] memory)
    {
        return beneficiaries;
    }

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

    function enter(
        address[] memory _beneficiaries,
        uint256[] memory _percentages,
        address[] memory _trustees
    ) public payable requireAuthenticatedUsers {
        trustor = msg.sender;
        totalAmount = msg.value;
        beneficiaries = _beneficiaries;
        percentages = _percentages;
        trustees = _trustees;
    }

    function deleteContract() public requireTrustorOnly {
        selfdestruct(payable(trustor));
        activeStatus = false;
    }

    function getTrustDetails()
        public
        view
        requireAuthenticatedUsers
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

    modifier requireAdminOnly() {
        require(msg.sender == admin);

        _;
    }

    modifier requireTrustorOnly() {
        require(msg.sender == trustor);

        _;
    }

    modifier requireAdminTrustorOnly() {
        require(msg.sender == admin || msg.sender == trustor); // admin and trustor both
        _;
    }

    modifier requireTrusteeTrustorOnly() {
        for (uint256 i = 0; i < trustees.length; i++) {
            require((msg.sender == trustees[i]) || msg.sender == trustor);
        }

        _;
    }

    modifier requireAuthenticatedUsers() {
        for (uint256 i = 0; i < users.length; i++) {
            require((msg.sender == users[i]) || msg.sender == trustor);
        }

        _;
    }
}
