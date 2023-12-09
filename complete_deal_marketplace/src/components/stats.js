import axios from "axios";

const getDealData = async () => {
    try {
        // GraphQL query for fetching data
       const graphqlQuery=
       `
       query  {
        filecoin(network: filecoin) {
          messages(
            any: {receiver: {is: "f05"}}
            method: {is: 4}
            date: {since: "2023-12-01", till: "2023-12-08"}
          ) {
            count
          }
        }
      }
      
       `

        // Configuration for Axios request
        const config = {
            method: "post",
            url: "https://graphql.bitquery.io",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "BQY4Sr6zf8oD1rPVq5ZTqVoQnKAjCh8Z", // Replace with your own Bitquery API key
            },
            data: JSON.stringify({ query: graphqlQuery }),
        };

        // Making the API call
      console.log(" stats API Called!!!!");
        const response = await axios(config);
        console.log("response.data.data ", response.data.data.filecoin.messages[0].count);


        const publishdealscount = response.data.data.filecoin.messages[0].count;
     

        return publishdealscount;
    } catch (error) {
        console.error(error);
        throw error;
    }
};





export default getDealData;
