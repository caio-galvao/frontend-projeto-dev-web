const Seat = ({ id, status }) => {
    const colors = {
      available: "bg-blue-400",
      unavailable: "bg-yellow-400",
      default: "bg-gray-400",
    };
  
    const colorClass = colors[status] || colors.default;
  
    return (
      <div className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center text-white text-xs`}>
        {id}
      </div>
    );
  };
  
  export default Seat;
