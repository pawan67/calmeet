const UserUserNamePage = ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  return (
    <div>
      <h1>{params.username}</h1>
    </div>
  );
};

export default UserUserNamePage;
