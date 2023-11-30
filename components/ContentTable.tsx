import Image from "next/image";
import { useRouter } from 'next/navigation'

export const ContentTable = () => {
    const router = useRouter()

    return(
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" className="checkbox" />
                        </label>
                    </th>
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

                {/* rows */}
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" className="checkbox" />
                        </label>
                    </th>
                    <td>
                        <div className="flex items-center gap-3">
                            <div>
                                <div className="font-bold">Evan&apos;s trust</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        0x78f6CA513132c3B6f6dCcA0e7A6C40B9d05F298a
                    </td>
                    <td>
                        10.512312
                        <br/>
                        <span className="badge badge-ghost badge-sm">Eth</span>
                    </td>
                    <td><span className="badge badge-success badge-sm">Active</span></td>
                    <th>
                        <button className="btn btn-ghost btn-xs rounded-xl" onClick={() => router.push(`/details/0x1234}`)}>details</button>
                    </th>
                    <th>
                        <button className="btn btn-ghost btn-xs rounded-xl" >edit</button>
                    </th>
                    <th>
                        <button className="btn btn-ghost btn-circle">
                            <Image src="/trash-icon.svg" height={24} width={24}  alt={"trash"}/>
                        </button>
                    </th>
                </tr>
                </tbody>
            </table>
        </div>
    )
}