import web3 from "../../estate-planner/ethereum/web3";
import EstatePlanningFactory from "../../estate-planner/ethereum/build/EstatePlanningFactory.json";

const instance = new web3.eth.Contract(
    EstatePlanningFactory.abi,
    "0x1823eFe3C797Cf574D7B0E04260C69E0e6dDfb4E"
);

export default instance;
