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
export const getRecsOffFreePOST  = async (data:string) => {
  try {
    // console.log(data);
    console.log("hey I just sent the data")
    const response = await fetch("https://backend.ayushi.io/free_form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "free_text":data }),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};
