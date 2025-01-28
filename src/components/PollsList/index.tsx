"use client";

import { Poll, Polls } from "@/utils/usePolls";
import { baseUrl } from "@/utils/utils";
import { AccessTime, Check, ContentCopy } from "@mui/icons-material";

import {
  Alert,
  Box,
  Button,
  Card,
  Fade,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PollsList = ({ data }: { data: Polls }) => {
  const router = useRouter();
  const [alert, setAlert] = useState(false);
  const { result } = data;
  const desktopOnly = { display: { xs: "none", md: "table-cell" } };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: { xs: "100%", md: "80%" },
      }}
    >
      {alert && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            padding: { xs: 2, md: 4 },
            zIndex: 1000,
          }}
        >
          <Fade in={alert}>
            <Alert
              icon={<Check fontSize="inherit" />}
              severity="success"
              sx={{
                whiteSpace: "nowrap",
                width: { xs: "100%", md: "80%" },
              }}
            >
              Tekst is gekopieerd naar het klembord!
            </Alert>
          </Fade>
        </Box>
      )}

      <Card
        sx={{
          bgcolor: "background.default",
          boxShadow: { xs: 0, md: 2 },
        }}
      >
        <Table>
          <TableBody>
            {result.map((poll: Poll) => {
              const handleCopy = () => {
                const text = `Doe je mee met "${poll.title}"\nDatum: ${poll.date}\nTijd: ${poll.time}\nLocatie: ${poll.location}\nTrainer: ${poll.trainer}\n\n${baseUrl}/${poll.id}`;

                navigator.clipboard
                  .writeText(text)
                  .then(() => setAlert(true))
                  .catch((err) => console.error("Error copying text: ", err));
              };
              return (
                <TableRow
                  key={poll.id}
                  onClick={() => router.push(`/${poll.id}`)}
                  className="cursor-pointer hover:bg-blue-100"
                >
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Typography variant="caption">{poll.date}</Typography>
                      <Typography
                        variant="caption"
                        sx={{ display: "flex", gap: 0.5, alignItems: "center" }}
                      >
                        <AccessTime sx={{ height: 14, width: 14 }} />
                        {poll.time}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={desktopOnly}>{poll.time}</TableCell>
                  <TableCell sx={desktopOnly}>{poll.trainer}</TableCell>
                  <TableCell sx={desktopOnly}>{poll.location}</TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      {poll.title}
                      <Button
                        sx={{ minWidth: 0, flexShrink: 0 }}
                        onClick={(e) => {
                          handleCopy();
                          e.stopPropagation();
                        }}
                      >
                        <ContentCopy />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
};

export default PollsList;
