import { type FC, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { PulseLoader } from "react-spinners";

export const SearchInput: FC = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="form-control relative">
      <input
        type="text"
        placeholder="Search"
        className="input-bordered input bg-white pl-12 pr-14"
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <div className="absolute bottom-0 left-0 top-0 flex w-14 items-center justify-center">
        <BsSearch className="h-5 w-5" />
      </div>
      <div className="absolute bottom-0 right-0 top-0 flex w-16 items-center justify-center">
        <PulseLoader
          loading={Boolean(search.length)}
          size={8}
          color={"#2b2f38"}
        />
      </div>
    </div>
  );
};
