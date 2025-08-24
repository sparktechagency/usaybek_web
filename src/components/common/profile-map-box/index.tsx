"use client";
import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Skeleton } from "@/components/ui";
import { cn } from "@/lib";
import FavIcon from "@/icon/admin/favIcon";

interface Location {
  lat: string | number;
  long: string | number;
  location: string;
}

interface ProfileMapboxProps {
  locations?: Location[];
  className?: string;
}

const ProfileMapbox: React.FC<ProfileMapboxProps> = ({
  locations = [],
  className,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (locations?.length > 0) {
      setIsLoading(false);
    }
  }, [locations]);

  return (
    <div className={cn("w-full h-[300px] md:h-full", className)}>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Skeleton className="w-full h-full" />
        </div>
      ) : locations?.length > 0 ? (
        <LoadScript
          googleMapsApiKey={
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
          }
        >
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{
              lat: Number(locations[0].lat),
              lng: Number(locations[0].long),
            }}
            zoom={12}
          >
            {locations?.map((loc, index) => (
              <Marker
                key={index}
                position={{
                  lat: Number(loc.lat),
                  lng: Number(loc.long),
                }}
                title={loc.location}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <FavIcon
            name="navlocation"
            color="#888"
            className="mx-auto size-20"
          />
          <h1 className="text-center text-gray1">Location is not available</h1>
        </div>
      )}
    </div>
  );
};

export default ProfileMapbox;
