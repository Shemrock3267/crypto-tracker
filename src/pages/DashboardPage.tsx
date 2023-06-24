import React from 'react';

import Tracker from '../components/Tracker';
import Loader from '../components/Loader';
import { useGetAllCoinsQuery } from '../api/api';

const DashBoardPage = () => {
  const { data: allCoins } = useGetAllCoinsQuery();

  return <>{allCoins ? <Tracker coins={allCoins} /> : <Loader />}</>;
};

export default DashBoardPage;
