"use client";

import React, { useState, useEffect } from "react";
import { Clock, MapPin, User, Trash2, Droplet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { apiRequest } from "@/hooks/apiRequest";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [reports, setReports] = useState([]);

  // Fetch reports from API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        console.log("Fetching reports...");
        const data = await apiRequest("https://eco-snap-server.vercel.app/report/all");
        console.log("API Response:", data);

        if (Array.isArray(data)) {
          setReports(data);
        } else if (data && Array.isArray(data.reports)) {
          setReports(data.reports);
        } else {
          console.error("Unexpected API response format:", data);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center h-16 px-6">
          <h1 className="text-xl font-bold text-blue-600">WasteTrack</h1>
          <nav className="flex space-x-6">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Home
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Add Worker
            </a>
            <a href="#" className="text-sm font-medium text-red-600 hover:text-red-800 transition">
              Logout
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Waste Reports Dashboard</h1>

        {/* Filter Tabs */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-gray-100 rounded-full p-1 w-fit">
            <TabsTrigger value="all" className="rounded-full px-4 py-2 data-[state=active]:bg-white">
              All Reports
            </TabsTrigger>
            <TabsTrigger value="e-waste" className="rounded-full px-4 py-2 data-[state=active]:bg-white">
              E-Waste
            </TabsTrigger>
            <TabsTrigger value="dry" className="rounded-full px-4 py-2 data-[state=active]:bg-white">
              Dry Waste
            </TabsTrigger>
            <TabsTrigger value="wet" className="rounded-full px-4 py-2 data-[state=active]:bg-white">
              Wet Waste
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(reports) && reports.length > 0 ? (
            reports
              .filter((report) => activeTab === "all" || report.type.toLowerCase().includes(activeTab))
              .map((report) => (
                <ReportCard
                  key={report._id}
                  type={report.type}
                  id={report._id}
                  status={report.status}
                  statusColor={report.statusColor || "blue"}
                  image={report.imageUrl || "/placeholder.svg"}
                  email={report.user}
                  location={report.location}
                  timestamp={new Date(report.updatedAt).toLocaleString()}
                  description={report.description}
                  icon={report.type === "Wet Waste" ? <Droplet className="w-5 h-5 text-blue-500" /> : <Trash2 className="w-5 h-5 text-orange-500" />}
                />
              ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">No reports found...</p>
          )}
        </div>
      </main>
    </div>
  );
}

function ReportCard({ type, id, status, statusColor, image, email, location, timestamp, description, icon }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white">
      {/* Image with Status Badge */}
      <div className="relative">
        {/* <Image src={image} alt={type} width={400} height={200} className="w-full h-44 object-cover" /> */}
        <img src={image} alt={type} className="w-full h-44 object-cover" />

        <Badge className={`absolute top-3 right-3 ${statusColor === "blue" ? "bg-blue-500" : "bg-amber-500"} text-white`}>
          {status}
        </Badge>
      </div>

      {/* Report Details */}
      <div className="p-4">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-gray-100 rounded-md">{icon}</div>
          <div>
            <h3 className="font-medium">{type}</h3>
            <p className="text-sm text-gray-500">ID: {id}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>{email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{timestamp}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium">Description:</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            Update Status
          </Button>
          <Button className="flex-1 bg-blue-500 hover:bg-blue-600">Assign</Button>
        </div>
      </div>
    </div>
  );
}
