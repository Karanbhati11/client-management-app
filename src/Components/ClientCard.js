import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import dayjs from "dayjs";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

const ClientCard = ({ client, updateClient, deleteClient }) => {
  const [open, setOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false); // For view-only mode
  const [editedClient, setEditedClient] = useState(client);

  const handleOpenEdit = () => {
    setIsViewMode(false);
    setEditedClient(client);
    setOpen(true);
  };

  const handleOpenView = () => {
    setIsViewMode(true);
    setEditedClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    updateClient(editedClient);
    setOpen(false);
  };

  const handleFieldChange = (key, value) => {
    setEditedClient({
      ...editedClient,
      [key]: value,
    });
  };

  return (
    <>
      {/* Clickable card */}
      <Card sx={{ marginBottom: 2, mx: "auto" }} style={{ width: "450px" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom textAlign="center">
            {truncateText(client.name, 15)}
          </Typography>

          <Typography variant="body1" textAlign="center">
            Course: {truncateText(client.course, 15)}
          </Typography>

          <Typography variant="body1" textAlign="center">
            Money: {client.money}
          </Typography>

          {/* Date format with slashes */}
          <Typography variant="body1" textAlign="center">
            Deadline: {dayjs(client.deadline).format("DD/MM/YY")}
          </Typography>

          {client.additionalFields && (
            <Box sx={{ marginTop: 2 }}>
              {Object.entries(client.additionalFields).map(([key, value]) => (
                <Typography key={key} variant="body2" textAlign="center">
                  {truncateText(`${key}: ${value}`, 30)}
                </Typography>
              ))}
            </Box>
          )}

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => deleteClient(client)}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Delete
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenEdit}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="info"
            onClick={handleOpenView}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            View
          </Button>
        </CardContent>
      </Card>

      {/* Dialog for editing/viewing the client */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{isViewMode ? "View Client" : "Edit Client"}</DialogTitle>
        <DialogContent>
          {/* In view mode, show static fields */}
          {isViewMode ? (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Name:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1">{client.name}</Typography>
                  <IconButton
                    onClick={() => copyToClipboard(client.name)}
                    sx={{ marginLeft: 1 }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Course:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1">{client.course}</Typography>
                  <IconButton
                    onClick={() => copyToClipboard(client.course)}
                    sx={{ marginLeft: 1 }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Money:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1">{client.money}</Typography>
                  <IconButton
                    onClick={() => copyToClipboard(client.money)}
                    sx={{ marginLeft: 1 }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Deadline:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1">
                    {dayjs(client.deadline).format("DD/MM/YY")}
                  </Typography>
                  <IconButton
                    onClick={() =>
                      copyToClipboard(dayjs(client.deadline).format("DD/MM/YY"))
                    }
                    sx={{ marginLeft: 1 }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              {client.additionalFields &&
                Object.entries(client.additionalFields).map(([key, value]) => (
                  <Box
                    key={key}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {key}:
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="body1">{value}</Typography>
                      <IconButton
                        onClick={() => copyToClipboard(value)}
                        sx={{ marginLeft: 1 }}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
            </>
          ) : (
            <>
              <TextField
                label="Client Name"
                fullWidth
                margin="normal"
                value={editedClient.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
              />
              <TextField
                label="Course"
                fullWidth
                margin="normal"
                value={editedClient.course}
                onChange={(e) => handleFieldChange("course", e.target.value)}
              />
              <TextField
                label="Money"
                fullWidth
                margin="normal"
                value={editedClient.money}
                onChange={(e) => handleFieldChange("money", e.target.value)}
              />
              <TextField
                label="Deadline"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={editedClient.deadline}
                onChange={(e) => handleFieldChange("deadline", e.target.value)}
              />

              {Object.entries(editedClient.additionalFields).map(
                ([key, value], index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", gap: 1, marginTop: 2 }}
                  >
                    <TextField label="Field Key" value={key} disabled />
                    <TextField
                      label="Field Value"
                      value={value}
                      onChange={(e) =>
                        setEditedClient({
                          ...editedClient,
                          additionalFields: {
                            ...editedClient.additionalFields,
                            [key]: e.target.value,
                          },
                        })
                      }
                    />
                  </Box>
                )
              )}
            </>
          )}
        </DialogContent>
        {!isViewMode && (
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default ClientCard;
