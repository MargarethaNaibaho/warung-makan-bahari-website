import { UtensilsCrossed } from "lucide-react";
import Sidebar from "../components/Sidebar";
import SidebarItem from "../components/SidebarItem";
import { HandPlatter } from "lucide-react";
import Menu from "../components/Menu";
import Meja from "../components/Meja";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState("menu");

    const handleComponentChange = (component) => {
        console.log(`Changin to: ${component}`)
        setActiveComponent(component);
    }

    return (
        <>
        <main className="App flex h-full font-poppins">
            <Sidebar>
                <SidebarItem icon={<UtensilsCrossed size={20} />} text="WMB Menu" active={activeComponent === "menu"} onClick={() => handleComponentChange("menu")} />
                <SidebarItem icon={<HandPlatter size={20} />} text="Meja" active={activeComponent === "meja"} onClick={() => handleComponentChange("meja")} />
            </Sidebar>
            <div className="flex-grow p-8 bg-orange-50">
                {activeComponent === "menu" && <Menu />}
                {activeComponent === "meja" && <Meja />}
            </div>
        </main>
        </>
    );
}

export default Dashboard;