import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import GenericTable, { TableColumn } from "@/components/tables/GenericTable";

import React from "react";
import Badge from "@/components/ui/badge/Badge";
import Image from "next/image";

interface Barber {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
}

const columns: TableColumn<Barber>[] = [
  {
    key: "user" as keyof Barber,
    header: "User",
    render: (value: unknown) => {
      const user = value as Barber["user"];
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <Image
              width={40}
              height={40}
              src={user.image}
              alt={user.name}
            />
          </div>
          <div>
            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
              {user.name}
            </span>
            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
              {user.role}
            </span>
          </div>
        </div>
      );
    }
  },
  {
    key: "projectName" as keyof Barber,
    header: "Project Name"
  },
  {
    key: "team" as keyof Barber,
    header: "Team",
    render: (value: unknown) => {
      const team = value as Barber["team"];
      return (
        <div className="flex -space-x-2">
          {team.images.map((teamImage, index) => (
            <div
              key={index}
              className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
            >
              <Image
                width={24}
                height={24}
                src={teamImage}
                alt={`Team member ${index + 1}`}
                className="w-full"
              />
            </div>
          ))}
        </div>
      );
    }
  },
  {
    key: "status" as keyof Barber,
    header: "Status",
    render: (value: unknown) => {
      const status = value as string;
      return (
        <Badge
          size="sm"
          color={
            status === "Active"
              ? "success"
              : status === "Pending"
              ? "warning"
              : "error"
          }
        >
          {status}
        </Badge>
      );
    }
  },
  {
    key: "budget" as keyof Barber,
    header: "Budget"
  }
];

// Define the table data using the interface
const tableData: Barber[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    projectName: "Agency Website",
    team: {
      images: [
        "/images/user/user-22.jpg",
        "/images/user/user-23.jpg",
        "/images/user/user-24.jpg",
      ],
    },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    projectName: "Technology",
    team: {
      images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
    },
    budget: "24.9K",
    status: "Pending",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Zain Geidt",
      role: "Content Writing",
    },
    projectName: "Blog Writing",
    team: {
      images: ["/images/user/user-27.jpg"],
    },
    budget: "12.7K",
    status: "Active",
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      role: "Digital Marketer",
    },
    projectName: "Social Media",
    team: {
      images: [
        "/images/user/user-28.jpg",
        "/images/user/user-29.jpg",
        "/images/user/user-30.jpg",
      ],
    },
    budget: "2.8K",
    status: "Cancel",
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      role: "Front-end Developer",
    },
    projectName: "Website",
    team: {
      images: [
        "/images/user/user-31.jpg",
        "/images/user/user-32.jpg",
        "/images/user/user-33.jpg",
      ],
    },
    budget: "4.5K",
    status: "Active",
  },
];

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Barberos" />
      <div className="space-y-6">
        <GenericTable columns={columns} data={tableData} />
      </div>
    </div>
  );
}
