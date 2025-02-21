import Link from "next/link";
import React from "react";

interface BreadcrumbProps {
  pageTitle: string;
  TitleExtraComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
  id?: string;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle, TitleExtraComponent, RightComponent, id }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2
        className="text-xl font-semibold text-gray-800 dark:text-white/90 flex items-center gap-2"
        x-text="pageName"
        id={id}
      >
        {pageTitle}
        {TitleExtraComponent && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {TitleExtraComponent}
          </span>
        )}
      </h2>
      <nav className="flex items-center gap-8">
        {RightComponent && (
          <div className="flex items-center gap-2">
            {RightComponent}
          </div>
        )}
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              href="/"
            >
              Inicio
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li className="text-sm text-gray-800 dark:text-white/90">
            {pageTitle}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
