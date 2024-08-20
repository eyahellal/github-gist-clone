import User from "./user";

export default function Users(props) {
  return (
    <div className="flex flex-col items-start gap-4 divide-y">
      {props.users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}
