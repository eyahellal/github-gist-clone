export default function Input(props) {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <label htmlFor={props.id} className="text-sm text-slate-800 font-medium">
        {props.label}
      </label>
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        className="outline-none bg-transparent border border-gray-100 rounded-sm px-2 py-1 w-full"
        value={props.email}
      />
      {props.error ? (
        <p className="text-red-600 text-sm">{props.error}</p>
      ) : null}
    </div>
  );
}
