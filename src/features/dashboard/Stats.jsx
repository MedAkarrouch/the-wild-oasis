import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
function Stats({ numDays, numCabins, bookings, confirmedStays }) {
  // 1.
  const numBookings = bookings.length;
  // 2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  // 3.
  const checkIns = confirmedStays.length;
  // 4.
  const occupancy =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * numCabins);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check Ins"
        value={checkIns}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy Rate"
        value={Math.round(occupancy * 100) + "%"}
        color="yellow"
      />
    </>
  );
}

export default Stats;
