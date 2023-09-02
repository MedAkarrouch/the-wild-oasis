import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const { isLoading: isChekingIn, mutate: checkin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        isPaid: true,
        status: "checked-in",
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryclient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },
    onError: () => toast.error("There was an error while checking in"),
  });
  return { isChekingIn, checkin };
}
