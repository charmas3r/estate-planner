import React from 'react';

interface Beneficiary {
  name: string;
  amount: string;
}

interface BeneficiaryListProps {
  beneficiaries: Beneficiary[];
}

const BeneficiaryList: React.FC<BeneficiaryListProps> = ({ beneficiaries }) => {
  return (
    <ul>
      {beneficiaries.map((beneficiary, index) => (
        <li key={index} className="my-2">
          {beneficiary.name} - {beneficiary.amount}
        </li>
      ))}
    </ul>
  );
};

export default BeneficiaryList;
