export async function fetchDataChicago () {
    try {
      const response = await $.ajax({
        url: "https://data.cityofchicago.org/resource/ijzp-q8t2.json?$where=year > 2001",
        type: "GET",
        data: {
          "$limit": 5000,
          "$$app_token": "3cJyRnxM0CrRL3CRjJONj4Xez"
        }
      });
      // window.location.href = 'mapCrime.html';
      // console.log(typeof response);
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

export async function fetchDataChicagoByYear (year) {
  const setYear = year;
  try {
    const response = await $.ajax({
      url: `https://data.cityofchicago.org/resource/ijzp-q8t2.json?year=${setYear}`,
      type: "GET",
      data: {
        "$limit": 500,
        "$$app_token": "3cJyRnxM0CrRL3CRjJONj4Xez"
      }
    });
    // window.location.href = 'mapCrime.html';
    // console.log(typeof response);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
  
