import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const {
    isLoading: isDeleting,
    mutate: deleteBooking,
    error,
  } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("There was an error while deleting"),
  });
  return { isDeleting, deleteBooking, error };
}
