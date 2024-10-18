import { UtensilsCrossed } from "lucide-react";
import Sidebar from "../components/Sidebar";
import SidebarItem from "../components/SidebarItem";
import { HandPlatter } from "lucide-react";
import Menu from "../components/Menu";
import Meja from "../components/Meja";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Transaction from "../components/Transaction";
import { ShoppingBasket } from "lucide-react";

const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState("menu");

    const handleComponentChange = (component) => {
        console.log(`Changin to: ${component}`)
        setActiveComponent(component);
    }

    return (
        <>
        <main className="App flex h-screen font-poppins">
            <Sidebar>
                <SidebarItem icon={<ShoppingBasket size={20} />} text="Transaksi" active={activeComponent === "transaction"} onClick={() => handleComponentChange("transaction")} />
                <SidebarItem icon={<UtensilsCrossed size={20} />} text="WMB Menu" active={activeComponent === "menu"} onClick={() => handleComponentChange("menu")} />
                <SidebarItem icon={<HandPlatter size={20} />} text="Meja" active={activeComponent === "meja"} onClick={() => handleComponentChange("meja")} />
            </Sidebar>
            <div className="flex-grow p-8 bg-orange-50 overflow-y-auto">
                {activeComponent === "transaction" && <Transaction />}
                {activeComponent === "menu" && <Menu />}
                {activeComponent === "meja" && <Meja />}
            </div>
        </main>
        </>
    );
}

export default Dashboard;