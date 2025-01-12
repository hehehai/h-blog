import dynamic from 'next/dynamic';

export const ExampleMenu = dynamic(() => import('./menu'));
