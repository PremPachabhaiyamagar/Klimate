import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useState } from "react";

const SearchCity = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant={"outline"}
        className="relative flex justify-start w-full text-sm text-muted-foreground md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-4 w-4 mr-2" />
        Seacrh cities..
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchCity;
