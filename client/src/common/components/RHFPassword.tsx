import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type RHFPasswordProps<T extends string> = {
  error: boolean;
  helperText?: string;
  register: UseFormRegisterReturn<T>;
  label?: string;
} & Parameters<typeof TextField>[0];

export const RHFPassword = <T extends string>({
  error,
  register,
  helperText,
  label = 'Mật khẩu',
}: RHFPasswordProps<T>) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <FormControl>
      <TextField
        type={isShowPassword ? 'text' : 'password'}
        variant="outlined"
        color="primary"
        label={label}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setIsShowPassword((state) => !state)}>
                {isShowPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={error}
        helperText={helperText}
        {...register}
      />
    </FormControl>
  );
};
