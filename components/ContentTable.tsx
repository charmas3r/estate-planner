import Image from "next/image";
import {useRouter} from 'next/navigation'
import {ContractProps} from "@/pages";
import {TrustContractDto} from "@/data/TrustContractDto";

export const ContentTable = ({contracts}: ContractProps) => {
    const router = useRouter()

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Trust name</th>
                    <th>Trust creator</th>
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
                            <td> {item.trustor} </td>
                            <td> {item.balance.toString()}
                                <br/>
                                <span className="badge badge-ghost badge-sm">Eth</span>
                            </td>
                            <td><span className="badge badge-success badge-sm">Active</span></td>
                            <th>
                                <button className="btn btn-ghost btn-xs rounded-xl"
                                        onClick={() => router.push(`/details/0x1234}`)}>details
                                </button>
                            </th>
                            <th>
                                <button className="btn btn-ghost btn-xs rounded-xl">edit</button>
                            </th>
                            <th>
                                <button className="btn btn-ghost btn-circle">
                                    <Image src="/trash-icon.svg" height={24} width={24} alt={"trash"}/>
                                </button>
                            </th>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}