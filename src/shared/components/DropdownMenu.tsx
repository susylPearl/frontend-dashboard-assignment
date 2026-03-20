import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

export function DropdownMenuCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}

function ChevronDownIcon({ className, open }: { className?: string; open: boolean }) {
  return (
    <svg
      className={`${className ?? ''} transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  )
}

function ChevronDownFilled({ className, open }: { className?: string; open: boolean }) {
  return (
    <svg
      className={`${className ?? ''} shrink-0 text-current transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 10 6"
      fill="currentColor"
      aria-hidden
    >
      <path d="M5 6L0 0h10L5 6z" />
    </svg>
  )
}

const MENU_MIN_WIDTH_PX = 168 // matches min-w-[10.5rem]
const MENU_MARGIN = 8

function computeMenuPlacement(
  root: HTMLElement,
  align: 'start' | 'end'
): { top: number; left: number } {
  const rect = root.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight

  let left =
    align === 'end' ? rect.right - MENU_MIN_WIDTH_PX : rect.left
  left = Math.max(
    MENU_MARGIN,
    Math.min(left, vw - MENU_MIN_WIDTH_PX - MENU_MARGIN)
  )

  let top = rect.bottom + 6
  const estHeight = 220
  if (top + estHeight > vh - MENU_MARGIN) {
    top = Math.max(MENU_MARGIN, rect.top - estHeight - 6)
  }

  return { top, left }
}

interface DropdownMenuProps {
  ariaLabel: string
  disabled?: boolean
  /** Menu alignment relative to trigger */
  align?: 'start' | 'end'
  /** Extra classes on the root wrapper (e.g. max-width on small screens) */
  className?: string
  /** Leading icon + label area; chevron appended unless `variant="icon"` */
  buttonContent: ReactNode
  children: (close: () => void) => ReactNode
  /** Compact square trigger — icon only, no chevron */
  variant?: 'default' | 'icon'
  /** Hover / keyboard-focus tooltip (sighted users); keep `ariaLabel` for screen readers */
  tooltip?: string
  /** Replace default closed-state trigger colors (e.g. warm pill). Pair with `openTriggerClassName` when styling open state. */
  triggerClassName?: string
  /** When menu is open; falls back to the default open style if omitted */
  openTriggerClassName?: string
  /** Outline chevron (default) or solid triangle */
  chevronVariant?: 'outline' | 'solid'
}

/**
 * SaaS-style menu: opens in a fixed portal so it isn’t clipped by `overflow-auto`
 * ancestors and stays within the viewport on small screens.
 */
export function DropdownMenu({
  ariaLabel,
  disabled = false,
  align = 'start',
  className = '',
  buttonContent,
  children,
  variant = 'default',
  tooltip,
  triggerClassName,
  openTriggerClassName,
  chevronVariant = 'outline',
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState<{ top: number; left: number } | null>(
    null
  )
  const rootRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonId = useId()
  const menuId = useId()
  const tooltipId = useId()

  const close = useCallback(() => setOpen(false), [])

  const updatePlacement = useCallback(() => {
    const root = rootRef.current
    if (!root) return
    setPlacement(computeMenuPlacement(root, align))
  }, [align])

  useLayoutEffect(() => {
    if (!open) return
    updatePlacement()
  }, [open, align, updatePlacement])

  useEffect(() => {
    if (!open) return
    const onScrollOrResize = () => updatePlacement()
    window.addEventListener('scroll', onScrollOrResize, true)
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [open, updatePlacement])

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (rootRef.current?.contains(t) || menuRef.current?.contains(t)) return
      setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const defaultClosed =
    'border-slate-200/90 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50/90'
  const defaultOpen =
    'border-slate-300 bg-slate-50 text-slate-900 shadow-sm ring-2 ring-blue-500/15'
  const closedTrigger = triggerClassName ?? defaultClosed
  const openTrigger = openTriggerClassName ?? defaultOpen
  const stateTrigger = open ? openTrigger : closedTrigger

  const menuPanel = placement ? (
    <div
      ref={menuRef}
      id={menuId}
      role="menu"
      aria-labelledby={buttonId}
      style={{
        position: 'fixed',
        top: placement.top,
        left: placement.left,
        zIndex: 9999,
      }}
      className="w-[min(10.5rem,calc(100vw-1rem))] overflow-hidden rounded-xl border border-slate-200/90 bg-white py-1 shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5"
    >
      {children(close)}
    </div>
  ) : null

  return (
    <div
      ref={rootRef}
      className={`relative inline-flex max-w-full shrink-0 overflow-visible ${className}`}
    >
      <div
        className={
          tooltip
            ? 'group/tooltip relative inline-flex max-w-full shrink-0 overflow-visible'
            : 'contents'
        }
      >
        <button
          id={buttonId}
          type="button"
          disabled={disabled}
          aria-label={ariaLabel}
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={menuId}
          onClick={() => !disabled && setOpen((o) => !o)}
          className={`inline-flex max-w-full items-center rounded-lg border text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/35 disabled:cursor-not-allowed disabled:opacity-50 ${
            variant === 'icon'
              ? 'size-9 shrink-0 justify-center p-0'
              : 'h-9 gap-2 px-3'
          } ${stateTrigger}`}
        >
          <span
            className={
              variant === 'icon'
                ? 'flex items-center justify-center'
                : 'flex min-w-0 flex-1 items-center gap-2 truncate'
            }
          >
            {buttonContent}
          </span>
          {variant === 'default' &&
            (chevronVariant === 'solid' ? (
              <ChevronDownFilled className="size-2.5" open={open} />
            ) : (
              <ChevronDownIcon className="size-4 shrink-0 text-slate-500" open={open} />
            ))}
        </button>

        {tooltip ? (
          <span
            id={tooltipId}
            role="tooltip"
            hidden={open}
            className="pointer-events-none absolute top-[calc(100%+0.375rem)] left-1/2 z-[60] w-max max-w-[min(16rem,calc(100vw-2rem))] -translate-x-1/2 whitespace-normal rounded-lg bg-slate-900 px-2.5 py-1.5 text-left text-xs font-medium leading-snug text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100"
          >
            {tooltip}
          </span>
        ) : null}
      </div>

      {open &&
        menuPanel != null &&
        typeof document !== 'undefined' &&
        createPortal(menuPanel, document.body)}
    </div>
  )
}

interface DropdownMenuItemProps {
  selected?: boolean
  onSelect: () => void
  children: ReactNode
}

export function DropdownMenuItem({
  selected = false,
  onSelect,
  children,
}: DropdownMenuItemProps) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={selected}
      onClick={onSelect}
      className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm text-slate-700 transition-colors hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
    >
      <span className="flex size-4 shrink-0 items-center justify-center text-blue-600">
        {selected ? <DropdownMenuCheckIcon className="size-4" /> : null}
      </span>
      <span className="min-w-0 flex-1 text-left">{children}</span>
    </button>
  )
}
