import { createModal, Modal, ModalContent, ModalControl } from 'core/modal';
import { DocumentationPage } from '../document';

export default () => {
	const apiReference = [
		{
			name: 'Modal',
			props: [
				{
					name: 'ctx',
					description: 'Custom context for controlling modal state (optional).',
				},
				{
					name: 'size',
					description: 'Defines the modal size (`sm`, `md`, `lg`).'
				},
				{
					name: 'position',
					description: 'Defines the modal position, default is `middle`.',
				},
			],
		},
		{
			name: 'ModalControl',
			props: [
				{
					name: 'action',
					description: 'Defines the action, either `open` or `close` the modal.',
				},
				{
					name: 'ctx',
					description: 'Specifies the context for the modal control (optional).',
				},
			],
		},
		{
			name: 'ModalContent',
			props: [
				{ name: 'size', description: 'Size of the content inside the modal.' },
				{ name: 'position', description: 'Position of the content inside the modal.' },
			],
		},
	];

	const ModalWithCustomContext = () => {
		const customModal = createModal();

		return (
			<>
				<ModalControl
					action={'open'}
					ctx={customModal}
				>
					Open Modal
				</ModalControl>

				<Modal ctx={customModal}>
					<ModalContent
						size='md'
						position='middle'
						className='p-4 bg-white rounded-lg'
					>
						<div>
							<h2 class='text-lg font-semibold'>Modal Title</h2>
							<p>This is the content inside the modal!</p>
							<ModalControl
								action={'close'}
							>
								Close Modal
							</ModalControl>
						</div>
					</ModalContent>
				</Modal>
			</>
		);
	};

	const ModalDirect = () => {
		return (
			<Modal>
				<ModalControl
					action={'open'}
				>
					Open Modal
				</ModalControl>
				<ModalContent
					size='md'
					position='middle'
					className='p-4 bg-white rounded-lg'
				>
					<div>
						<h2 class='text-lg font-semibold'>Modal Title</h2>
						<p>This is the content inside the modal!</p>
						<ModalControl
							action={'close'}
						>
							Close Modal
						</ModalControl>
					</div>
				</ModalContent>
			</Modal>
		);
	};

	const ModalWithCustomControls = () => {
		return (
			<Modal>
				<ModalControl.Open
					name={'Open'}
				/>

				<ModalContent
					size='md'
					position='middle'
					className='p-4 bg-white rounded-lg'
				>
					<div>
						<h2 class='text-lg font-semibold'>Modal Title</h2>
						<p>This is the content inside the modal!</p>
						<ModalControl.Close
							name={'Close'}
						/>
					</div>
				</ModalContent>
			</Modal>
		);
	};

	const MultipleModals = () => {
		const customModal = createModal();

		return (
			<>
				<Modal>
					<ModalControl.Open
						name={'Open'}
					/>

					<ModalContent
						size='md'
						position='middle'
						className='p-4 bg-white rounded-lg'
					>
						<div>
							<h2 class='text-lg font-semibold'>Modal Title</h2>
							<p>This is the content inside the modal!</p>
							<ModalControl.Close name={'Close'} />

							<ModalControl.Open
								name={'Open Nested'}
								ctx={customModal}
							/>
						</div>
					</ModalContent>
				</Modal>

				<Modal ctx={customModal}>
					<ModalContent
						className='p-4 bg-white rounded-lg'
					>
						<p>This is an nested modal</p>
						<ModalControl.Close
							name={'Close Nested'}
						/>
					</ModalContent>
				</Modal>
			</>
		);
	};

	const usageComponents = [
		{
			title: 'Modal with Custom Context',
			component: <ModalWithCustomContext />,
			code: `
const customModal = createModal();

<ModalControl action="open" ctx={customModal}>Open Modal</ModalControl>
<Modal ctx={customModal}>
  <ModalContent size="md" position="middle">
    <div>
      <h2 class="text-lg font-semibold">Modal Title</h2>
      <p>This is the content inside the modal!</p>
      <ModalControl action="close">Close Modal</ModalControl>
    </div>
  </ModalContent>
</Modal>
      `,
		},
		{
			title: 'Direct Modal',
			component: <ModalDirect />,
			code: `
<Modal>
  <ModalControl action="open">Open Modal</ModalControl>
  <ModalContent size="md" position="middle">
    <div>
      <h2 class="text-lg font-semibold">Modal Title</h2>
      <p>This is the content inside the modal!</p>
      <ModalControl action="close">Close Modal</ModalControl>
    </div>
  </ModalContent>
</Modal>
      `,
		},
		{
			title: 'Modal with Custom Controls',
			component: <ModalWithCustomControls />,
			code: `
<Modal>
  <ModalControl.Open name="Open" />
  <ModalContent size="md" position="middle">
    <div>
      <h2 class="text-lg font-semibold">Modal Title</h2>
      <p>This is the content inside the modal!</p>
      <ModalControl.Close name="Close" />
    </div>
  </ModalContent>
</Modal>
      `,
		},
		{
			title: 'Multiple Modals',
			component: <MultipleModals />,
			code: `
const customModal = createModal();

<Modal>
  <ModalControl.Open name="Open" />
  <ModalContent size="md" position="middle">
    <div>
      <h2 class="text-lg font-semibold">Modal Title</h2>
      <p>This is the content inside the modal!</p>
      <ModalControl.Close name="Close" />
      <ModalControl.Open name="Open Nested" ctx={customModal} />
    </div>
  </ModalContent>
</Modal>

<Modal ctx={customModal}>
  <ModalContent>
    <p>This is a nested modal!</p>
    <ModalControl.Close name="Close Nested" />
  </ModalContent>
</Modal>
      `,
		},
	];

	return (
		<DocumentationPage
			title='Modal'
			description=''
			apiReference={apiReference}
			usage={usageComponents}
		/>
	);
};
