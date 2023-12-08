import axios from "axios";

const getData = async () => {
  try {
    const data = JSON.stringify({
      query: `{
        filecoin(network: filecoin) {
          precommits: messages(
            any: {receiver: {in: ["f01845667", "f02833325", "f0814049"]}}
            method: {is: 6}
            options: {desc: "date.date", limit: 10}
          ) {
            date: date {
              date(format: "%Y-%m-%d")
            }
            block {
              height
            }
            sender {
              account
              address
              type
            }
            receiver {
              account
              address
              type
            }
            method {
              id
              name
            }
            burned
            amount
            signedHash
            signatureType
            signature
          }
          publishdeals: messages(
            any: {receiver: {is: "f05"}}
            options: {limit: 10}
            method: {is: 4}
            date: {is: "2023-10-10"}
          ) {
            date: date {
              date(format: "%Y-%m-%d")
            }
            block {
              height
            }
            sender {
              account
              address
              type
            }
            receiver {
              account
              address
              type
            }
            method {
              id
              name
            }
            burned
            amount
            signedHash
            signatureType
            signature
            refund
            returnValue
          }
        }
      }`,
    });

    const config = {
      method: "post",
      url: "https://graphql.bitquery.io",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "your key", // Replace with your own Bitquery API key
      },
      data,
    };

    const response = await axios(config);
    console.log("response ",response)
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getData;
