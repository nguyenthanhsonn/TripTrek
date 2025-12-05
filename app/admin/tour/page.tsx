"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSuitcaseRolling,
  faCalendarDay,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/hooks/useAuth";

interface Tour {
  id: number;
  name: string;
  price: number;
  destination: string;
  create_by?: string;
  images?: string[];
  created_at: string;
}

export default function AdminTourPage() {
  const { getToken } = useAuth();
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://10.36.120.153:8000";

  const buildHeaders = () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const token = typeof getToken === "function" ? getToken() : undefined;
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  const [tours, setTours] = useState<Tour[]>([]);
  const [toursCount, setToursCount] = useState<number>(0);
  const [todayCount, setTodayCount] = useState<number>(0);
  const [todayTours, setTodayTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const parseResponse = async (res: Response) => {
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      try {
        return await res.json();
      } catch {
        return await res.text();
      }
    }
    return await res.text();
  };


  // ============================
  // 👉 FETCH COUNT + TODAY TOURS
  // ============================
  useEffect(() => {
    const fetchCountAndList = async () => {
      setLoading(true);

      try {
        // ------ (1) GET TODAY COUNT ------
        const countRes = await fetch(`${API_BASE}/tours/count`, {
          method: "GET",
          headers: buildHeaders(),
        });

        if (countRes.ok) {
          const parsed = await parseResponse(countRes);

          setTodayCount(parsed.tourDaTaoHomNay || 0);

          setToursCount(parsed.tongSoTour || 0); // nếu FE cần tổng tour
        }


        // ------ (2) GET TODAY LIST ------
        const todayRes = await fetch(`${API_BASE}/tours/today`, {
          method: "GET",
          headers: buildHeaders(),
        });

        if (todayRes.ok) {
          const parsed = await parseResponse(todayRes);
          const arr = Array.isArray(parsed) ? parsed : parsed?.tours || [];

          const normalized = arr.map((t: any) => ({
            id: t.id,
            name: t.name,
            price: t.price,
            destination: t.destination,
            create_by: t.create_by,
            images: t.images || t.image || [],
            created_at: t.created_at || t.createdAt,
          }));

          // lưu vào todayTours để UI "Tour đã tạo ngày hôm nay" hiển thị
          setTodayTours(normalized);
          // nếu muốn cập nhật tổng số tour dùng API tổng, không phải số item của today list
          console.log("Fetched today's tours, count:", normalized.length);
        }
      } catch (err) {
        console.error("Error fetching all tours:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountAndList();
  }, [API_BASE]);

  const statCard = (
    title: string,
    value: string,
    icon: any,
    color: string
  ) => (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex items-center gap-4 hover:shadow-lg transition">
      <div className={`w-12 h-12 flex items-center justify-center rounded-full ${color}`}>
        <FontAwesomeIcon icon={icon} className="text-white text-xl" />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Title */}
      <div className="mb-10 mt-20 text-center">
        <h1 className="text-4xl font-extrabold text-white">Quản lý Tour</h1>
        <div className="w-24 h-1 bg-sky-500 mx-auto mt-3 rounded-full"></div>
        <p className="text-gray-200 mt-3">
          Quản lý và theo dõi các tour du lịch trong hệ thống
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statCard("Tổng số tour", (toursCount || tours.length).toString(), faSuitcaseRolling, "bg-sky-500")}
        {statCard("Tour đã tạo hôm nay", todayCount.toString(), faCalendarDay, "bg-green-500")}
        {statCard("Tour đã gỡ bỏ hôm nay", "0", faTrash, "bg-red-500")}
      </div>

      {/* Search */}
      <div className="relative max-w-lg mx-auto mb-8">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
        />
        <input
          type="text"
          placeholder="Tìm kiếm tour..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Today's Tours */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Tour đã tạo ngày hôm nay</h2>
      </div>

      <div className="max-h-96 overflow-y-auto space-y-4 p-4 bg-white shadow-lg rounded-xl border border-gray-200">
        {(todayTours.length ? todayTours : []).map((tour) => (
          <div
            key={tour.id}
            className="flex items-center gap-4 p-4 border-b last:border-none hover:bg-sky-50 transition rounded-lg"
          >
            {/* Thumbnail */}
            <img
              src={
                tour.images && tour.images.length > 0
                  ? tour.images[0]
                  : "/defaultTour.jpg"
              }
              alt={tour.name}
              className="w-20 h-16 rounded-lg object-cover shadow-sm border"
            />

            {/* Info */}
            <div className="flex-1">
              <h1 className="font-semibold text-gray-800 text-base">
                {tour.name}
              </h1>
              <p className="text-sm text-gray-500">{tour.destination}</p>
              <p className="text-sm text-gray-500">👤 {tour.create_by}</p>
            </div>

            {/* Date */}
            <div className="text-right">
              <p className="text-xs text-gray-400">{tour.created_at}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

