import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Select, MenuItem, Button, Grid, Typography, Box, FormControl, InputLabel } from '@mui/material';

const FormField = ({ name, control, label, rules, select, options, ...props }) => (
  <Controller
    name={name}
    control={control}
    defaultValue=""
    rules={rules}
    render={({ field, fieldState: { error } }) => {
      const selectId = `${name}-select`;
      const labelId = `${name}-label`;
      return select ? (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={labelId}>{label}</InputLabel>
          <Select
            {...field}
            labelId={labelId}
            id={selectId}
            label={label}
            {...props}
          >
            <MenuItem value="" disabled>Select One</MenuItem>
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <TextField
          {...field}
          label={label}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...props}
        />
      );
    }}
  />
);
