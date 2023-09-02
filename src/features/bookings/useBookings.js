import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  // FILTER
  const currentFilter = searchParams.get("status");
  const filter =
    !currentFilter || currentFilter === "all"
      ? null
      : {
          field: "status",
          value: currentFilter,
        };
  // SORT
  const currentSortBy = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = currentSortBy.split("-");
  const sortBy = { field, direction };
  // PAGE
  const page = Number(searchParams.get("page")) || 1;

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", currentFilter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Prefetching
  if (count) {
    const numPages = Math.ceil(count / PAGE_SIZE);
    page < numPages &&
      queryClient.prefetchQuery({
        queryKey: ["bookings", currentFilter, sortBy, page + 1],
        queryFn: () => getBookings({ filter, sortBy, page }),
      });

    page > 1 &&
      queryClient.prefetchQuery({
        queryKey: ["bookings", currentFilter, sortBy, page - 1],
        queryFn: () => getBookings({ filter, sortBy, page }),
      });
  }

  return { isLoading, bookings, count, error };
}
