import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

interface FormStepItem
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof formStepItemVariants> {
  children: React.ReactNode;
}

interface FormStepList extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

const formStepItemVariants = cva("flex flex-col gap-4 p-4 rounded-lg", {
  variants: {
    variant: {
      default: "bg-slate-200 opacity-65",
      active: "bg-green-200",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const FormStepList = forwardRef<HTMLUListElement, FormStepList>(
  ({ children, className, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn("size-full flex flex-row gap-4 p-4", className)}
        {...props}
      >
        {children}
      </ul>
    );
  }
);

FormStepList.displayName = "FormStepList";

const FormStepItem = forwardRef<HTMLLIElement, FormStepItem>(
  ({ children, className, variant, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(formStepItemVariants({ variant }), className)}
        {...props}
      >
        {children}
      </li>
    );
  }
);

FormStepItem.displayName = "FormStep";

export { FormStepList, FormStepItem };
