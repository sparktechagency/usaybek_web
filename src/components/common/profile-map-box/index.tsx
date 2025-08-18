import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Skeleton } from "@/components/ui";

export default function ProfileMapbox({ locations = [] }: any) {
  const defaultCenter = { lat: 23.8103, lng: 90.4125 };

  return (
  <div className="w-full h-[300px] md:h-full">
     {
        locations.length > 0 ? (
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
            >
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                }}
                center={
                  locations.length > 0
                    ? { lat: Number(locations[0].lat), lng: Number(locations[0].long) }
                    : defaultCenter
                }
                zoom={12}
              >
                {locations.map((loc: any, index: number) => (
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
             <Skeleton className="w-full h-full"/>
          )
     }
  </div>
  )
}
