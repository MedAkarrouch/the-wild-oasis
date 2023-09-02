import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivities() {
  const { isLoading, data: activities } = useQuery({
    queryKey: ["today-activities"],
    queryFn: getStaysTodayActivity,
  });
  return { isLoading, activities };
}
