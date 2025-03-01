// "use client";

// import React, { useState, useEffect } from "react";
// import Map from "react-map-gl/maplibre";
// import { Marker, Popup } from "react-map-gl";

// import "mapbox-gl/dist/mapbox-gl.css";
// import { apiRequest } from "@/hooks/apiRequest";
// import Link from "next/link";
// import { MapPin } from "lucide-react";

// const MAPBOX_TOKEN = "pk.eyJ1IjoicGoyMDA0IiwiYSI6ImNtN3B3YWI1NzAzOXcya29vd3JkMm82anEifQ.5VSLkWOBUiwgIzM_Sa29KQ"; // Replace with your Mapbox token

// export default function MapPage() {
//   const [reports, setReports] = useState([]);
//   const [selectedReport, setSelectedReport] = useState(null);

//   // Fetch reports
//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const data = await apiRequest("https://eco-snap-server.vercel.app/report/all");
//         if (Array.isArray(data)) {
//           setReports(data);
//         } else if (data && Array.isArray(data.report)) {
//           setReports(data.report);
//         } else {
//           console.error("Unexpected API response:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching reports:", error);
//       }
//     };

//     fetchReports();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-md">
//         <div className="container mx-auto flex justify-between items-center h-16 px-6">
//           <h1 className="text-xl font-bold text-blue-600"><Link href={"/"}>EcoSnap</Link></h1>
//           <nav className="flex space-x-6">
//             <Link href={"/"} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Home</Link>
//             <Link href={"/addworker"} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Add Worker</Link>
//             <Link href={"/map"} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Map</Link>
//             <Link href={"/login"} className="text-sm font-medium text-red-600 hover:text-red-800 transition">Logout</Link>
//           </nav>
//         </div>
//       </header>

//       {/* Map Section */}
//       <main className="container mx-auto px-6 py-8">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Report Locations</h1>
        
//         <div className="w-full h-[600px] rounded-lg overflow-hidden">
//           <Map
//             mapboxAccessToken={MAPBOX_TOKEN}
//             initialViewState={{
//               latitude: 20.5937, // Center in India
//               longitude: 78.9629,
//               zoom: 5,
//             }}
//             mapStyle="mapbox://styles/mapbox/streets-v11"
//           >
//             {/* Markers */}
//             {reports.map((report) => (
//               <Marker
//                 key={report._id}
//                 latitude={report.location?.lat || 0}
//                 longitude={report.location?.lng || 0}
//                 anchor="bottom"
//               >
//                 <button onClick={() => setSelectedReport(report)}>
//                   <MapPin className="text-red-500 w-6 h-6" />
//                 </button>
//               </Marker>
//             ))}

//             {/* Popup on Click */}
//             {selectedReport && (
//               <Popup
//                 latitude={selectedReport.location?.lat || 0}
//                 longitude={selectedReport.location?.lng || 0}
//                 onClose={() => setSelectedReport(null)}
//                 closeOnClick={false}
//               >
//                 <div className="p-2">
//                   <h3 className="text-sm font-semibold">{selectedReport.type}</h3>
//                   <p className="text-xs text-gray-600">{selectedReport.description}</p>
//                   <p className="text-xs text-gray-600">{selectedReport.status}</p>
//                 </div>
//               </Popup>
//             )}
//           </Map>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// Random coordinates for the markers (relative positioning)
const markers = [
  { top: "30%", left: "40%" },
  { top: "50%", left: "20%" },
  { top: "70%", left: "60%" },
  { top: "20%", left: "80%" },
];

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center h-16 px-6">
          <h1 className="text-xl font-bold text-blue-600">
            <Link href={"/"}>EcoSnap</Link>
          </h1>
          <nav className="flex space-x-6">
            <Link href={"/"} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href={"/map"} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Map
            </Link>
            <Link href={"/addworker"} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Add Worker</Link>
            
            <Link href={"/login"} className="text-sm font-medium text-red-600 hover:text-red-800 transition">
              Logout
            </Link>
          </nav>
        </div>
      </header>

      {/* Map Section */}
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Mumbai Waste Reports</h1>

        {/* Map Container */}
        <div className="relative w-full max-w-4xl mx-auto h-96 border rounded-lg overflow-hidden shadow-md">
          {/* Static Map Image */}
          <Image
            src="/map.png" // Replace with your actual map image path
            alt="Mumbai Map"
            layout="fill"
            objectFit="cover"
            className="w-full"
          />

          {/* Markers */}
          {markers.map((marker, index) => (
            <div
              key={index}
              className="absolute bg-red-500 w-4 h-4 rounded-full shadow-lg animate-pulse"
              style={{ top: marker.top, left: marker.left }}
            ></div>
          ))}
        </div>
      </main>
    </div>
  );
}

