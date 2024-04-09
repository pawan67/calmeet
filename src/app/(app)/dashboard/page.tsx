import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

const Dashboard = () => {
  return (
    <div className=" w-full">
      <div className=" hidden  md:flex w-full justify-between">
        <div>
          <h3 className=" font-bold text-xl">Event Types</h3>
          <p className=" text-muted-foreground">
            Create events to share for people to book on your calendar.
          </p>
        </div>
        <div>
          <Button size="sm">
            <IconPlus className=" mr-1" size={20} />
            New
          </Button>
        </div>
      </div>
      dsfdsfds
    </div>
  );
};

export default Dashboard;
