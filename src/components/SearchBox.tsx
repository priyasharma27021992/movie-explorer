interface SearchBoxProps {
	searchStr?: string;
	setSearchStr: (searchStr: string) => void;
}

export const SearchBox = ({ searchStr, setSearchStr }: SearchBoxProps) => {
	return (
		<input
			type='text'
			placeholder='Search'
			value={searchStr}
			onChange={(e) => {
				setSearchStr(e.target.value);
			}}
			name='search'
			className='text-black'
		/>
	);
};
