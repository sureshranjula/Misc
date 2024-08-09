import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder="Search EE#, Name or Payment Status"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
      sx={{
        maxWidth: '300px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '4px',
        },
      }}
    />
  );
};

export default SearchBar;
