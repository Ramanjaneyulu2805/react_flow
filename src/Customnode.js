import React, { useState } from 'react';

const CustomNode = ({ id, data, onDelete, onTitleChange }) => {
  const [title, setTitle] = useState(data.label);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSaveTitle = () => {
    onTitleChange(id, title);
  };

  return (
    <div className="custom-node">
      <div className="title">{data.label}</div>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        onBlur={handleSaveTitle}
      />
      <button className="delete-node" onClick={() => onDelete(id)}>X</button>
    </div>
  );
};

export default CustomNode;
