import Box from '@mui/material/Box';
import { PropsWithChildren } from '../types/util.type';

type MainLayoutProps = PropsWithChildren;

export default function MainLayout({ children }: MainLayoutProps) {
  return <Box>{children}</Box>;
}
