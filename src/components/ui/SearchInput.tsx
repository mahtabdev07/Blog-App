import { Input } from "./input";

const SearchInput = ({ search }: { search: string }) => {
  return (
    <Input
      type="search"
      placeholder={search}
      className="nav-input bg-white/30 backdrop-blur-xl placeholder:text-[#CEC9C9] placeholder:text-md font-normal focus:placeholder:text-white text-white text-lg border-2 border-white/40 px-5 pr-21 transition duration-200 caret-white  rounded-xl hover:bg-white/40 focus:bg-white/40"
    />
  );
};

export default SearchInput;
