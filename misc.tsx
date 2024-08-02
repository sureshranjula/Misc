sx={{
  '& .MuiDataGrid-row': {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  '& .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}}
