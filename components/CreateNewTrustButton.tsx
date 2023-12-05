import React from 'react';

// Define the types for your component's props
interface CreateNewTrustButtonProps {
  onCreate: () => void; // Assuming onCreate is a function that returns nothing
}

const CreateNewTrustButton: React.FC<CreateNewTrustButtonProps> = ({ onCreate }) => {
  return (
    <div className="text-center my-4">
      <button 
        className="btn btn-primary"
        onClick={onCreate}
      >
        Create a new trust
      </button>
    </div>
  );
};

export default CreateNewTrustButton;
