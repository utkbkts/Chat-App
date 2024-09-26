import Left from "../left/Left";
import Right from "../right/Right";

const HomePage = () => {
  return (
    <div className="w-full  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-100 max-w-5xl h-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex h-full">
        <div className="w-1/3 ">
          <Left />
        </div>
        <div className="w-2/3 border-l-2">
          <Right />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
