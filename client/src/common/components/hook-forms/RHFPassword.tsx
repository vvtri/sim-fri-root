import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type RHFPasswordProps = {
  label?: string;
  name: string;
} & Parameters<typeof TextField>[0];

export const RHFPassword = ({
  label = 'Mật khẩu',
  name,
  ...other
}: RHFPasswordProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <TextField
          {...field}
          inputRef={ref}
          type={isShowPassword ? 'text' : 'password'}
          variant="outlined"
          color="primary"
          label={label}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setIsShowPassword((state) => !state)}
                >
                  {isShowPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={Boolean(error)}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
};
