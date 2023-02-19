import React from 'react';
import { TableList, Tiles } from '..';

const SwitchViewOptions = ({ viewOptions }: any): JSX.Element => {
  switch (viewOptions) {
    case 'List':
      return <TableList />;

    case 'Compact List':
      return <h1>hello</h1>;

    case 'Tiles':
      return <Tiles />;

    default:
      return <h1>hello</h1>;
  }
};

export default SwitchViewOptions;
