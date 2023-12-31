import Image from "next/image";
import {useRouter} from 'next/navigation'
import {FactoryContractProps} from "@/pages";
import React from "react";
import {TrustContractDto} from "@/data/TrustContractDto";

export const ContentTable = ({contracts}: FactoryContractProps) => {
    const router = useRouter()

    function onDeactivateAction() {
        const element = window.document.getElementById('modal');
        if (element !== null) {
            // @ts-ignore
            element.showModal();
        }
    }

    function createActiveStatus(contract: TrustContractDto) {
        if (contract.activeStatus) {
            return (
                <span className="badge badge-success badge-sm">Active</span>
            )
        } else {
            return (
                <span className="badge badge-error badge-sm">Deactivated</span>
            )
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Trust name</th>
                    <th>Trust address</th>
                    <th>Trust balance</th>
                    <th>Active status</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {contracts.map((item) => {
                    return (
                        <tr key={item.name}>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div>
                                        <div className="font-bold">{item.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td> {item.address} </td>
                            <td> {item.balance}
                                <br/>
                                <span className="badge badge-ghost badge-sm">Eth</span>
                            </td>
                            <td>
                                {createActiveStatus(item)}
                            </td>
                            <th>
                                <button className="btn btn-ghost btn-xs rounded-xl"
                                        onClick={() => router.push(`/details/${item.address}`)}>details
                                </button>
                            </th>
                            <th>
                                <button className="btn btn-ghost btn-xs rounded-xl"
                                        onClick={() => router.push(`/edit/${item.address}`)}>edit
                                </button>
                            </th>
                            <th>
                                {item.activeStatus &&
                                    <button className="btn btn-ghost btn-circle" onClick={onDeactivateAction}>
                                        <Image src="/trash-icon.svg" height={24} width={24} alt={"trash"}/>
                                    </button>
                                }
                                <dialog id="modal" className="modal modal-bottom sm:modal-middle">
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg py-4 text-slate-700">Deactivate Contract!</h3>
                                        <p className="py-4 text-slate-700">Are you sure you want to deactivate this
                                            contract? This will permanently destory the contract and send the balance
                                            held back to the trust creator.</p>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                <button className="btn">Close</button>
                                                <button className="btn ml-5">OK</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </th>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}