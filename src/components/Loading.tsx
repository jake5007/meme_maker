import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="flex justify-center">
      <ReactLoading type="bubbles" color="#121212" height={150} width={150} />;
    </div>
  );
};
export default Loading;
