import { useContext } from "react";
import { SidebarContext } from "./Sidebar";

const SidebarItem = ({icon, text, active, onClick}) => {
    const {isExpanded} = useContext(SidebarContext)
    return (
        <li 
            onClick={onClick}
            className={`
                relative flex items-center py-2 px-3 my-1 mb-3 font-medium rounded-md cursor-pointer transition-colors
                ${
                    active
                    ? "bg-orange-200 text-orange-800"
                    : "hover:bg-orange-100 hover:text-orange-600 text-orange-800"
                }
                ${isExpanded ? "w-full" : "w-12"} transition-all duration-300
            `}>
            <div className="flex-shrink-2 items-center">
                {icon}
            </div>
            {isExpanded && (
                <span className="ml-3 transition-all duration-300">
                    {text}
                </span>
            )}
        </li>
    );
}


export default SidebarItem;