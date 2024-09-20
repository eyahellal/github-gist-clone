export default function Input(props) {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <label htmlFor={props.id} className="text-sm text-white ">
        {props.label}
      </label>
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        className=" border border-gray-500/25 rounded-md px-2 py-1 w-full !bg-black"
        value={props.email}
      />
      {props.error ? (
        <p className="text-red-600 text-sm">{props.error}</p>
      ) : null}
    </div>
  );
}
