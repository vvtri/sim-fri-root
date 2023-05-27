import { TextField } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import { Controller, useFormContext } from 'react-hook-form';

type DateFieldProps = {
  name: string;
  label?: string;
  textFieldProps?: Parameters<typeof TextField>[0];
};
export default function RHFDateField({
  name,
  label,
  textFieldProps,
}: DateFieldProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DateField
          label={label}
          value={value}
          format="DD/MM/YYYY"
          onChange={(event) => {
            onChange(event);
          }}
          slotProps={{ textField: textFieldProps }}
          slots={
            <TextField
              {...textFieldProps}
              error={!!error}
              helperText={error?.message}
            />
          }
        />
      )}
    />
  );
}
