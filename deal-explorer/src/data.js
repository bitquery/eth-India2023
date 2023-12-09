import axios from "axios";

const getData = async () => {
    try {
        // GraphQL query for fetching data
        const graphqlQuery = `
            {
                filecoin(network: filecoin) {
                    
                    publishdeals: messages(
                        any: { receiver: { is: "f05" } }
                        date: { is: "2023-12-07" }
                        options: { limit: 10 }
                        method: { is: 4 }
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
            }
        `;

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
        // console.log("API Called!!!!");
        const response = await axios(config);
        // console.log("response", response);


        const publishdeals = response.data.data.filecoin.publishdeals;
        // console.log("published deals", publishdeals);

        // // Extracting hashes from the response data
        // const allMessages = extractHashesFromResponse(response);
        // console.log(allMessages)

        // Fetching additional data for each hash
        const additionalDataPromises = publishdeals.map(async (deals) => {
            // console.log(deals.signedHash)
            const hashResponse = await fetch(`https://filfox.info/api/v1/message/${deals.signedHash}/others`);
            const dealArray = await hashResponse.json();
            return { deals, dealArray };
        });

        // Wait for all additional data requests to complete
        const additionalData = await Promise.all(additionalDataPromises);
        const transformedObjects = transformObject(additionalData);
        transformObject(additionalData);
        // console.log(transformedObjects);

        // console.log("allMessages", allMessages);
        // console.log("additionalData", additionalData);

        return transformedObjects;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Helper function to extract hashes from different message types
const extractHashesFromResponse = (response) => {
    const allMessages = [];

    // Extracting hashes from publishdeals
    response.data.data.filecoin.publishdeals.forEach((message) => {
        allMessages.push(message);
    });

    return allMessages;

};

const transformObject = (_originalObject) => {

    // console.log(_originalObject);
    const detailedDealInfo = _originalObject.map((item) => {
        if (item.dealArray !== null) {

            return item.dealArray.decodedParams.Deals.map((individualDeal) => {

                function shortenAddress(address) {
                    if (typeof address !== 'string' || address.length < 7) {
                        return address; // Return the original address if it's not a string or too short
                    }
                
                    const prefix = address.substring(0, 4);
                    const suffix = address.substring(address.length - 5);
                
                    return `${prefix}...${suffix}`;
                }
                const shortAddress = shortenAddress(item.deals.sender.address);
                const shortPieceCID = shortenAddress(individualDeal.Proposal.PieceCID)

                return [
                    shortPieceCID,
                    individualDeal.Proposal.PieceSize,
                    individualDeal.Proposal.ProviderCollateral,
                    individualDeal.Proposal.StartEpoch ,
                    individualDeal.Proposal.endEpoch,
                    shortAddress
                ];
            });
        }
    })
    const flattenAndFilterNull = (nestedArray) => {
        const flattenedArray = nestedArray.flat(1).filter(item => item !== null && item !== undefined);
        return flattenedArray;
    };
    const allDeals = flattenAndFilterNull(detailedDealInfo);


    return allDeals;
};

export default getData;
