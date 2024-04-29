import axios from "axios";
import { toast } from "sonner";

export const getEventTypeById = async (id: string) => {
  try {
    const res = await axios.get(`/api/event-type/${id}`);

    return res.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
