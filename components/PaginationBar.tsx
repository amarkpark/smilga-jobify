"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight} from "lucide-react";
import { Button } from "./ui/button";

type PaginationBarProps = {
  currentPage: number;
  totalPages: number;
};

// Note: does it REALLY make sense to instantiate this type
// def on every render? Wouldn't a simple type declaration
// suffice?

// function PaginationBar(
//   currentPage: number,
//   totalPages: number
// ) {

type ButtonProps = {
  page: number;
  activeClass: boolean;
};

function PaginationBar({ currentPage, totalPages}: PaginationBarProps) {
  console.log("components/PaginationBar.tsx current total: ",currentPage, totalPages);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get("search") || "",
      jobStatus: searchParams.get("jobStatus") || "",
      page: String(page),
    };
    
    let params = new URLSearchParams(defaultParams);
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const addPageButton = ({ page, activeClass }: ButtonProps) => {
    return (
      <Button
        key={page}
        size="icon"
        variant={activeClass ? "default" : "outline"}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // first page
    pageButtons.push(
      addPageButton({ page: 1, activeClass: currentPage === 1 })
    );

    // dots-1
    if (currentPage > 3) {
      pageButtons.push(
        <Button size="icon" variant="outline" key="dots-1">
          ...
        </Button>
      );
    }

    // one before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          page: currentPage - 1,
          activeClass: false,
        })
      );
    }

    // current page
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(
        addPageButton({
          page: currentPage,
          activeClass: true,
        })
      );
    }

    // one after current page
    if (currentPage !== totalPages && currentPage !== totalPages - 1) {
      pageButtons.push(
        addPageButton({
          page: currentPage + 1,
          activeClass: false,
        })
      );
    }

    // dots-2
    if (currentPage < totalPages - 2) {
      pageButtons.push(
        <Button size="icon" variant="outline" key="dots-2">
          ...
        </Button>
      );
    }

    pageButtons.push(
      addPageButton({
        page: totalPages,
        activeClass: currentPage === totalPages,
      })
    );

    return pageButtons;
  };

  // The utter nonsense below is an example of less than ideal UX.
  // WHY would you add elipsis buttons that don"t expand the list?
  // If you REALLY want the distinction between sections, add an
  // elipsis ICON!
  return (
    <div className="flex gap-x-2">
      {/* prev */}
      <Button
        className="flex items-center gap-x-2 "
        variant="outline"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = totalPages;
          handlePageChange(prevPage);
        }}
      >
        <ChevronLeft />
        prev
      </Button>
      {renderPageButtons()}
      {/* next */}
      <Button
        className="flex items-center gap-x-2 "
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > totalPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
        variant="outline"
      >
        next
        <ChevronRight />
      </Button>
    </div>
  );
};

export default PaginationBar