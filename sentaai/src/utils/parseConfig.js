export const parseConfig = (configString) => {
    if (!configString) return [];
  
    return configString.split(",").map((item) => {
      const [_, seats] = item.split(":");
      return parseInt(seats, 10);
    });
};

