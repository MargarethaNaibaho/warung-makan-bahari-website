import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchMenu } from "../redux/feature/menuSlice";


const Menu = () => {

    const {menus, status, error} = useSelector((state) => state.menu);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMenu())
    }, [dispatch])
    
    return (
        <>
        <div >
            <p className="my-10 font-bold text-3xl text-amber-800 text-center">Menu Warung Makan Bahari</p>
            <div className="flex flex-wrap justify-center gap-4">
                {menus.map((menu) => (
                    <Card className="py-4 w-72" key={menu.menuId}>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <h4 className="font-bold text-large mb-2">{menu.name}</h4>
                            <p className="text-base uppercase font-semibold mb-2">{menu.price}</p>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <div className="relative w-full h-full"> 
                                <Image
                                    alt="Menu item"
                                    className="object-cover w-full h-full rounded-lg" 
                                    src={menu.image.url}
                                    width={270}
                                    height={280}
                                    style={{ borderRadius: '0.5rem' }} 
                                />
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
            
        </div>
        
        </>
    );
}

export default Menu;
