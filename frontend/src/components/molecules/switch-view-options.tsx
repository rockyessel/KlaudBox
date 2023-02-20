import React from 'react';
import { CompactList, TableList, Tiles } from '..';

const SwitchViewOptions = ({ viewOptions }: any): JSX.Element => {
  switch (viewOptions) {
    case 'List':
      return <TableList />;

    case 'Compact List':
      return <CompactList />;

    case 'Tiles':
      return <Tiles />;

    default:
        return <TableList />;
  }
};

export default SwitchViewOptions;
