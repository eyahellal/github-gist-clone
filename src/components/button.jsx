export function Button(props) {
  return (
    <button
      type={props.type}
      disabled={props.isSubmitting}
      className="bg-green-600 text-white rounded-md hover:bg-green-600/50 px-4 py-1 w-full"
      onClick={props.onClick}
    >
      {props.isSubmitting ? "submitting..." : props.children}
    </button>
  );
}
