const CheckIcon = (props: { class: string }) => (
	<svg
		class={props.class}
		aria-hidden='true'
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path
			stroke='currentColor'
			stroke-linecap='round'
			stroke-linejoin='round'
			stroke-width='2'
			d='M5 11.917 9.724 16.5 19 7.5'
		/>
	</svg>
);

const ExclamationIcon = (props: { class: string }) => (
	<svg
		class={props.class}
		aria-hidden='true'
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		fill='none'
		viewBox='0 0 24 24'
	>
		<path
			stroke='currentColor'
			stroke-linecap='round'
			stroke-linejoin='round'
			stroke-width='2'
			d='M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
		/>
	</svg>
);

export { CheckIcon, ExclamationIcon }
