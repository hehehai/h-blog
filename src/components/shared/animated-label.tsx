export function AnimatedLabel({ text }: { text: string }) {
  return (
    <span className="rolling-label">
      <span className="rolling-label-track">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
      </span>
    </span>
  );
}
