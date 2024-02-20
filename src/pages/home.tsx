// import MyEditor from "@/components/editor";
import MyEditor from "@/components/editor";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <h2 className="self-center text-2xl font-bold text-slate-600 mb-8">
        Editor
      </h2>
      <MyEditor />
    </div>
  );
};

export default Home;
