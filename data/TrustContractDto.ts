export type TrustContractDto = {
    name: string,
    balance: bigint,
    trustor: string,
}

export class TrustContractDtoImpl implements TrustContractDto{
    public name: string;
    public balance: bigint;
    public trustor: string;

    public constructor(
        trustor: string,
        balance: bigint,
        name: string,
    ) {
        this.name = name;
        this.balance = balance;
        this.trustor = trustor;
    }
}

