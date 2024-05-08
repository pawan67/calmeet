const NoData = ({ message = "No data available" }: { message?: string }) => {
  return (
    <div className=" flex justify-center  flex-col items-center">
      <img src="/images/no-data.svg" alt="No data" className=" max-w-sm " />

      <h1>
        <span className=" text-2xl text-gray-12 font-semibold ">{message}</span>
      </h1>
    </div>
  );
};

export default NoData;
