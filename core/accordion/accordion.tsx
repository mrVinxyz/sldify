import { createContext, createEffect, createSignal, Show, useContext } from 'solid-js';
import type { Child, ClassNames, OptComponentCtx } from '../types';
import { Button } from '../button';
import { randomHash } from '../utils';

type AccordionState = 'open' | 'close' | 'waiting';

export type AccordionContext = {
	id: Readonly<string>;
	state: () => AccordionState;
	setState: (state: AccordionState) => void;
	toggle: () => void;
};

const accordionContext = createContext<AccordionContext>();

export function createAccordion(id: string = randomHash()): AccordionContext {
	const [state, setState] = createSignal<AccordionState>('close');

	const toggle = () => (state() === 'close' ? setState('open') : setState('close'));

	createEffect(() => {
		console.log('state', state());
	});

	return {
		id,
		state,
		setState,
		toggle,
	};
}

export function useAccordion(): AccordionContext {
	const ctx = useContext(accordionContext);
	if (!ctx) throw new Error('useAccordion must be used within a Accordion component');
	return ctx;
}

export type AccordionProps = OptComponentCtx<AccordionContext> & Child & ClassNames;

export const Accordion = (props: AccordionProps) => {
	const ctx = props.ctx || createAccordion();
	return <accordionContext.Provider value={ctx}>{props.children}</accordionContext.Provider>;
};

export const AccordionControl = (props: { text: string; onPress?: (e: Event) => void }) => {
	const ctx = useAccordion();
	return (
		<Button
			className='border-b text-start w-full'
			{...props}
			id={'collapsible-control'.concat(ctx.id)}
			onPress={(e: Event) => {
				props.onPress?.(e);
				ctx.toggle();
			}}
		>
			<span class='flex items-center'>
				<svg
					class='w-5 h-5 me-2 shrink-0'
					fill='currentColor'
					viewBox='0 0 20 20'
					xmlns='http://www.w3.org/2000/svg'
				>
					<title> </title>
					<path
						fill-rule='evenodd'
						d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
						clip-rule='evenodd'
					/>
				</svg>
				{props.text}
			</span>
		</Button>
	);
};

export const AccordionContent = (props: Child & ClassNames) => {
	const ctx = useAccordion();
	return (
		<Show when={ctx.state() === 'open'}>
			<div
				id='accordion-open-body-1'
				aria-labelledby='accordion-open-heading-1'
			>
				<div class={props.className || ''}>{props.children}</div>
			</div>
		</Show>
	);
};
