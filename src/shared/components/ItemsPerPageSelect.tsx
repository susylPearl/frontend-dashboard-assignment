import { DropdownMenu, DropdownMenuItem } from './DropdownMenu.tsx'

interface ItemsPerPageSelectProps {
  value: number
  onChange: (value: number) => void
  options: number[]
  disabled?: boolean
  'aria-label'?: string
}

const pillClosed =
  'rounded-xl border border-stone-200/90 bg-[#f7f5f0] text-slate-800 shadow-none hover:border-stone-300/90 hover:bg-[#f0ebe3] gap-1.5 px-3 pr-2.5'

const pillOpen =
  'rounded-xl border border-stone-300 bg-[#ebe8e0] text-slate-900 shadow-none ring-0 gap-1.5 px-3 pr-2.5'

export function ItemsPerPageSelect({
  value,
  onChange,
  options,
  disabled = false,
  'aria-label': ariaLabel = 'Items per page',
}: ItemsPerPageSelectProps) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <DropdownMenu
        className="relative"
        ariaLabel={`${ariaLabel}, currently ${value} per page`}
        disabled={disabled}
        align="end"
        variant="default"
        chevronVariant="solid"
        triggerClassName={pillClosed}
        openTriggerClassName={pillOpen}
        buttonContent={
          <span className="tabular-nums text-[0.9375rem] font-medium leading-none">
            {value}
          </span>
        }
      >
        {(close) => (
          <>
            {options.map((n) => (
              <DropdownMenuItem
                key={n}
                selected={n === value}
                onSelect={() => {
                  onChange(n)
                  close()
                }}
              >
                <span>
                  <span className="tabular-nums font-medium text-slate-800">
                    {n}
                  </span>
                  <span className="text-slate-500"> per page</span>
                </span>
              </DropdownMenuItem>
            ))}
          </>
        )}
      </DropdownMenu>
      <span className="select-none text-sm font-medium text-slate-700">
        items per page
      </span>
    </div>
  )
}
