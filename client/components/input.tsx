interface Props {
	question: string;
	handleChange: (name: string) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Input = ({ question, handleChange, handleSubmit }: Props) => {
	return (
		<form
			className='flex items-center px-6 w-full rounded-lg text-slate-500 shadow-lg shadow-slate-200'
			onSubmit={e => handleSubmit(e)}
		>
			<input
				type='text'
				value={question}
				required
				placeholder='Ask me anything...'
				onChange={e => handleChange(e.target.value)}
				className='py-4 font-semibold text-sm w-full outline-none lg:text-lg'
			/>
		</form>
	);
};
