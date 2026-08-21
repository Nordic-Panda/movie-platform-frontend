interface RequiredLabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}

export function RequiredLabel({
  htmlFor,
  children,
  required = false,
}: RequiredLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-zinc-200"
    >
      {children}

      {required && (
        <span className="ml-1 text-red-400" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
