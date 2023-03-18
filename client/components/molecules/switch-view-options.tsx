import React from 'react';
import { CompactList, TableList, Tiles } from '..';
import { useGuestContext } from '@/context/guest-context';

const SwitchViewOptions = (): JSX.Element => {
  const { localCollection, selectedOption } = useGuestContext();

  switch (selectedOption) {
    case 'List':
      return <TableList guestData={localCollection} />;

    case 'Tiles':
      return <Tiles guestData={localCollection} />;

    default:
      return <TableList guestData={localCollection} />;
  }
};

export default SwitchViewOptions;
