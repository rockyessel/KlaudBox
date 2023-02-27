import React from 'react';
import { CompactList, TableList, Tiles } from '..';
import { useGuestContext } from '@/context/GuestContext';

const SwitchViewOptions = ({ op }: any): JSX.Element => {
  const { localCollection } = useGuestContext();

  switch (op) {
    case 'List':
      return <TableList guestData={localCollection} />;

    case 'Compact List':
      return <CompactList />;

    case 'Tiles':
      return <Tiles guestData={localCollection} />;

    default:
      return <TableList guestData={localCollection} />;
  }
};

export default SwitchViewOptions;
