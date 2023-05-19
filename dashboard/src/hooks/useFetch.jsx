export const UseFetch = async (endPoint, method = 'GET', data, token) => {
    const apiURLBase = import.meta.env.VITE_APP_API_URL_BASE;
    const url = apiURLBase + endPoint;
    console.log(url);
  
    let response;
  
    try {
      if (method === 'GET') {
        response = await fetch(url);
      }
  
      if (method === 'POST') {
        response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
      }
  
      let result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  