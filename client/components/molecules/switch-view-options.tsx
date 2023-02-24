import React from 'react';
import { CompactList, TableList, Tiles } from '..';

const SwitchViewOptions = ({ op }: any): JSX.Element => {
  const [guestData, setGuestData] = React.useState([]);

  React.useEffect(() => {
    const guest_localCollection = window.localStorage.getItem('guestCollection');
    setGuestData(JSON.parse(`${guest_localCollection}`));
  }, []);

  console.log('guestData', guestData);
  switch (op) {
    case 'List':
      return <TableList guestData={guestData} />;

    case 'Compact List':
      return <CompactList />;

    case 'Tiles':
      return <Tiles guestData={guestData} />;

    default:
      return <TableList guestData={guestData} />;
  }
};

export default SwitchViewOptions;
