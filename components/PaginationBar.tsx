"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "./ui/button";

type PaginationBarProps = {
  currentPage: number;
  totalPages: number;
};

// Note: does it REALLY make sense to instantiate this type
// def on every render? Wouldn"t a simple type declaration
// suffice?

// function PaginationBar(
//   currentPage: number,
//   totalPages: number
// ) {

function PaginationBar({
  currentPage,
  totalPages
}: PaginationBarProps) {
  console.log("components/PaginationBar.tsx current total: ",currentPage, totalPages);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get("search") || "",
      jobStatus: searchParams.get("jobStatus") || "",
      page: String(page),
    };
    
    let params = new URLSearchParams(defaultParams);
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-x-2">
      {pageButtons.map((page) => {
        return (
          <Button
            key={page}
            size="icon"
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        );
      })}
    </div>
  );
};

export default PaginationBar