import axios from "axios";
export const getAllItems = async () => {
    const response = await axios.get("http://localhost:3000/api/items");
    const itemsOptArray = Array.from(response.data, (item) => ({
      label: item.name,
      value: item._id,
    }));

    return itemsOptArray;
  };