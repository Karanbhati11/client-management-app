import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ClientForm = ({ addClient }) => {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [course, setCourse] = useState("");
  const [money, setMoney] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [additionalFields, setAdditionalFields] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && deadline && course && money) {
      const newClient = {
        name,
        deadline,
        course,
        money,
        additionalFields,
      };
      addClient(newClient);
      setName("");
      setDeadline("");
      setCourse("");
      setMoney("");
      setAdditionalFields({});
    }
  };

  const handleAddField = () => {
    if (key.trim() && value.trim()) {
      setAdditionalFields({ ...additionalFields, [key]: value });
      setKey("");
      setValue("");
    }
  };

  return (
    <Accordion sx={{ marginBottom: 3, maxWidth: 600 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Add New Client</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Client Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Deadline"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <TextField
            label="Course"
            fullWidth
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
          <TextField
            label="Money"
            fullWidth
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            required
          />

          <Typography variant="subtitle1">
            Add Additional Field (Key-Value):
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              label="Field Key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <TextField
              label="Field Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button variant="outlined" onClick={handleAddField}>
              Add Field
            </Button>
          </Box>

          <Button type="submit" variant="contained" color="primary">
            Add Client
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ClientForm;
