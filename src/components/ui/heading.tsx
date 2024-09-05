import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type ComponentProps, forwardRef } from "react";

interface HeadingProps extends ComponentProps<"h1"> {
  asChild?: boolean;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ asChild, className, ...props }, ref) => {
    const Component = asChild ? Slot : "h1";
    return (
      <Component
        ref={ref}
        {...props}
        className={cn("text-4xl tracking-tight font-semibold", className)}
      />
    );
  },
);
