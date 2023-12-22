import React from "react";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MapContainer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TileLayer } from "react-leaflet/TileLayer";
import { useState } from "react";
import { Polygon } from "react-leaflet";
// import  TileLayer  from 'leaflet'
import L from "leaflet";
// import {addressPoints} from './realworld'
import { countrycodes } from "../../data";
import { useEffect } from "react";
import { useAxiosInstance } from "../../services/useAxiosInstance";
// import { axiosInstance } from "../../services/axiosInstance";
const coordinates1 = [
  [
    {
      coordinates: [],
    },
  ],
  [
    {
      coordinates: [],
    },
  ],
  [
    {
      coordinates: [],
    },
  ],
  [
    {
      coordinates: [],
    },
  ],
  [
    {
      coordinates: [],
    },
  ],
  [
    {
      coordinates: [],
    },
  ],
  [
    {
      coordinates: [],
    },
  ],
  [
    {
      coordinates: [],
    },
  ],
];
export const ClusterMap = () => {
  const [details1, setDetails1] = useState([]);
  let coordinatesdetails = [{ coordinates: [[]] }, { coordinates: [[]] }];
  const customIcon = new L.Icon({
    iconUrl: require("../../location.svg").default,
    iconSize: new L.Point(40, 47),
  });
  const {axiosInstance} = useAxiosInstance()

  const getAllDetails = async () => {
    const email = localStorage.getItem("email");
    try {
      const details = await axiosInstance.get(
        `/families/${email}`
      );
      if (details) {
        console.log("hello", details.data.allFamilyDetails);
        // console.log(details.data.allfamily1);
        let exactdetails = [];
        for (let i = 0; i < details.data.allFamilyDetails.length; i++) {
          // if(details.data.allFamilyDetails[i]!=null){
          let index = 0;
          while (index < 7) {
            let flag = 0;
            for (let j = 0; j < countrycodes[index].length; j++) {
              if (
                countrycodes[index][
                  j
                ].Municipal_Center_Tanuja.toLocaleLowerCase() ==
                details.data.allFamilyDetails[
                  i
                ].members[0].address.toLocaleLowerCase()
              ) {
                coordinates1[index][0].coordinates.push([countrycodes[index][j].Final_X_Coordinate,countrycodes[index][j].Final_Y_Coordinate]);
                // console.log("casccsadcda", [
                  // countrycodes[index][j].Final_X_Coordinate,
                  // countrycodes[index][j].Final_Y_Coordinate,
                // ]);
                // console.log(coordinates1[index]);
                flag = 1;
                break;
              }
            }
            if (flag == 1) {
              break;
            }
            index++;
          }
          // }
        }
        // console.log(countrycodes);
        console.log("fhsafewa", coordinates1);
        setDetails1(details.data.allFamilyDetails);

        console.log("details112", details1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllDetails();
  }, []);
  return (
    <MapContainer
      style={{ height: "500px" }}
      center={[38.9637, 35.2433]}
      zoom={1}
      scrollWheelZoom={true}
      maxZoom={10}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=tLhB6CpfM7ebmWdOXsnx"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      ></TileLayer>
      {/* </MapContainer> */}
      {coordinates1.map((provinces) => {
        const coordinates2=provinces[0].coordinates.map((item1)=>[item1[1],item1[0]]);
        // console.log(coordinates)
        // const coordinates3 = [[12, 12]];
        // console.log("dcasd",coordinates2);
        // return (
        //   <Polygon
        //     pathOptions={{
        //       fillColor: "black",
        //       fillOpacity: 0.7,
        //       weight: 2,
        //       opacity: 1,
        //       dashArray: 3,
        //       color: "black",
        //     }}
        //     positions={coordinates2}
        //     eventHandlers={{
        //       mouseover: (e) => {
        //         const layer = e.target;
        //         layer.setStyle({
        //           dashArray: "",
        //           fillColor: "#BD0026",
        //           fillOpacity: 0.7,
        //           weight: 2,
        //           opacity: 1,
        //           color: "black",
        //         });
        //       },
        //       mouseout: (e) => {
        //         const layer = e.target;
        //         layer.setStyle({
        //           fillOpacity: 0.7,
        //           weight: 2,
        //           dashArray: "3",
        //           color: "black",
        //           fillColor: "black",
        //         });
        //       },
        //       click: (e) => {},
        //     }}
        //   />
        // );
      })}
    </MapContainer>
  );
};

export default ClusterMap;