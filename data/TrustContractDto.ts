
export type TrustContractDto = {
    address: string,
    name: string,
    balance: string,
    trustor: string,
    trustees: string[],
    beneficiaries: string[];
    percentages: number[];
    isRevoked: boolean,
    activeStatus: boolean,
}

export class TrustContractDtoImpl implements TrustContractDto{
    public address: string;
    public name: string;
    public balance: string;
    public trustor: string;
    public trustees: string[];
    public beneficiaries: string[];
    public percentages: number[];
    public isRevoked: boolean;
    public activeStatus: boolean;

    public constructor(
        address: string,
        trustor: string,
        trustees: string[],
        balance: string,
        name: string,
        activeStatus: boolean,
        beneficiaries: string[],
        percentages: number[],
        isRevoked: boolean,
    ) {
        this.address = address
        this.name = name;
        this.balance = balance;
        this.trustor = trustor;
        this.trustees = trustees;
        this.activeStatus = activeStatus;
        this.beneficiaries = beneficiaries;
        this.percentages = percentages;
        this.isRevoked = isRevoked;
    }
}

