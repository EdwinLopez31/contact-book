import axios from "axios";

const getData = async (
  baseLink: string,
  { ...params }: { [x: string]: string }
) => {
  let endpoint = new URL(baseLink);

  if (params) {
    Object.keys(params).forEach((key) =>
      endpoint.searchParams.append(key, params[key])
    );
  }

  try {
    const response = await axios.get(endpoint.toString());
    const data = response.data.data;

    return data;
  } catch (err) {
    console.error(err);
  }
};

export default getData;
