// @ts-ignore
import Web3 from "web3/lib/types";
import {contractAbi} from "@/ethereum/contract";

/**
 * Api library for [EstatePlanningFactory.sol]
 * @param web3
 * @param address address of contract
 */
export async function getTrustDetails<CustomRegisteredSubscription>(
    address: any,
    web3: Web3<CustomRegisteredSubscription> | Web3,

) {
    return await new web3.eth.Contract(
        contractAbi,
        address,
    ).methods.getTrustDetails().call();
}