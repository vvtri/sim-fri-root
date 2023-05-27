import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogProps,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';

type CustomDialogProps = {
  title: string;
  onClose: () => void;
} & Pick<DialogProps, 'open' | 'sx' | 'children' | 'PaperProps'>;

export const CustomDialog = ({
  title,
  children,
  ...dialogProps
}: CustomDialogProps) => {
  return (
    <Dialog
        // PaperProps={{
        //   sx: {
        //     backgroundColor: 'darkAccent.main',
        //     color: 'white',
        //     width: '100%',
        //     maxWidth: '700px',
        //   },
        // }}
      {...dialogProps}
    >
      <Typography
        position="relative"
        align="center"
        fontSize="1.25rem"
        fontWeight="700"
        paddingY="14px"
      >
        {title}
        <IconButton
          color="primary"
          onClick={dialogProps.onClose}
          sx={{ position: 'absolute', right: '16px', top: '12px' }}
        >
          <CloseIcon />
        </IconButton>
      </Typography>

      <Divider />

      {children}
    </Dialog>
  );
};
