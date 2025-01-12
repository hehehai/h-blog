import { env } from '@/env';
import { OpenPanelComponent } from '@openpanel/nextjs';

export default function OpenPanelGA() {
  if (!env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID) {
    return null;
  }

  return (
    <OpenPanelComponent
      clientId={env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID}
      trackScreenViews={true}
    />
  );
}
