const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const compiledFactory = require("./build/EstatePlanningFactory.json");

const provider = new HDWalletProvider(
    'episode split then armed submit slight noble crucial mail exclude render ski',
    // remember to change this to your own phrase!
    'https://sepolia.infura.io/v3/9474ded795b6444890ebe0a3a1879b56'
    // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({data: "0x" + compiledFactory.evm.bytecode.object})
        .send({from: accounts[0], gas: "5000000"});

    console.log('Contract deployed to', factory.options.address);
    provider.engine.stop();
};

deploy();
