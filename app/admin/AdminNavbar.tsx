"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faBuilding,
  faUser,
  faCog,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import AdminNotificationBell from "../common/AdminNotificationBell";
import AdminNotificationDropdown from "../common/AdminNotificationDropdown";
import useAuth from "@/hooks/useAuth";

const navItems = [
  { name: "Tours", href: "/admin/tour", icon: faBuilding },
  { name: "Users", href: "/admin/user", icon: faUser },
  { name: "Change Password", href: "/admin/setting", icon: faCog },
];

export default function AdminNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const pathname = usePathname();
  const { handleLogout } = useAuth();

  return (
    <nav className="w-full fixed top-0 left-0 z-[500] bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LEFT LOGO */}
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Admin Panel</span>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* 🔔 NOTIFICATION */}
            <div className="relative">
              <AdminNotificationBell onClick={() => setOpenNoti(!openNoti)} />

              {openNoti && (
                <div className="absolute right-0 top-12 z-50">
                  <AdminNotificationDropdown />
                </div>
              )}
            </div>


            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="relative z-[60] flex items-center gap-2 px-3 py-2 text-sm 
              text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
              <span className="hidden md:block">Đăng xuất</span>
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => {
                setOpenNoti(false);
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faTimes : faBars}
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 z-[300] bg-white">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
