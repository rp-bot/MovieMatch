/* eslint-disable prettier/prettier */
export const getRecsBasedOnLikesPOST  = async (data:any[]) => {
  try {
    console.log(data);
    const response = await fetch("https://backend.ayushi.io/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "movies":data }),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};
