import axios from "axios";
import { toast } from "react-hot-toast";

const postData = async (baseLink: string, { ...params }) => {
  let endpoint = new URL(baseLink);

  if (params) {
    Object.keys(params).forEach((key) =>
      endpoint.searchParams.append(key, params[key])
    );
  }
  try {
    const response = await axios(endpoint.toString(), {
      method: "DELETE",
    });
    if (response.status === 200) {
      toast.success(response?.data?.message);
    } else {
      toast.error(response?.data?.message);
    }
    const data = response?.data?.data;
    return data;
  } catch (err) {
    toast.error("Encountered an error while deleting");
    console.error(err);
  }
};

export default postData;
