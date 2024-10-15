import { A, type AnchorProps } from '@solidjs/router';
import type { ButtonProps } from './button';

type ButtonLinkProps = AnchorProps & ButtonProps;

export const ButtonLink = (props: ButtonLinkProps) => {
	return <A {...props} />;
};
