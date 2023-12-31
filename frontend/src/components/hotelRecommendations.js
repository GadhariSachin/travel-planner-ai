import React, { useEffect, useState } from "react";
import Loader from "./loader";
import axios from "axios";

function HotelRecommendations(props) {
  const {
    destination = "",
    start_date = "",
    days = 1,
    group_type = "",
  } = props.data || {};

  const [hotelRecommendations, setHotelRecommendations] = useState(null);

  const [loading, setLoading] = useState(true);

  const getHotelRecommendations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/hotels?location=${destination}&start_date=${start_date}&days=${days}&group_type=${group_type}`
      );

      setHotelRecommendations(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHotelRecommendations();
  }, []);

  if (loading)
    return <Loader loaderText="Fetching hotel reommendations for you..." />;

  if (hotelRecommendations) {
    return (
      <div className="flex flex-col">
        <hr className="my-7"></hr>
        <div className="font-bold text-[1.5rem] text-[#1f2937] mb-[20px]">
          Hotel Recommendations
        </div>
        <div className="flex flex-col gap-[25px]">
          {hotelRecommendations.hotel_id.map((hotelId) => {
            const hotelMapById = hotelRecommendations.hotel_map_by_id || {};
            const {
              id = "",
              name = "",
              url = "",
              image_url = "",
              address = "",
              price = "",
            } = hotelMapById[hotelId] || {};

            return (
              <>
                <div key={id} className="border rounded-lg flex items-center">
                  <img src={image_url} alt={name} className="rounded w-1/2" />
                  <div className="p-[15px] flex flex-col gap-[10px]">
                    <div className="text-[20px]">{name}</div>
                    <div>
                      Address: <b>{address}</b>
                    </div>
                    <div>
                      Costs: <b>{price}</b> (Approximately)
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <hr className="my-7"></hr>
      <div className="font-bold text-[1.5rem] text-[#1f2937] mb-[20px]">
        Hotel Recommendations
      </div>
      <div>No hotels found.</div>
    </div>
  );
}

export default HotelRecommendations;
