import {Footer} from "@/components/Footer";
import {useEffect, useState} from "react";
import {Web3} from "web3";
import {SearchBar} from "@/components/SearchBar";
import {ContentTable} from "@/components/ContentTable";
import {CreateButton} from "@/components/CreateButton";
import {getTrusts} from "@/data/EstatePlanningFactoryApi";
import {getTrustDetails} from "@/data/EstatePlanningApi";
import {TrustContractDto, TrustContractDtoImpl} from "@/data/TrustContractDto";

interface PrimaryAccount {
    account: string;
}

export interface ContractProps {
    contracts: TrustContractDto[]
}

export default function Home() {
    const [account, setAccount]
        = useState<PrimaryAccount>({account: ''});
    const [contracts, setContracts]
        = useState<TrustContractDto[]>([]);

    let accounts;
    let primary: PrimaryAccount = new class implements PrimaryAccount {
        account: string;
    };

    let contractProps: ContractProps = new class implements ContractProps {
        contracts: TrustContractDto[];
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
                        contractProps.contracts = new Array<TrustContractDto>()

                        await Promise.all(
                            trusts.map(async (address: string) => {
                                const details = await getTrustDetails(address, web3);
                                let contractDto = new TrustContractDtoImpl(
                                    details[0],
                                    details[1],
                                    details[2]
                                )
                                contractProps.contracts.push(contractDto)
                                console.log(contractDto)
                            })
                        );

                        setContracts(contractProps.contracts)

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

    return (
        <div className="bg-base-100">
            <main>
                <div
                    className="from-base-100 to-secondary text-primary-content -mt-[4rem] grid place-items-center items-end bg-gradient-to-br pt-16">
                    <div className="hero mx-4 h-full w-full bg-fixed min-h-screen">
                        <div className="hero-overlay bg-opacity-20">
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font text-center mt-5 lg:mt-20 mr-5 ml-5">Estate
                                Planning dApp</h1>
                            <div className="flex flex-col w-full gap-10 lg:gap-40 lg:flex-row mt-20 ml-20">
                                <SearchBar/>
                                <CreateButton/>
                            </div>
                        </div>
                        <div className="hero-content text-center text-neutral-content mt-40">
                            <ContentTable contracts={contracts}/>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}



