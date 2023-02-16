import React from 'react';

const TypeSwitcher = () => {
  const mime_type = 'image' || 'video' || 'audio' || 'pdf';

  switch (mime_type) {
    case 'image':
      return <h1>Image</h1>;

    case 'video':
      return <h1>Video</h1>;

    case 'audio':
      return <h1>Audio</h1>;

    case 'pdf':
      return <h1>PDF</h1>;

    default:
      return <h1>Default</h1>;
  }
};

export default TypeSwitcher;
