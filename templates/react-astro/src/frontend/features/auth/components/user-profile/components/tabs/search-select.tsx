"use client";

import { useSize } from "@esmate/react/pkgs/ahooks";
import { Button } from "@esmate/shadcn/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@esmate/shadcn/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@esmate/shadcn/components/ui/popover";
import { cn } from "@esmate/shadcn/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
  value?: string;
  defaultValue?: string;
}

export function SearchSelect(props: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props.value ?? props.defaultValue ?? "");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const size = useSize(buttonRef);

  const options = props.options;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <input type="hidden" name={props.name} value={value} />
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          id={props.id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", props.className)}
        >
          {value ? options.find((option) => option.value === value)?.label : (props.placeholder ?? "Select option...")}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: size?.width }}>
        <Command>
          <CommandInput placeholder="Search option..." className="h-9" />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    props.onChange?.(currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check className={cn("ml-auto", value === option.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
