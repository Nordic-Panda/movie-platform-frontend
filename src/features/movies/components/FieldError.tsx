interface FieldErrorProps {
  messages?: string | string[];
}

export function FieldError({ messages }: FieldErrorProps) {
  if (!messages) {
    return null;
  }

  const errorMessages = Array.isArray(messages) ? messages : [messages];

  return (
    <div className="mt-1 space-y-1">
      {errorMessages.map((message) => (
        <p key={message} className="text-sm text-red-400">
          {message}
        </p>
      ))}
    </div>
  );
}
