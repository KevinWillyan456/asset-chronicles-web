import { cn } from '@/lib/utils'

export type IconName =
  | 'alert'
  | 'armchair'
  | 'assets'
  | 'bell'
  | 'bolt'
  | 'building'
  | 'calendar'
  | 'car'
  | 'check'
  | 'chevronDown'
  | 'chevronLeft'
  | 'chevronRight'
  | 'chip'
  | 'close'
  | 'dashboard'
  | 'download'
  | 'edit'
  | 'external'
  | 'eye'
  | 'filter'
  | 'gear'
  | 'history'
  | 'layers'
  | 'logout'
  | 'menu'
  | 'moon'
  | 'more'
  | 'movements'
  | 'pin'
  | 'plus'
  | 'qr'
  | 'refresh'
  | 'scan'
  | 'search'
  | 'settings'
  | 'shield'
  | 'sparkle'
  | 'transfer'
  | 'trash'
  | 'user'
  | 'wallet'

const paths: Record<IconName, React.ReactNode> = {
  alert: (
    <>
      <path d="M12 4.5 3.5 19.5h17z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </>
  ),
  armchair: (
    <>
      <path d="M6 11V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" />
      <path d="M4.5 11a2 2 0 0 1 2 2v3h11v-3a2 2 0 0 1 2-2 2 2 0 0 0-2 2v4H6.5v-4a2 2 0 0 0-2-2z" />
      <path d="M7 18v2" />
      <path d="M17 18v2" />
    </>
  ),
  assets: (
    <>
      <path d="M3.5 7.8 12 3.2l8.5 4.6v8.4L12 20.8l-8.5-4.6z" />
      <path d="M3.5 7.8 12 12.4l8.5-4.6" />
      <path d="M12 12.4v8.4" />
    </>
  ),
  bell: (
    <>
      <path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6" />
      <path d="M10.5 20a2 2 0 0 0 3 0" />
    </>
  ),
  bolt: <path d="M13.5 3 5 13.5h5L10.5 21 19 10.5h-5z" />,
  building: (
    <>
      <rect height="17" rx="2" width="14" x="5" y="3.5" />
      <path d="M9.5 8h1.5M13 8h1.5M9.5 12h1.5M13 12h1.5" />
      <path d="M10 20.5v-3.5h4v3.5" />
    </>
  ),
  calendar: (
    <>
      <rect height="15.5" rx="2" width="17" x="3.5" y="5" />
      <path d="M3.5 10h17" />
      <path d="M8 3.5v3M16 3.5v3" />
    </>
  ),
  car: (
    <>
      <path d="M5 16.5v2.2a.8.8 0 0 1-.8.8H3.8a.8.8 0 0 1-.8-.8v-2.2" />
      <path d="M21 16.5v2.2a.8.8 0 0 1-.8.8h-.4a.8.8 0 0 1-.8-.8v-2.2" />
      <path d="M3 16.5v-3.2l1.9-4.3A1.6 1.6 0 0 1 6.4 8h11.2a1.6 1.6 0 0 1 1.5 1l1.9 4.3v3.2z" />
      <path d="M6.5 13h11" />
      <circle cx="7" cy="16.5" r="1.4" />
      <circle cx="17" cy="16.5" r="1.4" />
    </>
  ),
  check: <path d="m5 13 4.5 4.5L19 7" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronLeft: <path d="m15 6-6 6 6 6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  chip: (
    <>
      <rect height="10" rx="2" width="10" x="7" y="7" />
      <path d="M11 3v2M13 3v2M11 19v2M13 19v2M3 11h2M3 13h2M19 11h2M19 13h2" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  dashboard: (
    <>
      <rect height="7.5" rx="2" width="7.5" x="3" y="3" />
      <rect height="7.5" rx="2" width="7.5" x="13.5" y="3" />
      <rect height="7.5" rx="2" width="7.5" x="3" y="13.5" />
      <rect height="7.5" rx="2" width="7.5" x="13.5" y="13.5" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v10" />
      <path d="m8 10.5 4 4 4-4" />
      <path d="M4.5 18.5h15" />
    </>
  ),
  edit: (
    <>
      <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3z" />
      <path d="m14.5 5.5 3 3" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4l-8.5 8.5" />
      <path d="M19 14.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4.5" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  filter: (
    <>
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.6l1.2 2.2 2.5-.4.4 2.5 2.2 1.2-1.4 2.1 1.4 2.1-2.2 1.2-.4 2.5-2.5-.4L12 20.4l-1.2-2.2-2.5.4-.4-2.5-2.2-1.2 1.4-2.1-1.4-2.1 2.2-1.2.4-2.5 2.5.4z" />
    </>
  ),
  history: (
    <>
      <path d="M3.8 12a8.2 8.2 0 1 0 2.6-6" />
      <path d="M3.5 4.2V8h3.8" />
      <path d="M12 8v4.4l3 1.8" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5z" />
      <path d="m4 12 8 4.3 8-4.3" />
      <path d="m4 16.5 8 4.3 8-4.3" />
    </>
  ),
  logout: (
    <>
      <path d="M15 5.5V4a1.5 1.5 0 0 0-1.5-1.5h-7A1.5 1.5 0 0 0 5 4v16a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 15 20v-1.5" />
      <path d="M9.5 12H21" />
      <path d="m18 9 3 3-3 3" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5z" />,
  more: (
    <>
      <circle cx="5.5" cy="12" r="1.4" />
      <circle cx="12" cy="12" r="1.4" />
      <circle cx="18.5" cy="12" r="1.4" />
    </>
  ),
  movements: (
    <>
      <path d="M4 8h13l-3-3" />
      <path d="M20 16H7l3 3" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0c0 5.4 6.5 11 6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  qr: (
    <>
      <rect height="6.5" rx="1.6" width="6.5" x="3" y="3" />
      <rect height="6.5" rx="1.6" width="6.5" x="14.5" y="3" />
      <rect height="6.5" rx="1.6" width="6.5" x="3" y="14.5" />
      <path d="M14.5 14.5h3v3h-3z" />
      <path d="M21 14.5v6.5h-6.5" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14-4.5L4 9" />
      <path d="M4 4.5V9h4.5" />
      <path d="M4 13a8 8 0 0 0 14 4.5L20 15" />
      <path d="M20 19.5V15h-4.5" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V6a2 2 0 0 1 2-2h2" />
      <path d="M16 4h2a2 2 0 0 1 2 2v2" />
      <path d="M20 16v2a2 2 0 0 1-2 2h-2" />
      <path d="M8 20H6a2 2 0 0 1-2-2v-2" />
      <path d="M4 12h16" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.6-4.6" />
    </>
  ),
  settings: (
    <>
      <path d="M4 7h10" />
      <path d="M18 7h2" />
      <circle cx="16" cy="7" r="2.2" />
      <path d="M4 17h4" />
      <path d="M12 17h8" />
      <circle cx="10" cy="17" r="2.2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6.2v5.3c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6.2z" />
      <path d="m9.3 12 2 2 3.4-3.6" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9z" />
      <path d="M19 17.5l.8 2.1 2.2.9-2.2.8-.8 2.1-.8-2.1-2.2-.8 2.2-.9z" />
    </>
  ),
  transfer: (
    <>
      <path d="M7 8h11l-3.2-3.2" />
      <path d="M17 16H6l3.2 3.2" />
    </>
  ),
  trash: (
    <>
      <path d="M4.5 7h15" />
      <path d="M9 7V5.2A1.2 1.2 0 0 1 10.2 4h3.6A1.2 1.2 0 0 1 15 5.2V7" />
      <path d="M6.5 7l.9 12a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4l.9-12" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  wallet: (
    <>
      <rect height="13" rx="2.4" width="18" x="3" y="6" />
      <path d="M3 10.5h18" />
      <path d="M16.5 14.8h1.5" />
    </>
  ),
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
}

export function Icon({ className, name, size = 20, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn('shrink-0', className)}
      fill="none"
      focusable="false"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.7}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {paths[name]}
    </svg>
  )
}
