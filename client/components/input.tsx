interface Props {
	text: string;
	placeholder: string;
	handleChange: (name: string) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Input = ({ text, placeholder, handleChange, handleSubmit }: Props) => {
	return (
		<form
			className='flex items-center px-6 w-full rounded-lg text-slate-500 shadow-lg shadow-slate-200'
			onSubmit={e => handleSubmit(e)}
		>
			<input
				type='text'
				value={text}
				required
				placeholder={placeholder}
				onChange={e => handleChange(e.target.value)}
				className='py-4 font-semibold text-sm w-full outline-none lg:text-lg'
			/>
		</form>
	);
};
