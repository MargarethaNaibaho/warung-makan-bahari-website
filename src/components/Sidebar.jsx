import { LogOut } from "lucide-react";
import { ChevronLast } from "lucide-react";
import { ChevronFirst } from "lucide-react";
import { createContext } from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SidebarContext = createContext();

const Sidebar = ({children}) => {
    const {logout} = useAuth();
    const navigate = useNavigate();

    const [isExpanded, setIsExpanded] = useState(true);

    const handleLogout = async() => {
        logout();
        navigate('/');
    }

    return (
        <aside className={`${isExpanded ? "min-w-72" : "w-20"} bg-white border-r shadow-sm  h-full transition-all duration-300`}>
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 mb-10 flex justify-between items-center">
                    <img src="src/assets/images/logo.png" className={`overflow-hidden transition-all duration-300 ${isExpanded ? "w-12" : "w-0"}`} />
                    <button onClick={() => setIsExpanded(current => !current)} className="p-1.5 mr-1 rounded-lg text-orange-800 bg-orange-50 hover:bg-orange-100 hover:text-orange-600">
                        {isExpanded ? <ChevronFirst size={25}/> : <ChevronLast size={25} />}
                    </button>
                </div>

                <SidebarContext.Provider value={{isExpanded}}>
                    <ul className="flex-1 px-3 ml-1">{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3 items-center justify-center">
                    <img
                        src="https://ui-avatars.com/api/?name=MN&background=fed7aa&color=c2410c&bold=true"
                        alt=""
                        className="w-10 h-10 rounded-md"
                    />
                    <div className={`
                            flex justify-between items-center
                            overflow-hidden transition-all duration-300 ${isExpanded ? "max-w-xs ml-3" : "w-0"}
                        `}>
                        <div className="mr-8">
                            <h4 className="font-semibold text-orange-800">Margaretha G.A.N.</h4>
                            <span className="text-xs text-orange-800">admin@gmail.com</span>
                        </div>
                        <LogOut size={20} className="text-orange-800 cursor-pointer" onClick={handleLogout}/>
                    </div>

                </div>

            </nav>
        </aside>
    );
}

export default Sidebar;
export {SidebarContext};