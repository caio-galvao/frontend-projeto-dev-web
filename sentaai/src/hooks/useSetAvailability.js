import { useEffect, useState } from "react";
import axios from "axios";

export const useSeatAvailability = (roomId, totalSeats) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    if (!date || !time) return;

    axios
      .get(`/room/${roomId}/timestamp/`, {
        params: { date, time },
      })
      .then((res) => {
        const availabilityMap = {};

        if (Array.isArray(res.data)) {
          const reserved = res.data.map((r) => r.workspace_id);

          for (let i = 0; i < totalSeats; i++) {
            const seatId = `S${i}`;
            availabilityMap[seatId] = reserved.includes(i) ? "unavailable" : "available";
          }
        } else {
          for (let i = 0; i < totalSeats; i++) {
            const seatId = `S${i}`;
            availabilityMap[seatId] = "available";
          }
        }

        setAvailability(availabilityMap);
      })
      .catch((error) => {
        console.error("Erro ao buscar disponibilidade:", error);
        setAvailability({});
      });
  }, [roomId, date, time, totalSeats]);

  return { date, time, setDate, setTime, availability };
};
