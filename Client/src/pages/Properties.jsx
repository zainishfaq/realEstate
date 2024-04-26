import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ExploreProperties() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getalllisting");
        setListings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Explore Properties</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="flex flex-wrap -mx-4">
          {listings.map(listing => (
            <Link to={`/listing/${listing.id}`} key={listing.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
              <div className="bg-white p-4 shadow-md rounded-md">
                <img src={listing.imageUrls[0]} alt={listing.name} className="w-full h-40 object-cover mb-4 rounded-md" />
                <h2 className="text-xl font-bold mb-2">{listing.name}</h2>
                <p className="text-gray-600 mb-2">Type: {listing.type}</p>
                <p className="text-gray-600 mb-2">Price: ${listing.regularPrice}</p>
                <p className="text-gray-600 mb-2">Beds: {listing.bathrooms}</p>
                <p className="text-gray-600 mb-2">Baths: {listing.bathrooms}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExploreProperties;
