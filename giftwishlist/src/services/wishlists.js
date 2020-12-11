const BASE = "https://giftwishlist1.azurewebsites.net/api/";
const BASE_URL = BASE + "/api/wishlist";

const getById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`).catch((err) =>
    console.log(err)
  );
  const data = await response.json();

  return data;
};

const createItem = async (item, wishlistId) => {
  const response = await fetch(`${BASE_URL}/${wishlistId}/item/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("bearer-token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).catch((err) => console.log(err));
  if (response.status > 400) {
    return response;
  }
  return await response.json();
};

export default { getById, createItem };
