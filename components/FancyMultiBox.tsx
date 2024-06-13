"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useVectorFetch } from "@/hooks/vectorHook";

const badgeStyle = (color: string) => ({
  borderColor: `#999`,
  backgroundColor: `#999`,
  color: `#fff`,
});

export function FancyBox({field} : {field:any}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [selectedValues, setSelectedValues] = React.useState([]);
  const { vector,vectorLoader } = useVectorFetch();

  
  React.useEffect(() => {
    field.onChange(selectedValues);
  }, [selectedValues]);

  
  // React.useEffect(() => {
  //   // Initialize selectedValues based on the default field value
  //   if (field.value && vector.length > 0) {
  //     const initialSelected = vector.filter(tool =>
  //       field.value.includes(tool.vector_id)
  //     );
  //     setSelectedValues(initialSelected);
  //   }
  //   console.log(field.value);
  // }, []);

  const toggleFramework = (vector:any) => {
    setSelectedValues((currentFrameworks:any) =>
      !currentFrameworks.includes(vector)
        ? [...currentFrameworks, vector]
        : currentFrameworks.filter((l :any ) => l.vector_id !== vector.vector_id)
    );
    inputRef?.current?.focus();
  };

  const onComboboxOpenChange = (value: boolean) => {
    inputRef.current?.blur(); // HACK: otherwise, would scroll automatically to the bottom of page
    setOpenCombobox(value);
  };

  
  if (vectorLoader) {
    return <div className='p-5 bg-white'>Loading...</div>;
}

  return (
    <div className="w-full mb-4 p-2">
      <Label className="">Tools</Label>
      <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCombobox}
            className="w-full justify-between text-foreground"
          >
            <span className="truncate">
              {selectedValues.length === 0 && "Select Tools"}
              {selectedValues.length === 1 && selectedValues[0]?.name}
              {selectedValues.length === 2 &&
                selectedValues.map(({ name }) => name).join(", ")}
              {selectedValues.length > 2 &&
                `${selectedValues.length} tools selected`}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command loop>
            <CommandInput
              ref={inputRef}
              placeholder="Search Tools..."
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandList>
              <CommandGroup className="max-h-[145px] overflow-auto">
                {vector.map((tool:any) => {
                  const isActive = selectedValues.includes(tool);
                  return (
                    <CommandItem
                      key={tool.vector_id}
                      value={tool.vector_id}
                      onSelect={() => toggleFramework(tool)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex-1">{tool.name}</div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="relative -mb-24 mt-3 h-24 overflow-y-auto">
        {selectedValues.map(({ vector_id, name }) => (
          <Badge
            key={vector_id}
            variant="outline"
            style={badgeStyle("#999")}
            className="mb-2 mr-2"
          >
            {name}
          </Badge>
        ))}
      </div>
    </div>
  );
}