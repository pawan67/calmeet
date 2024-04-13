import { redirect } from "next/navigation";

const Dashboard = () => {
  return redirect("/dashboard/event-types");
};

export default Dashboard;
