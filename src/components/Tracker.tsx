import React from 'react';
import {
  Card,
  CardBody,
  Stack,
  Text,
  Flex,
  Image,
  Icon,
} from '@chakra-ui/react';
import { BsHeartFill, BsHeart } from 'react-icons/bs';

import { useSelector, useDispatch } from '../store';
import { TableComponentProps } from '../types/table';
import { getSmallImg } from '../utils/getImage';
import { getPerfomanceColor } from '../utils/getPerfomanceColor';
import { setFavorite } from '../slices/appSlice';
import { IconType } from 'react-icons';

const TableComponent = ({ coins }: TableComponentProps) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.app);

  const toggleFavorite = (id: string): void => {
    dispatch(setFavorite(id));
  };

  const getIcon = (id: string): IconType => {
    if (favorites.includes(id)) return BsHeartFill;
    return BsHeart;
  };

  return (
    <Stack spacing='4'>
      {coins &&
        coins.map((coin) => {
          const coinImage = getSmallImg(coin?.image);
          const perfomanceColor = getPerfomanceColor(
            coin?.price_change_percentage_24h
          );
          return (
            <Card key={coin?.id} variant='elevated'>
              <CardBody>
                <Flex
                  direction='row'
                  align='center'
                  justifyContent='space-evenly'
                >
                  <Flex flex='1' minWidth='20%' align='center'>
                    <Image src={coinImage} alt={coin?.symbol} />
                  </Flex>
                  <Flex flex='1' minWidth='20%'>
                    <Text fontWeight='bold'>{coin?.name}</Text>
                  </Flex>
                  <Flex flex='1' minWidth='20%'>
                    <Text>${coin?.current_price.toFixed(2)}</Text>
                  </Flex>
                  <Flex flex='1' minWidth='20%'>
                    <Text style={{ color: perfomanceColor }}>
                      {coin?.price_change_percentage_24h.toFixed(2)}%
                    </Text>
                  </Flex>
                  <Icon
                    mr='4'
                    fontSize='16'
                    as={getIcon(coin.id)}
                    aria-label='favorite button'
                    color='red'
                    transition='all 0.3s'
                    onClick={() => toggleFavorite(coin.id)}
                    cursor='pointer'
                  />
                </Flex>
              </CardBody>
            </Card>
          );
        })}
    </Stack>
  );
};

export default TableComponent;
