import React from 'react';

interface TrustCardProps {
  title: string;
  imageUrl: string;
  onSeeMore: () => void;
}

const TrustCard: React.FC<TrustCardProps> = ({ title, imageUrl, onSeeMore }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure><img src={imageUrl} alt="Trust" /></figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions justify-end">
          <button 
            className="btn btn-primary"
            onClick={onSeeMore}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrustCard;
