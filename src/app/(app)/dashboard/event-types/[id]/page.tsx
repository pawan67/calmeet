const EventTypeEdit = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  return (
    <div>
      <h1>Edit Event Type {params.id}</h1>
    </div>
  );
};

export default EventTypeEdit;
