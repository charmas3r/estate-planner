import {Footer} from "@/components/Footer";
import React, {useEffect, useState} from "react";
import {Web3} from "web3";
import {ContentTable} from "@/components/ContentTable";
import {CreateButton} from "@/components/CreateButton";
import {getTrusts} from "@/data/EstatePlanningFactoryApi";
import {getTrustDetails} from "@/data/EstatePlanningApi";
import {TrustContractDto, TrustContractDtoImpl} from "@/data/TrustContractDto";

export interface PrimaryAccount {
    account: string;
}

export interface FactoryContractProps {
    contracts: TrustContractDto[]
}

export default function Home() {
    const [account, setAccount]
        = useState<PrimaryAccount>({account: ''});
    const [contracts, setContracts]
        = useState<TrustContractDto[]>([]);
    const [searchContract, setSearchContract]
        = useState<TrustContractDto>()

    let accounts;
    let primary: PrimaryAccount = new class implements PrimaryAccount {
        account: string;
    };
    let factoryContractProps: FactoryContractProps = new class implements FactoryContractProps {
        contracts: TrustContractDto[];
    }

    function onSearchAction(searchAddress: string) {
        if (searchAddress.length > 0) {
            contracts.map((item) => {
                if (item.address == searchAddress) {
                    setSearchContract(item)
                }
            });
        } else {
            setSearchContract(null)
        }
    }

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                window.ethereum.enable()
                    .then(async () => {
                        const web3 = new Web3(window.ethereum);
                        accounts = await web3.eth.getAccounts();
                        primary.account = accounts[0];
                        setAccount(primary);
                        console.log("Primary account on MetaMask: " + primary.account);
                        const trusts = await getTrusts(web3);
                        factoryContractProps.contracts = new Array<TrustContractDto>()

                        await Promise.all(
                            trusts.map(async (address: string) => {
                                const details = await getTrustDetails(address, web3);
                                let contractDto = new TrustContractDtoImpl(
                                    address,
                                    details[0],
                                    details[1],
                                    details[2]
                                )
                                factoryContractProps.contracts.push(contractDto)
                                console.log(contractDto)
                            })
                        );

                        setContracts(factoryContractProps.contracts)

                        window.ethereum.on("accountsChanged", async (accounts: any[]) => {
                            // handle account change
                            accounts = await web3.eth.getAccounts();
                            primary.account = accounts[0];
                            console.log("Switched account, new primary account on MetaMask: " + primary.account);
                            setAccount(primary);
                        });

                        window.ethereum.on("disconnect", () => {
                            // handle metamask logout
                            console.log("disconnected from MetaMask");
                            // @ts-ignore
                            setAccount(null);
                        });
                    })
            } catch (error) {
                if (error instanceof Error) {
                    if (error.message === "User denied account authorization") {
                        // handle the case where the user denied the connection request
                    } else if (error.message === "MetaMask is not enabled") {
                        // handle the case where MetaMask is not available
                    } else {
                        // handle other errors
                    }
                }
            }
        };
        fetchAccount()
            .catch(console.error);
    }, []);

    if (searchContract == null) {
        return (
            <div className="bg-base-100">
                <main>
                    <div
                        className="from-base-100 to-secondary text-primary-content -mt-[4rem] grid place-items-center items-end bg-gradient-to-br pt-16">
                        <div className="hero mx-4 h-full w-full bg-fixed min-h-screen">
                            <div className="hero-overlay bg-opacity-20">
                                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font text-center mt-5 lg:mt-20 mr-5 ml-5">Estate
                                    Planning dApp</h1>
                            </div>
                            <div className="hero-content text-center text-neutral-content mt-40">
                                <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3">
                                    <div className="col-span-2">
                                        <div className="form-control">
                                            <div className="input-group">
                                                <input type="search"
                                                       placeholder="Search for trust address"
                                                       className="input text-slate-400 w-full max-w-md rounded-2xl"
                                                       onChange={(e) => {
                                                           onSearchAction(e.target.value);
                                                       }}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <CreateButton/>
                                    </div>
                                    <div className="col-span-3">
                                        <ContentTable contracts={contracts}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        )
    } else {
        return (
        <div className="bg-base-100">
            <main>
                <div
                    className="from-base-100 to-secondary text-primary-content -mt-[4rem] grid place-items-center items-end bg-gradient-to-br pt-16">
                    <div className="hero mx-4 h-full w-full bg-fixed min-h-screen">
                        <div className="hero-overlay bg-opacity-20">
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font text-center mt-5 lg:mt-20 mr-5 ml-5">Estate
                                Planning dApp</h1>
                        </div>
                        <div className="hero-content text-center text-neutral-content mt-40">

                            <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-1">
                                <div className="col-span-2">
                                    <div className="form-control">
                                        <div className="input-group">
                                            <input type="search"
                                                   placeholder="Search for trust address"
                                                   className="input text-slate-400 w-full max-w-md rounded-2xl"
                                                   onChange={(e) => {
                                                       onSearchAction(e.target.value);
                                                   }}/>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <CreateButton/>
                                </div>
                                <div className="col-span-3">
                                    <div>
                                        <h2 className="mt-20 mb-2 text-4xl font-extrabold md:text-6xl">Contract found</h2>
                                        <br/>
                                    </div>
                                    <div className="card glass bg-opacity-60 text-primary-content m-auto">
                                        <div className="card-body">
                                            <h1 className="mb-5 text-5xl font-bold card-title">{searchContract?.name}</h1>
                                            <h5 className="text-xl card-title">Contract address:</h5>
                                            <ul className="list-none">
                                                <li>{searchContract?.address}</li>
                                            </ul>
                                            <br/>
                                            <div className="card-actions justify-end">
                                                <button className="btn btn-primary">Go to details</button>
                                                <button className="btn btn-warning">Edit this contract</button>                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
        )
    }
}



