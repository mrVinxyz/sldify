import type { CollapsibleContext, CollapsibleProps } from './collapsible';
import { useCollapsible, createCollapsible, Collapsible } from './collapsible';
import { type CollapsibleContentProps, CollapsibleContent } from './collapsible-content';
import type { CollapsibleControlProps, CollapsibleController } from './collapsible-control';
import { CollapsibleControl } from './collapsible-control';

export type {
	CollapsibleContext,
	CollapsibleProps,
	CollapsibleContentProps,
	CollapsibleControlProps,
	CollapsibleController,
};

export { useCollapsible, createCollapsible, Collapsible, CollapsibleContent, CollapsibleControl };
