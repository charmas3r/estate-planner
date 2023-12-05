import {Footer} from "@/components/Footer";
import React, {useEffect, useState} from "react";
import {Web3} from "web3";
import {ContentTable} from "@/components/ContentTable";
import {CreateButton} from "@/components/CreateButton";
import {getTrusts} from "@/data/EstatePlanningFactoryApi";
import {getTrustDetails} from "@/data/EstatePlanningApi";
import {TrustContractDto, TrustContractDtoImpl} from "@/data/TrustContractDto";
import {useRouter} from "next/navigation";
import Link from "next/link";

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
        = useState<TrustContractDto>();
    const [error, setError] = useState<string>();
    const [isLoading, setLoading] = useState<boolean>();

    let accounts;
    let primary: PrimaryAccount = new class implements PrimaryAccount {
        account: string;
    };
    let factoryContractProps: FactoryContractProps = new class implements FactoryContractProps {
        contracts: TrustContractDto[];
    }

    const router = useRouter()

    function onSearchAction(searchAddress: string) {
        if (searchAddress.length > 0) {
            contracts.map((item) => {
                if (item.address == searchAddress) {
                    setSearchContract(item)
                }
            });
        } else {
            // @ts-ignore
            setSearchContract(null)
        }
    }

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                window.ethereum.enable()
                    .then(async () => {
                        setLoading(true)
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
                                const balance = web3.utils.fromWei(details[2], "ether")
                                let contractDto = new TrustContractDtoImpl(
                                    address,
                                    // trustor
                                    details[0],
                                    // trustees
                                    details[1],
                                    // balance
                                    balance,
                                    // name
                                    details[3],
                                    // active status
                                    details[4],
                                    details[5],
                                    details[6],
                                    false,
                                )
                                factoryContractProps.contracts.push(contractDto)
                                console.log(contractDto)
                            })
                        );

                        setContracts(factoryContractProps.contracts)
                        setLoading(false)

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
                        console.log("User denied account authorization")
                        // handle the case where the user denied the connection request
                    } else if (error.message === "MetaMask is not enabled") {
                        console.log("metamask not enabled")
                        setError("metamask not enabled")
                    } else {
                        // handle other errors
                        console.log("Some general error: " + error.message);
                    }
                    setError(error.message)
                }
                setLoading(false)
            }
        };
        fetchAccount()
            .catch(console.error);
    }, []);

    if (error != null) {
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
                                    <div className="col-span-3 mt-10">
                                        <div className="card glass bg-opacity-60 text-primary-content m-auto">
                                            <div className="card-body">
                                                <h1 className="mb-5 text-5xl font-bold card-title">MetaMask Required</h1>
                                                <h5 className="text-xl card-title">This application requires the MetaMask extension</h5>
                                                <div className="card-actions justify-end">
                                                    <Link href="https://metamask.io/download/">
                                                        <button className="btn btn-primary">Download Now</button>
                                                    </Link>
                                                </div>
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
    } else if (searchContract == null) {
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
                                    <div className="col-span-3 mt-10">
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
                                            <h2 className="mt-20 mb-2 text-4xl font-extrabold md:text-6xl">Contract
                                                found</h2>
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
                                                    <button className="btn btn-primary" onClick={() => router.push(`/details/${searchContract?.address}`)}>Go to details</button>
                                                    <button className="btn btn-warning" onClick={() => router.push(`/edit/${searchContract?.address}`)}>Edit this contract</button>
                                                </div>
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



