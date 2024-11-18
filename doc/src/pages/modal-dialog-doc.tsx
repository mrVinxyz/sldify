import { Button } from 'pkg';
import { DialogContent } from 'pkg/components/dialog/dialog-content';
import { DialogControl } from 'pkg/components/dialog/dialog-control';
import { DialogTitle } from 'pkg/components/dialog/dialog-title';
import { createModal, ModalDialog, useModalDialog } from 'pkg/components/modal/modal';
import IntroDoc from '../components/intro-doc';
import { Anatomy } from '../components/anatomy';
import { ApiReference, type ApiReferenceProps } from '../components/api-reference';
import { type Example, Examples } from '../components/example';

const anatomy = `<ModalDialog>
  <DialogControl asChild={(props) => 
      <Button {...props}>Open First Modal</Button>
  } />
  <DialogContent>
    <DialogTitle asChild="h2">First Modal</DialogTitle>
    <ModalDialog>
      <DialogControl asChild={(props) => 
          <Button {...props}>Open Second Modal</Button>
      } />
      <DialogContent>
        <DialogTitle asChild="h2">Second Modal</DialogTitle>
        Content
      </DialogContent>
    </ModalDialog>
  </DialogContent>
</ModalDialog>`;

const apiReference: ApiReferenceProps = {
	components: [
		{
			name: 'ModalDialog',
			description:
				'Enhanced Dialog component that implements modal navigation. Inherits all Dialog component functionality while managing a modal stack.',
			props: [
				{
					name: '...DialogProps',
					type: 'DialogProps',
					description: 'Inherits all props from the Dialog component',
				},
			],
		},
	],
};

const examples: Example[] = [
	{
		title: 'Modal Navigation',
		description: {
			text: 'Demonstration of modal navigation with automatic stack management',
		},
		preview: () => {
			const modal1 = createModal();
			const modal2 = createModal();
			return (
				<>
					<ModalDialog ctx={modal1}>
						<DialogControl
							asChild={(props) => (
								<Button
									variant='outline'
									{...props}
								>
									Open First Modal
								</Button>
							)}
						/>
						<DialogContent class='p-6 max-w-4xl w-full bg-white dark:bg-neutral-800 shadow rounded'>
							<div class='space-y-4'>
								<DialogTitle
									asChild='h3'
									class='text-lg font-medium text-gray-900 dark:text-gray-100'
								>
									First Modal
								</DialogTitle>
								<p class='text-gray-500 dark:text-gray-400'>
									Open another modal to see stack navigation in action.
								</p>
								<DialogControl
									ctx={modal2}
									asChild={(props) => (
										<Button
											variant='outline'
											{...props}
										>
											Open Second Modal
										</Button>
									)}
								/>
								<div class='flex justify-between'>
									<ModalDialog ctx={modal2}>
										<DialogContent class='p-6 max-w-2xl w-full bg-white dark:bg-neutral-800 shadow rounded'>
											<div class='space-y-4'>
												<DialogTitle
													asChild='h3'
													class='text-lg font-medium text-gray-900 dark:text-gray-100'
												>
													Second Modal
												</DialogTitle>
												<p class='text-gray-500 dark:text-gray-400'>
													Closing this modal will return to the previous
													one.
												</p>
												<div class='flex justify-end'>
													<DialogControl
														action='close'
														asChild={(props) => (
															<Button
																variant='outline'
																{...props}
															>
																Close
															</Button>
														)}
													/>
												</div>
											</div>
										</DialogContent>
									</ModalDialog>

									<DialogControl
										action='close'
										asChild={(props) => (
											<Button
												variant='outline'
												{...props}
											>
												Close
											</Button>
										)}
									/>
								</div>
							</div>
						</DialogContent>
					</ModalDialog>
				</>
			);
		},
	},
	{
		title: 'Close All Modals',
		description: {
			text: 'Using useModalDialog() hook to access closeAll()',
			highlight: 'closeAll()',
		},
		preview: () => {
			const CloseAllButton = () => {
				const modal = useModalDialog();
				return (
					<Button
						variant='outline'
						onClick={() => modal.closeAll()}
					>
						Close All Modals
					</Button>
				);
			};

			return (
				<ModalDialog>
					<DialogControl
						asChild={(props) => (
							<Button
								variant='outline'
								{...props}
							>
								Start Modal Stack
							</Button>
						)}
					/>
					<DialogContent class='p-6 max-w-2xl w-full bg-white dark:bg-neutral-800 shadow rounded'>
						<div class='space-y-4'>
							<DialogTitle
								asChild='h3'
								class='text-lg font-medium text-gray-900 dark:text-gray-100'
							>
								Modal Stack Demo
							</DialogTitle>
							<p class='text-gray-500 dark:text-gray-400'>
								Use useModalDialog() hook to access closeAll functionality.
							</p>
							<div class='flex justify-between'>
								<ModalDialog>
									<DialogControl
										asChild={(props) => (
											<Button
												variant='outline'
												{...props}
											>
												Open Another Modal
											</Button>
										)}
									/>
									<DialogContent class='p-6 max-w-2xl w-full bg-white dark:bg-neutral-800 shadow rounded'>
										<div class='space-y-4'>
											<DialogTitle
												asChild='h3'
												class='text-lg font-medium text-gray-900 dark:text-gray-100'
											>
												Nested Modal
											</DialogTitle>
											<div class='flex justify-end space-x-4'>
												<CloseAllButton />
												<DialogControl
													action='close'
													asChild={(props) => (
														<Button
															variant='outline'
															{...props}
														>
															Close
														</Button>
													)}
												/>
											</div>
										</div>
									</DialogContent>
								</ModalDialog>
								<DialogControl
									action='close'
									asChild={(props) => (
										<Button
											variant='outline'
											{...props}
										>
											Close
										</Button>
									)}
								/>
							</div>
						</div>
					</DialogContent>
				</ModalDialog>
			);
		},
	},
];

const ModalDialogDoc = () => {
	return (
		<div class='py-12 space-y-8'>
			<IntroDoc
				component='ModalDialog'
				description='An enhanced Dialog component that implements modal navigation with automatic stack management. Built on top of Dialog, it provides seamless modal-to-modal navigation while maintaining all Dialog features.'
			/>
			<Anatomy>{anatomy}</Anatomy>
			<ApiReference {...apiReference} />
			<div class='text-sm text-gray-500 dark:text-gray-400 mt-4'>
				Note: ModalDialog inherits all accessibility features and keyboard interactions from
				the Dialog component.
			</div>
			<Examples examples={examples} />
		</div>
	);
};

export default ModalDialogDoc;
