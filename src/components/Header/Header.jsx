import {Logo, LogoutBtn, Container} from "../index"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {  useSelector } from "react-redux"

const Header = () => {
  const authStatus = useSelector((state)=>state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name:"Home",
      slug:"/",
      active:true,
    },
    
    {
      name:"Login",
      slug:"/login",
      active : !authStatus,
    },
    
    {
      name:"Signup",
      slug:"/signup",
      active : !authStatus,
    },
    
    {
      name:"All Posts",
      slug:"/all-posts",
      active :authStatus,
    },
    
    {
      name:"Add Post",
      slug:"/add-post",
      active: authStatus,
    },
  ]

  return (
   <header className="py-3 shadow bg-gray-500">
      <Container >
      <nav className="flex">
      <div className="mr-4"> 
        <Link to="/">
        <Logo  width="70px"/>
        </Link>
      </div>
      
      <ul className="flex ml-auto">
        {navItems.map((items)=> 
          items.active ? (
            <li key={items.name}>
              <button 
              onClick={() => navigate(items.slug)}
              className="inline-block py-6 px-2 duration-200 hover:bg-blue-100 rounded-full"
              > {items.name}</button>
            </li>
          ) : null
          )}
          {authStatus && (
            <li>
            <LogoutBtn />
            </li>
          )}
      </ul>

      </nav>
      </Container>
   </header>
  )
}

export default Header
