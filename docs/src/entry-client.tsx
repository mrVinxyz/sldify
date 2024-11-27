import { mount, StartClient } from '@solidjs/start/client';

// biome-ignore lint/style/noNonNullAssertion: <initial setup>
mount(() => <StartClient />, document.getElementById('app')!);
