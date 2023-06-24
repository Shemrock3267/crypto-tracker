import React from 'react';
import { Spinner, Box } from '@chakra-ui/react';

import { themeColors } from '../constants/styles';

const Loader = () => (
  <Box
    position='fixed'
    top='50%'
    left='50%'
    transform='translate(-50%, -50%)'
    color={themeColors['MAIN_COLOR']}
  >
    <Spinner size='xl' />
  </Box>
);

export default Loader;
