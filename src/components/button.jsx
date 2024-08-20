export function Button(props) {
  return (
    <button
      type={props.type}
      disabled={props.isSubmitting}
      className="bg-black text-white rounded-md hover:bg-slate-800 px-4 py-2 w-full"
      onClick={props.onClick}
    >
      {props.isSubmitting ? "submitting..." : props.children}
    </button>
  );
}
