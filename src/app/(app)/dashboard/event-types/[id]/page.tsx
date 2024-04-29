import EventTypeFormLayout from "@/components/event-type/layout";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const EventTypeEdit = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  return <EventTypeFormLayout id={params.id} />;
};

export default EventTypeEdit;
