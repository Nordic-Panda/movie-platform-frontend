interface FieldErrorProps {
  messages?: string[];
}

export function FieldError({ messages }: FieldErrorProps) {
  if (!messages?.length) {
    return null;
  }

  return (
    <div className="mt-1 space-y-1">
      {messages.map((message) => (
        <p key={message} className="text-sm text-red-400">
          {message}
        </p>
      ))}
    </div>
  );
}
