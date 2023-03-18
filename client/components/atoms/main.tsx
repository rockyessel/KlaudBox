import React from 'react';

const Main = (props: any) => {
  return (
    <div
      className={`bg-gray-50 text-black h-screen px-6 lg:px-10 xl:px-20 flex flex-col gap-5 pt-10 pb-20 ${props.class} overflow-y-scroll`}
    >
      {props.children}
    </div>
  );
};

export default Main;
