"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { apiRequest } from "@/hooks/apiRequest";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function AddWorker() {
  const [workers, setWorkers] = useState([]);
  const [filter, setFilter] = useState("All"); // Default filter
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  // Fetch all workers
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await apiRequest("https://eco-snap-server.vercel.app/worker/all");
        if (Array.isArray(data.worker)) {
          setWorkers(data.worker);
        } else {
          console.error("Unexpected API response:", data);
        }
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiRequest("https://eco-snap-server.vercel.app/worker/create", "POST", formData);
      if (response.success) {
        alert("Worker added successfully!");
        setWorkers([...workers, response.worker]); // Update UI
        setFormData({ name: "", email: "", phone: "", location: "" }); // Reset form
      } else {
        alert(response.message || "Failed to add worker.");
      }
    } catch (error) {
      console.error("Error adding worker:", error);
    }
  };

  // Filter workers based on status (Online, Offline, All)
  const filteredWorkers = useMemo(() => {
    if (filter === "All") return workers;
    return workers.filter((worker) => worker.active === filter);
  }, [workers, filter]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center h-16 px-6">
          <h1 className="text-xl font-bold text-blue-600"><Link href={'/'}>EcoSnap</Link></h1>
          <nav className="flex space-x-6">
            <Link href={"/"} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Home</Link>
            <Link href={"/addworker"} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">Add Worker</Link>
            <Link href={"/map"} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Map
            </Link>
            <Link href={"/login"} className="text-sm font-medium text-red-600 hover:text-red-800 transition">Logout</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Manage Workers</h1>

        {/* Add Worker Form */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Worker</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="rounded-md border border-gray-300 px-3 py-2" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="rounded-md border border-gray-300 px-3 py-2" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="rounded-md border border-gray-300 px-3 py-2" />
            </div>
            {/* <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleChange} className="rounded-md border border-gray-300 px-3 py-2" />
            </div> */}
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Add Worker</Button>
            </div>
          </form>
        </section>

        {/* Workers Table */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Workers</h2>

            {/* Dropdown Menu for Filtering */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{filter}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilter("All")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("Online")}>Online</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("Offline")}>Offline</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkers.length > 0 ? (
                filteredWorkers.map((worker) => (
                  <TableRow key={worker._id}>
                    <TableCell>{worker.name}</TableCell>
                    <TableCell>{worker.email}</TableCell>
                    <TableCell>{worker.phone}</TableCell>
                    <TableCell>{worker.location || "N/A"}</TableCell>
                    <TableCell>{worker.status}</TableCell>
                    <TableCell>{worker.active}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6" className="text-center">No workers found...</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>
      </main>
    </div>
  );
}
