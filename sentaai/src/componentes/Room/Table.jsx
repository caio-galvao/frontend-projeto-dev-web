import Seat from "./Seat";

const Table = ({ seats, availability, tableIndex, globalSeatOffset }) => (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: seats }).map((_, idx) => {
          const seatNumber = globalSeatOffset + idx;
          const seatId = `S${seatNumber}`;
          return <Seat key={seatId} id={seatId} status={availability[seatId]} />;
        })}
      </div>
    </div>
);  

export default Table;
