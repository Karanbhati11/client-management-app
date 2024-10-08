import React, { useState, useEffect } from "react";
import ClientForm from "./Components/ClientForm";
import ClientList from "./Components/ClientList";
import { Container, Typography, Box } from "@mui/material";

const App = () => {
  const [clients, setClients] = useState([]);

  // Load data from localStorage when the app loads
  useEffect(() => {
    const storedClients = localStorage.getItem("clients");
    if (storedClients) {
      // Ensure correct parsing of stored data
      setClients(JSON.parse(storedClients));
    }
  }, []);

  // Save clients data to localStorage whenever it changes
  useEffect(() => {
    if (clients.length > 0) {
      localStorage.setItem("clients", JSON.stringify(clients));
    }
  }, [clients]);

  const addClient = (client) => {
    setClients([...clients, client]);
  };

  return (
    <Container>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ textAlign: "center", marginTop: 3 }}
      >
        Client Management App
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <ClientForm addClient={addClient} />
        <ClientList clients={clients} setClients={setClients} />
      </Box>
    </Container>
  );
};

export default App;
