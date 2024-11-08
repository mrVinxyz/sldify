import { cva } from 'class-variance-authority';

const buttonVariants = cva(
	'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 btn',
	{
		variants: {
			variant: {
				solid: 'border border-transparent',
				outline: 'border',
				dotted: 'border-2 border-dotted',
				ghost: '',
				soft: 'border-transparent',
			},
			color: {
				blue: '',
				grayish: '',
				white: '',
				black: '',
				green: '',
				red: '',
				yellow: '',
				orange: '',
			},
			size: {
				'rec-sm': 'py-1.5 px-3 text-sm',
				'rec-md': 'py-2 px-4 text-sm',
				'rec-lg': 'py-2.5 px-5 text-base',
				'sqr-sm': 'p-1.5 text-sm',
				'sqr-md': 'p-2 text-sm',
				'sqr-lg': 'p-2.5 text-base',
			},
			loading: {
				left: 'opacity-80 cursor-wait',
				right: 'opacity-80 cursor-wait',
			},
			hasIcon: {
				true: 'gap-2',
				false: '',
			},
		},
		compoundVariants: [
			// Solid Variants
			{
				variant: 'solid',
				color: 'blue',
				class: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800',
			},
			{
				variant: 'solid',
				color: 'grayish',
				class: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
			},
			{
				variant: 'solid',
				color: 'black',
				class: 'bg-gray-800 text-white hover:bg-gray-900 focus-visible:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700',
			},
			{
				variant: 'solid',
				color: 'white',
				class: 'bg-white text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
			},
			{
				variant: 'solid',
				color: 'green',
				class: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-300 dark:bg-green-700 dark:hover:bg-green-800',
			},
			{
				variant: 'solid',
				color: 'red',
				class: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800',
			},
			{
				variant: 'solid',
				color: 'yellow',
				class: 'bg-yellow-600 text-white hover:bg-yellow-700 focus-visible:ring-yellow-300 dark:bg-yellow-700 dark:hover:bg-yellow-800',
			},
			{
				variant: 'solid',
				color: 'orange',
				class: 'bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-300 dark:bg-orange-700 dark:hover:bg-orange-800',
			},
			// outline Variants
			{
				variant: 'outline',
				color: 'blue',
				class: 'border-blue-700 text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-300 dark:border-blue-600 dark:text-blue-600',
			},
			{
				variant: 'outline',
				color: 'grayish',
				class: 'border-gray-200 text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-100 dark:border-gray-600 dark:text-gray-400',
			},
			{
				variant: 'outline',
				color: 'black',
				class: 'border-gray-800 text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-300 dark:border-gray-700 dark:text-gray-400',
			},
			{
				variant: 'outline',
				color: 'white',
				class: 'border-gray-300 text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-100 dark:border-gray-600 dark:text-white',
			},
			{
				variant: 'outline',
				color: 'green',
				class: 'border-green-700 text-green-700 hover:bg-green-50 focus-visible:ring-green-300 dark:border-green-600 dark:text-green-600',
			},
			{
				variant: 'outline',
				color: 'red',
				class: 'border-red-700 text-red-700 hover:bg-red-50 focus-visible:ring-red-300 dark:border-red-600 dark:text-red-600',
			},
			{
				variant: 'outline',
				color: 'yellow',
				class: 'border-yellow-400 text-yellow-400 hover:bg-yellow-50 focus-visible:ring-yellow-300 dark:border-yellow-600 dark:text-yellow-600',
			},
			{
				variant: 'outline',
				color: 'orange',
				class: 'border-orange-700 text-orange-700 hover:bg-orange-50 focus-visible:ring-orange-300 dark:border-orange-600 dark:text-orange-600',
			},
			// Dotted Variants
			{
				variant: 'dotted',
				color: 'blue',
				class: 'border-blue-700 text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-300 dark:border-blue-600 dark:text-blue-600',
			},
			{
				variant: 'dotted',
				color: 'grayish',
				class: 'border-gray-200 text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-100 dark:border-gray-600 dark:text-gray-400',
			},
			{
				variant: 'dotted',
				color: 'black',
				class: 'border-gray-800 text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-300 dark:border-gray-700 dark:text-gray-400',
			},
			{
				variant: 'dotted',
				color: 'white',
				class: 'border-gray-300 text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-100 dark:border-gray-600 dark:text-white',
			},
			{
				variant: 'dotted',
				color: 'green',
				class: 'border-green-700 text-green-700 hover:bg-green-50 focus-visible:ring-green-300 dark:border-green-600 dark:text-green-600',
			},
			{
				variant: 'dotted',
				color: 'red',
				class: 'border-red-700 text-red-700 hover:bg-red-50 focus-visible:ring-red-300 dark:border-red-600 dark:text-red-600',
			},
			{
				variant: 'dotted',
				color: 'yellow',
				class: 'border-yellow-400 text-yellow-400 hover:bg-yellow-50 focus-visible:ring-yellow-300 dark:border-yellow-600 dark:text-yellow-600',
			},
			{
				variant: 'dotted',
				color: 'orange',
				class: 'border-orange-700 text-orange-700 hover:bg-orange-50 focus-visible:ring-orange-300 dark:border-orange-600 dark:text-orange-600',
			},
			// Ghost Variants
			{
				variant: 'ghost',
				color: 'blue',
				class: 'text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-300 dark:text-blue-500 dark:hover:bg-blue-900/20',
			},
			{
				variant: 'ghost',
				color: 'grayish',
				class: 'text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-200 dark:text-gray-300 dark:hover:bg-gray-800/30',
			},
			{
				variant: 'ghost',
				color: 'black',
				class: 'text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-300 dark:text-gray-300 dark:hover:bg-gray-800/30',
			},
			{
				variant: 'ghost',
				color: 'white',
				class: 'text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-200 dark:text-white dark:hover:bg-gray-800/30',
			},
			{
				variant: 'ghost',
				color: 'green',
				class: 'text-green-700 hover:bg-green-50 focus-visible:ring-green-300 dark:text-green-500 dark:hover:bg-green-900/20',
			},
			{
				variant: 'ghost',
				color: 'red',
				class: 'text-red-700 hover:bg-red-50 focus-visible:ring-red-300 dark:text-red-500 dark:hover:bg-red-900/20',
			},
			{
				variant: 'ghost',
				color: 'yellow',
				class: 'text-yellow-600 hover:bg-yellow-50 focus-visible:ring-yellow-300 dark:text-yellow-500 dark:hover:bg-yellow-900/20',
			},
			{
				variant: 'ghost',
				color: 'orange',
				class: 'text-orange-700 hover:bg-orange-50 focus-visible:ring-orange-300 dark:text-orange-500 dark:hover:bg-orange-900/20',
			},
			// Soft Variants
			{
				variant: 'soft',
				color: 'blue',
				class: 'bg-blue-100 text-blue-700 hover:bg-blue-200 focus-visible:ring-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900',
			},
			{
				variant: 'soft',
				color: 'grayish',
				class: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus-visible:ring-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900',
			},
			{
				variant: 'soft',
				color: 'black',
				class: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900',
			},
			{
				variant: 'soft',
				color: 'white',
				class: 'bg-white/80 text-gray-900 hover:bg-white focus-visible:ring-gray-200 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-900',
			},
			{
				variant: 'soft',
				color: 'green',
				class: 'bg-green-100 text-green-700 hover:bg-green-200 focus-visible:ring-green-200 dark:bg-green-950 dark:text-green-300 dark:hover:bg-green-900',
			},
			{
				variant: 'soft',
				color: 'red',
				class: 'bg-red-100 text-red-700 hover:bg-red-200 focus-visible:ring-red-200 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900',
			},
			{
				variant: 'soft',
				color: 'yellow',
				class: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus-visible:ring-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:hover:bg-yellow-900',
			},
			{
				variant: 'soft',
				color: 'orange',
				class: 'bg-orange-100 text-orange-700 hover:bg-orange-200 focus-visible:ring-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:hover:bg-orange-900',
			},
		],
		defaultVariants: {
			variant: 'ghost',
			color: 'white',
			size: 'rec-md',
		},
	},
);

export default buttonVariants;
