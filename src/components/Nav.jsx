import { Link } from "react-router-dom";
const LINKS = [{
    text: 'home',
    to: '/'

},
{
    text: "starred",
    to:"starred"
}
]

function Nav() {
  return (
    <div>
        <ul>
            {LINKS.map((item) => ( 
            <li key={item.to}>
                <Link to={item.to}>{item.text}</Link>
            </li>))}
        </ul>
    </div>
  )
}

export default Nav