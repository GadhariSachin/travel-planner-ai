import React from "react";
import ActivitySvg from "@/svg/activity";
import DurationSvg from "@/svg/duration";
import RupeeSvg from "@/svg/rupee";
import StartAtSvg from "@/svg/startAt";

function TripActivity({ activity }) {
  const {
    location_name = "",
    duration_min,
    budget_inr = 0,
    activity_types = [],
    activity_description = "",
    local_time = "",
  } = activity;
  return (
    <div className="border p-[15px] rounded-md">
      <div className="font-medium text-[20px] underline">{location_name}</div>
      <div className="mb-4 font-base text-sm md:text-base svelte-1hpiyon">
        {activity_description}
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-[8px] capitalize">
          {" "}
          <StartAtSvg /> {local_time}
        </div>
        <div className="flex items-center gap-[8px] capitalize">
          <DurationSvg /> {duration_min} minutes
        </div>
        <div className="flex items-center gap-[8px] capitalize">
          <ActivitySvg /> {activity_types.join(", ")}
        </div>
        {budget_inr > 0 ? (
          <div className="flex items-center gap-[8px] capitalize">
            <RupeeSvg />
            {budget_inr}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TripActivity;
