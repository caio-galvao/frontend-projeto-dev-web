import { useEffect } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import RoomInfo from "../../componentes/Room/RoomInfo";
import DateTimePicker from "../../componentes/Room/DateTimePicker";
import Table from "../../componentes/Room/Table";
import { useRoomStore } from "../../store/RoomStore";
import { useSeatAvailability } from "../../hooks/useSetAvailability";
import { parseConfig } from "../../utils/parseConfig";

const RoomView = () => {
  const { id } = useParams();
  const { room, setRoom } = useRoomStore();

  // Sempre inicialize `config` e `totalSeats` com valores padrão
  const config = room?.config ? parseConfig(room.config) : [];
  const totalSeats = config.reduce((sum, n) => sum + n, 0);

  useEffect(() => {
    axios
      .get(`/room/${id}`)
      .then((res) => {
        setRoom(res.data);
      })
      .catch((err) => {
        console.error("Erro ao carregar sala:", err);
      });
  }, [id, setRoom]);

  // Chame o hook `useSeatAvailability` de forma consistente
  const { date, time, setDate, setTime, availability } = useSeatAvailability(id, totalSeats);

  if (!room) {
    return <div className="p-6 text-center text-gray-500">Carregando sala...</div>;
  }

  return (
    <div className="p-6">
      <RoomInfo name={room?.name} equipments={room?.equipments} />

      <DateTimePicker
        date={date}
        time={time}
        onDateChange={setDate}
        onTimeChange={setTime}
      />

      <div className="flex flex-wrap gap-6 mt-6 justify-center">
        {config.map((seats, tableIndex) => {
          return (
            <Table
              key={tableIndex}
              seats={seats}
              availability={availability}
              tableIndex={tableIndex}
              globalSeatOffset={config.slice(0, tableIndex).reduce((a, b) => a + b, 0)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RoomView;
