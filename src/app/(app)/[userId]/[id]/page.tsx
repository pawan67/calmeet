import EventBookingComponent from "@/components/bookings/EventBookingComponent";

const EventBookingPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  return (
    <div>
      <EventBookingComponent id={params.id} />
    </div>
  );
};

export default EventBookingPage;
