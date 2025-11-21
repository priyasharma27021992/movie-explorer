interface SearchBoxProps {
    searchStr?: string;
    setSearchStr: (searchStr: string) => void;
}

export const SearchBox = ({ searchStr, setSearchStr }: SearchBoxProps) => {
    return (
        <div className="max-w-sm w-full mx-auto my-4">
            <input
                type="text"
                placeholder="Search"
                value={searchStr}
                onChange={(e) => {
                    setSearchStr(e.target.value);
                }}
                name="search"
                className="text-black rounded-full p-2 w-sm ring"
            />
        </div>
    );
};
