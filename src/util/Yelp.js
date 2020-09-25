const { default: Business } = require("../components/Business/Business");

const apikey = 'ecjp1I-7R2k_DB0ehaxhC9y4JzmhPmaqOCANwHvmUQYCeG-56PMHbC4Mz85TkqLccSfYdC3xqhAtS-Rak3BN90B9OICuFIV8GPUZM3bOcXs3fGXoWbk4hq6H-1QBX3Yx';

const yelp = {

    search(term,location,sortBy){
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
        {headers:
            {Authorization: `Bearer ${apikey}`}
        }).then(response => {
            return response.json();
        }).then(jsonResponse=>{
            try {if(jsonResponse.businesses)
                return jsonResponse.businesses.map(business=>{
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    };
                });
            } catch (error) {
                console.log(error)
            };
        });
    }
};

export default yelp;