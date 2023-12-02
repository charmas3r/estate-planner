
export type TrustContractDto = {
    address: string,
    name: string,
    balance: bigint,
    trustor: string,
}

export class TrustContractDtoImpl implements TrustContractDto{
    public address: string;
    public name: string;
    public balance: bigint;
    public trustor: string;

    public constructor(
        address: string,
        trustor: string,
        balance: bigint,
        name: string,
    ) {
        this.address = address
        this.name = name;
        this.balance = balance;
        this.trustor = trustor;
    }
}

