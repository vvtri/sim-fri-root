import { Box } from '@mui/material';
import { Header } from '../components/Header';
import { PropsWithChildren } from '../types/util.type';

type MainLayoutProps = PropsWithChildren;

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box width="100%" height="1000px" bgcolor="black" color="white">
      <Header />
      {children}
    </Box>
  );
}
