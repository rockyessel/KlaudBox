import React from 'react';

const Main = (props: any) => {
  return (
    <div
      className={`bg-gray-50 text-black h-screen px-6 lg:px-10 xl:px-20 flex flex-col gap-10 pt-32 ${props.class}`}
    >
      {props.children}
    </div>
  );
};

export default Main;
