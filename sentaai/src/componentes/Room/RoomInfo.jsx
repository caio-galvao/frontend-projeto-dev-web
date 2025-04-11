const RoomInfo = ({ name, equipments }) => (
    console.log("RoomInfo props:", { name, equipments }),
    <div className="mb-4">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-sm text-gray-600">{equipments?.join(", ")}</p>
    </div>
  );
  
  export default RoomInfo;
  