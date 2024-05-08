"use client";
import { getEvent } from "@/actions/event.actions";
import { Demo } from "@/components/demo";
import FullPageLoader from "@/components/shared/loader";
import { db } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

const EventBookPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data: eventType, isLoading } = useQuery({
    queryKey: ["event", params.id],
    queryFn: async () => getEvent(params.id),
  });

  if (isLoading && !eventType) return <FullPageLoader />;

  if (!eventType) return notFound();
  return (
    <div>
      <Demo eventType={eventType} />
    </div>
  );
};

export default EventBookPage;
