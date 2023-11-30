import {Footer} from "@/components/Footer";
import factory from "@/ethereum/factory";
import {ContentPageDto} from "@/data/ContentDto";
import {GetServerSideProps} from "next";
import {useEffect, useState} from "react";
import Web3 from "web3";
import {SearchBar} from "@/components/SearchBar";
import {ConnectButton} from "@/components/ConnectButton";
import {ContentTable} from "@/components/ContentTable";
import {MetaMaskInpageProvider} from "@metamask/providers";

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider
    }
}

interface PrimaryAccount {
    account: string;
}

export default function Home({content}: ContentPageDto) {
    const [account, setAccount]
        = useState<PrimaryAccount>({account: ''});
    let accounts;
    let userAddress;

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                window.ethereum.enable()
                    .then(async () => {
                        const web3 = new Web3(window.ethereum);
                        accounts = await web3.eth.getAccounts();
                        userAddress = accounts[0];
                        console.log(userAddress);
                        setAccount(userAddress);

                        window.ethereum.on("accountsChanged", async (accounts: any[]) => {
                            // handle account change
                            accounts = await web3.eth.getAccounts();
                            userAddress = accounts[0];
                            setAccount(userAddress);
                        });

                        window.ethereum.on("disconnect", () => {
                            // handle metamask logout
                            console.log("disconnect");
                            setAccount(null);
                        });
                    })
                    .then(
                        async () => {
                            // const campaigns = await factory.methods.getDeployedCampaigns().call();
                            // get campaigns
                        }
                    );
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
        // call the function
        fetchAccount()
            // make sure to catch any error
            .catch(console.error);
    }, []);

    async function handleClick() {
        // const campaigns = await factory.methods.getDeployedCampaigns().call();
        // console.log(campaigns)
    }

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
                                {/*<CreateButton/>*/}
                                <ConnectButton handleClick={handleClick}/>
                            </div>
                        </div>
                        <div className="hero-content text-center text-neutral-content mt-40">
                            <ContentTable/>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}


// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const campaigns = await factory.methods.getDeployedCampaigns().call();
//     return {
//         props: { campaigns },
//     }
// };


