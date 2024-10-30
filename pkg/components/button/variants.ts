import { cva } from 'class-variance-authority';

const buttonVariants = cva(
	'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60',
	{
		variants: {
			variant: {
				solid: 'border-2 border-transparent',
				outlined: 'border-2',
				dotted: 'border-2 border-dotted',
			},
			color: {
				primary: '',
				secondary: '',
				dark: '',
				light: '',
				green: '',
				red: '',
				yellow: '',
				orange: '',
			},
			size: {
				'rec-xs': 'py-1.5 px-3 text-xs',
				'rec-sm': 'py-1.5 px-3 text-sm',
				'rec-md': 'py-2.5 px-5 text-sm',
				'rec-lg': 'py-2.5 px-5 text-base',
				'rec-xl': 'py-3.5 px-7 text-base',
				'sqr-xs': 'p-1.5 text-xs',
				'sqr-sm': 'p-1.5 text-sm',
				'sqr-md': 'p-2.5 text-sm',
				'sqr-lg': 'p-2.5 text-base',
				'sqr-xl': 'p-3.5 text-base',
			},
			rounded: {
				none: 'rounded-none',
				sm: 'rounded-sm',
				md: 'rounded-md',
				lg: 'rounded-lg',
				full: 'rounded-full',
			},
			loading: {
				true: 'opacity-80 cursor-wait',
				false: '',
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
				color: 'primary',
				class: 'bg-blue-700 text-white hover:bg-blue-800 focus-visible:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700',
			},
			{
				variant: 'solid',
				color: 'secondary',
				class: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
			},
			{
				variant: 'solid',
				color: 'dark',
				class: 'bg-gray-800 text-white hover:bg-gray-900 focus-visible:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700',
			},
			{
				variant: 'solid',
				color: 'light',
				class: 'bg-white text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
			},
			{
				variant: 'solid',
				color: 'green',
				class: 'bg-green-700 text-white hover:bg-green-800 focus-visible:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700',
			},
			{
				variant: 'solid',
				color: 'red',
				class: 'bg-red-700 text-white hover:bg-red-800 focus-visible:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700',
			},
			{
				variant: 'solid',
				color: 'yellow',
				class: 'bg-yellow-400 text-white hover:bg-yellow-500 focus-visible:ring-yellow-300',
			},
			{
				variant: 'solid',
				color: 'orange',
				class: 'bg-orange-700 text-white hover:bg-orange-800 focus-visible:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700',
			},
			// Outlined Variants
			{
				variant: 'outlined',
				color: 'primary',
				class: 'border-blue-700 text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-300 dark:border-blue-600 dark:text-blue-600',
			},
			{
				variant: 'outlined',
				color: 'secondary',
				class: 'border-gray-200 text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-100 dark:border-gray-600 dark:text-gray-400',
			},
			{
				variant: 'outlined',
				color: 'dark',
				class: 'border-gray-800 text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-300 dark:border-gray-700 dark:text-gray-400',
			},
			{
				variant: 'outlined',
				color: 'light',
				class: 'border-gray-300 text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-100 dark:border-gray-600 dark:text-white',
			},
			{
				variant: 'outlined',
				color: 'green',
				class: 'border-green-700 text-green-700 hover:bg-green-50 focus-visible:ring-green-300 dark:border-green-600 dark:text-green-600',
			},
			{
				variant: 'outlined',
				color: 'red',
				class: 'border-red-700 text-red-700 hover:bg-red-50 focus-visible:ring-red-300 dark:border-red-600 dark:text-red-600',
			},
			{
				variant: 'outlined',
				color: 'yellow',
				class: 'border-yellow-400 text-yellow-400 hover:bg-yellow-50 focus-visible:ring-yellow-300',
			},
			{
				variant: 'outlined',
				color: 'orange',
				class: 'border-orange-700 text-orange-700 hover:bg-orange-50 focus-visible:ring-orange-300 dark:border-orange-600 dark:text-orange-600',
			},
			// Dotted Variants
			{
				variant: 'dotted',
				color: 'primary',
				class: 'border-blue-700 text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-300 dark:border-blue-600 dark:text-blue-600',
			},
			{
				variant: 'dotted',
				color: 'secondary',
				class: 'border-gray-200 text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-100 dark:border-gray-600 dark:text-gray-400',
			},
			{
				variant: 'dotted',
				color: 'dark',
				class: 'border-gray-800 text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-300 dark:border-gray-700 dark:text-gray-400',
			},
			{
				variant: 'dotted',
				color: 'light',
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
				class: 'border-yellow-400 text-yellow-400 hover:bg-yellow-50 focus-visible:ring-yellow-300',
			},
			{
				variant: 'dotted',
				color: 'orange',
				class: 'border-orange-700 text-orange-700 hover:bg-orange-50 focus-visible:ring-orange-300 dark:border-orange-600 dark:text-orange-600',
			},
		],
		defaultVariants: {
			variant: 'solid',
			color: 'primary',
			size: 'rec-md',
			rounded: 'md',
			loading: false,
		},
	},
);

export default buttonVariants;
