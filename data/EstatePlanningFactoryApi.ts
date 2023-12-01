// @ts-ignore
import Web3 from "web3/lib/types";
import {factoryAbi, factoryAddress} from "@/ethereum/factory";


/**
 * Api library for [EstatePlanningFactory.sol]
 * @param web3
 */
export async function getTrusts<CustomRegisteredSubscription>(
    web3: Web3<CustomRegisteredSubscription> | Web3) {
    return await new web3.eth.Contract(
        factoryAbi,
        factoryAddress,
    ).methods.getDeployedCampaigns().call();
}
