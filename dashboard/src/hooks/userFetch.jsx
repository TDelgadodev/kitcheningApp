/* eslint-disable no-unused-vars */
export const UserFetch = async (endPoint,method = 'GET', data, token) => {

    const apiURLBase = import.meta.env.REACT_APP_API_URL_BASE;
    console.log(apiURLBase);
    const url = apiURLBase + endPoint;

    let response;

    try {
        if(method === "GET"){
            response = await fetch(url)
         }
     
         if(method === "POST"){
             response = await fetch(url,{
                 method : "POST",
                 body : JSON.stringify(data),
                 headers : {
                     "Content-Types" : "application/json",
                     Athorization : token
                 }
     
             })
         }
     
         let result = await response.json();
         return result        
    } catch (error) {
        console.log(error)
    }


    
}