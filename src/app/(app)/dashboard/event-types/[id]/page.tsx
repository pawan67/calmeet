import EventTypeFormLayout from "@/components/event-type/layout";
import { db } from "@/lib/db";

const EventTypeEdit = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const eventType = await db.eventType.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      title: true,
      isDefault: true,
      active: true,
      color: true,
      durationInMinutes: true,
      link: true,
      description: true,
    },
  });

  if (!eventType) {
    return <div>Event type not found</div>;
  }

  return <EventTypeFormLayout eventType={eventType} id={params.id} />;
};

export default EventTypeEdit;
