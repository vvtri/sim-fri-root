import {
  closeSnackbar,
  enqueueSnackbar,
  EnqueueSnackbar,
  SnackbarMessage,
} from 'notistack';

export const addSnackBar = (
  opts: Parameters<EnqueueSnackbar>[1] & { message: SnackbarMessage },
) => {
  const key: any = enqueueSnackbar({
    ...opts,
    SnackbarProps: { onClick: () => closeSnackbar(key) },
  });
};
