import React from 'react';

const Main = (props: any) => {
  return (
    <div
      className={`bg-[#212121] text-white h-screen px-6 lg:px-10 xl:px-20 flex flex-col gap-10 pt-32 ${props.class}`}
    >
      {props.children}
    </div>
  );
};

export default Main;
