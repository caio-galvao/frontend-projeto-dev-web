import { useEffect, useState } from "react";
import axios from "axios";

export const useSeatAvailability = (roomId, totalSeats) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    if (date && time) {
      axios
        .get(`/room/${roomId}/timestamp/`, {
          params: { date, time },
        })
        .then((res) => {
          const reserved = res.data.map((r) => r.workspace_id);
          const map = {};

          for (let i = 0; i < totalSeats; i++) {
            const seatId = `S${i}`;
            map[seatId] = reserved.includes(i) ? "unavailable" : "available";
          }

          setAvailability(map);
        })
        .catch(() => setAvailability({}));
    }
  }, [roomId, date, time, totalSeats]);

  return { date, time, setDate, setTime, availability };
};
