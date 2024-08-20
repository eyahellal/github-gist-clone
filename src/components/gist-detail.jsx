export default function GistDetail(props){
    return(
        <div className="flex hover:text-blue-700 gap-2 text-slate-500 items-center">
            {props.icon}
            {props.count}

            <p>{props.title}</p>

        </div>
    )
}