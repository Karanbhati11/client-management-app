import React, { useState } from "react";
import ClientCard from "./ClientCard";
import dayjs from "dayjs";
import { Box, Button, Grid } from "@mui/material";

const ClientList = ({ clients, setClients }) => {
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedClients = [...clients].sort((a, b) =>
    sortOrder === "asc"
      ? dayjs(a.deadline).isAfter(dayjs(b.deadline))
        ? 1
        : -1
      : dayjs(a.deadline).isBefore(dayjs(b.deadline))
      ? 1
      : -1
  );

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const updateClient = (updatedClient) => {
    const updatedClients = clients.map((client) =>
      client.name === updatedClient.name ? updatedClient : client
    );
    setClients(updatedClients);
    localStorage.setItem("clients", JSON.stringify(updatedClients)); // Update localStorage
  };

  const deleteClient = (clientToDelete) => {
    const updatedClients = clients.filter(
      (client) => client !== clientToDelete
    );
    setClients(updatedClients);
    localStorage.setItem("clients", JSON.stringify(updatedClients)); // Update localStorage after deletion
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 3 }}>
      <Button
        variant="contained"
        onClick={toggleSortOrder}
        sx={{ marginBottom: 2 }}
      >
        Sort by Deadline: {sortOrder === "asc" ? "Ascending" : "Descending"}
      </Button>

      <Grid container spacing={3}>
        {sortedClients.map((client, index) => (
          <Grid
            item
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ClientCard
              client={client}
              updateClient={updateClient}
              deleteClient={deleteClient}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ClientList;
