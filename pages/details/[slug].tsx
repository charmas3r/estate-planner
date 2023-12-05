import React, {useEffect, useState} from "react";
import {Footer} from "@/components/Footer";
import {TrustContractDto, TrustContractDtoImpl} from "@/data/TrustContractDto";
import {Web3} from "web3";
import {PrimaryAccount} from "@/pages";
import {useRouter} from "next/router";
import {getTrustDetails} from "@/data/EstatePlanningApi";

export interface ContractProps {
    contract: TrustContractDto
}

const DetailsPage = () => {
    const message: string = '';
    const [account, setAccount]
        = useState<PrimaryAccount>({account: ''});
    const [contract, setContract]
        = useState<TrustContractDto>();
    const [error, setError] = useState<string>()

    let accounts;
    let primary: PrimaryAccount = new class implements PrimaryAccount {
        account: string;
    };


    const router = useRouter()
    const {slug} = router.query

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                window.ethereum.enable()
                    .then(async () => {
                        const web3 = new Web3(window.ethereum);
                        accounts = await web3.eth.getAccounts();
                        primary.account = accounts[0];
                        setAccount(primary);

                        if (slug !== undefined) {
                            try {
                                const details = await getTrustDetails(slug, web3);
                                if (typeof slug === "string") {
                                    const details = await getTrustDetails(slug, web3);
                                    const balance = web3.utils.fromWei(details[2], "ether")
                                    let contractDto = new TrustContractDtoImpl(
                                        slug,
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
                                    console.log(contractDto)
                                    setContract(contractDto)
                                }
                            } catch (e) {
                                setError("Unable to load contract at this address!")
                            }
                        }

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
    }, [
        slug
    ]);

    if (error && error.length > 0) {
        return (
            <div className="bg-base-100">
                <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{error}</span>
                </div>
            </div>
        )
    } else {
        return (
            <div className="bg-base-100">
                <main>
                    <div
                        className="hero from-primary to-accent text-primary-content min-h-screen bg-gradient-to-br py-10 lg:py-20 ">
                        <div className="hero-content flex-col lg:flex-row my-10 lg:my-20">
                            <div>
                                <div>
                                    <h2 className="mt-4 mb-2 text-4xl font-extrabold md:text-6xl">See your trust
                                        details</h2>
                                </div>
                                <div className="py-6">You can see all the details of your trust here.</div>
                                <div className="card glass bg-opacity-60 text-primary-content m-auto">
                                    <div className="card-body">
                                        {/*<div className="card-actions justify-start">*/}
                                        {/*    <button className="btn btn-circle btn-success">*/}
                                        {/*        <p className="text-xs text-white">ACTIVE</p>*/}
                                        {/*    </button>*/}
                                        {/*</div>*/}
                                        <h1 className="mb-5 text-5xl font-bold card-title">{contract?.name}</h1>
                                        <div className="lg:tooltip tooltip-info"
                                             data-tip="This means the contract has been set to a irrevokable status and is payable by either the trust creator or the admin.">
                                            <h5 className="text-xl card-title">Revokable status:</h5>
                                        </div>
                                        <ul className="list-none">
                                            <li>Is revoked: {contract?.isRevoked.toString()}</li>
                                        </ul>
                                        <br/>
                                        <div className="lg:tooltip tooltip-info"
                                             data-tip="This is the address of the contract.">
                                            <h5 className="text-xl card-title">Contract address:</h5>
                                        </div>
                                        <ul className="list-none">
                                            <li>{contract?.address}</li>
                                        </ul>
                                        <br/>
                                        <div className="lg:tooltip tooltip-info"
                                             data-tip="This is the address of the account which created the trust. This is called the trustor">
                                            <h5 className="text-xl card-title">Trust Creator address:</h5>
                                        </div>
                                        <ul className="list-none">
                                            <li>{contract?.trustor}</li>
                                        </ul>
                                        <br/>
                                        <div className="lg:tooltip tooltip-info"
                                             data-tip="This is the total balance held in this trust.">
                                            <h5 className="text-xl card-title">Current balance in trust:</h5>
                                        </div>
                                        <ul className="list-none">
                                            <li>{contract?.balance} Eth</li>
                                        </ul>
                                        <br/>
                                        <div className="lg:tooltip tooltip-info"
                                             data-tip="These are the beneficiaries addresses and what percentage of the total balance they will earn.">
                                            <h5 className="text-xl card-title">Beneficiaries:</h5>
                                        </div>
                                        <ul className="list-none">
                                            {
                                                contract?.beneficiaries.map((item, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <li>{item} : {contract?.percentages[index].toString()}%</li>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </ul>
                                        <br/>
                                        <div className="lg:tooltip tooltip-info"
                                             data-tip="These are the trustees addresses. They are resposible for revoking the trust.">
                                            <h5 className="text-xl card-title">Trustees:</h5>
                                        </div>
                                        <ul className="list-none">
                                            {contract?.trustees.map((address) => {
                                                return (<li key={address}>{address}</li>)
                                            })}
                                        </ul>
                                        <br/>
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-primary" onClick={
                                                () => router.push(`/edit/${contract?.address}`)
                                            }>edit</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        );
    }
};

export default DetailsPage;