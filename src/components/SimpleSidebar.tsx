import React, { ReactNode } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  IconButton,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { FiDollarSign, FiMenu } from 'react-icons/fi';
import { BsGraphUp } from 'react-icons/bs';
import { RiFireFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import {
  LinkItemProps,
  NavItemProps,
  SidebarProps,
  MobileProps,
} from '../types/sidebar';
import { $l } from '../utils/getLocale';
import { themeColors, hoverBtnColor } from '../constants/styles';

const LinkItems: Array<LinkItemProps> = [
  { name: $l('APP_SIDEBAR_NAV_DASHBOARD'), icon: BsGraphUp, to: '/' },
  { name: $l('APP_SIDEBAR_NAV_WALLET'), icon: FiDollarSign, to: '/wallet' },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      height='100%'
      minHeight='100vh'
      bg={useColorModeValue(
        themeColors['CONTENT_BACKGROUND_COLOR'],
        'gray.900'
      )}
    >
      <SidebarContent
        display={{ base: 'none', md: 'block' }}
        onClose={onClose}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p='4'>
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue(themeColors['SECONDARY_COLOR'], 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      padding={'.5em'}
      {...rest}
    >
      <Stack spacing={2} align='flex-start' margin='0 32px'>
        <Flex h='20' alignItems='center' justifyContent='space-between'>
          <Icon
            as={RiFireFill}
            marginRight='.25em'
            fontWeight='bold'
            color={themeColors['MAIN_COLOR']}
            fontSize='xl'
          />
          <Text
            fontSize='2xl'
            fontWeight='bold'
            color={themeColors['MAIN_COLOR']}
            display='flex'
            letterSpacing='tight'
          >
            {$l('APP_SIDEBAR_TITLE')}
          </Text>
          <CloseButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
          />
        </Flex>
      </Stack>
      {LinkItems.map((link) => (
        <Link to={link.to} key={link.name}>
          <NavItem icon={link.icon}>{link.name}</NavItem>
        </Link>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Flex
      align='center'
      p='4'
      mx='4'
      borderRadius='lg'
      role='group'
      cursor='pointer'
      fontWeight='700'
      _hover={hoverBtnColor}
      {...rest}
    >
      {icon && (
        <Icon
          mr='4'
          fontSize='16'
          _groupHover={{
            color: themeColors['SECONDARY_COLOR'],
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue(themeColors['SECONDARY_COLOR'], 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent='flex-start'
      {...rest}
    >
      <IconButton
        variant='outline'
        onClick={onOpen}
        aria-label='open menu'
        icon={<FiMenu />}
      />
      <Text
        fontSize='2xl'
        ml='8'
        fontWeight='bold'
        color={themeColors['MAIN_COLOR']}
      >
        <Icon as={RiFireFill} marginRight='.25em' />
        {$l('APP_SIDEBAR_TITLE')}
      </Text>
    </Flex>
  );
};
