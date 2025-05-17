export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`bg-primary text-white rounded-lg py-2 font-bold hover:bg-primary/90 ${props.className}`}
    ></button>
  );
}
