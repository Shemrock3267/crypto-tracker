import { FlexProps, BoxProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type SidebarRoutes = '/' | '/wallet';

export interface LinkItemProps {
  name: string;
  icon: IconType;
  to: SidebarRoutes;
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string | number;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export interface MobileProps extends FlexProps {
  onOpen: () => void;
}