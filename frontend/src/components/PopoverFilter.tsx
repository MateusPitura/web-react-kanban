import * as Popover from "@radix-ui/react-popover";
import Button from "./Button";
import { ReactElement, ReactNode } from "react";

interface PopoverFilterProperties {
  children: ReactElement;
  options: ReactNode[];
}

export default function PopoverFilter({
  children,
  options,
}: PopoverFilterProperties) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div className="w-fit">
          <Button onClick={() => {}} variant="secondary">
            <div className="p-1">{children}</div>
          </Button>
        </div>
      </Popover.Trigger>
      <Popover.Content
        className="bg-secondaryContainer text-onSecondaryContainer p-4 rounded-lg shadow-lg flex flex-col gap-2 items-start z-10"
        align="start"
        sideOffset={4}
      >
        {options}
      </Popover.Content>
    </Popover.Root>
  );
}
