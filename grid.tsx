import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box, Typography, Grid } from "@mui/material";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useQuery } from "@tanstack/react-query";
import { format, subDays } from "date-fns";

const CompanyOvertimeSummary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDateRange = (date) => {
    const endDate = new Date(date);
    const startDate = subDays(endDate, 6);
    return {
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd')
    };
  };

  const { startDate, endDate } = getDateRange(selectedDate);

  const { data: overtimeSummaryData, isLoading } = useQuery({
    queryKey: ["CompanyOvertimeSummaryApi", startDate, endDate],
    queryFn: async () => {
      const response = await axios.get(`Perform/ot-summary`, {
        params: { startDate, endDate }
      });
      return response.data;
    }
  });

  const getCurrentlyShowingHours = () => {
    if (selectedDate) {
      const start = format(new Date(startDate), 'EEEE, MM/dd/yyyy');
      const end = format(new Date(endDate), 'EEEE, MM/dd/yyyy');
      return `${start} - ${end}`;
    }
    return "";
  };

  const columns = [
    {
      field: "employeeName",
      headerName: "Employee Name",
      flex: 1,
    },
    {
      field: "clientId",
      headerName: "# of Client IDs w/Hours",
      flex: 1,
    },
    {
      field: "totalScheduledHours",
      headerName: "Total Scheduled Hours",
      flex: 1,
    },
    {
      field: "totalOTEligibleHours",
      headerName: "Total OT Eligible Hours",
      flex: 1,
    },
    {
      field: "totalOT",
      headerName: "Total OT",
      flex: 1,
    },
  ];

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Company Overtime Summary
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom>
            View overtime hours summary for the week starting on
          </Typography>
          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            Currently showing hours for {getCurrentlyShowingHours()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            The following employees may be eligible for additional overtime
            based on the total hours they've worked in different client IDs.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <DataGridPremium
            rows={overtimeSummaryData || []}
            columns={columns}
            loading={isLoading}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "evenColumns" : "oddColumns"
            }
            getRowId={(row) => row.Uid}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyOvertimeSummary;
