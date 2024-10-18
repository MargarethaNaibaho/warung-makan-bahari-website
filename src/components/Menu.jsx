import { Button, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import { useMemo } from "react";
import { useState } from "react";

const Menu = () => {
    const [dataMenu, setDataMenu] = useState({
        dataList: [{
            id: 1,
            menuName: 'Nasi Sayur',
            menuPrice: 10000
        }, {
            id: 2,
            menuName: 'Sambal Telur',
            menuPrice: 5000
        }, {
            id: 3,
            menuName: 'Teh Manis',
            menuPrice: 5000
        }, {
            id: 4,
            menuName: 'Teh Tong',
            menuPrice: 7000
        }, {
            id: 5,
            menuName: 'Nasi Padang',
            menuPrice: 12000
        }],
    })

    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const [newMenuId, setNewMenuId] = useState('');
    const [newMenuName, setNewMenuName] = useState('');
    const [newMenuPrice, setNewMenuPrice] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null);

    const pages = Math.ceil(dataMenu.dataList.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return dataMenu.dataList.slice(start, end);
    }, [page, dataMenu.dataList]);

    const handleAddOrUpdateItem = () => {
        if(newMenuId && newMenuName && newMenuPrice) {
            const newItem = {
                id: parseInt(newMenuId, 10),
                menuName: newMenuName,
                menuPrice: parseInt(newMenuPrice, 10),
            };

            if (isEditing) {
                setDataMenu((prev) => ({
                    ...prev,
                    dataList: prev.dataList.map(item =>
                        item.id === editingItemId ? { ...item, menuName: newMenuName, menuPrice: newItem.menuPrice } : item
                    ),
                }));
                setIsEditing(false);
                setEditingItemId(null);
            } else {
                if(!dataMenu.dataList.some(item => item.id === newItem.id)){
                    setDataMenu((prev) => ({
                        ...prev,
                        dataList: [newItem, ...prev.dataList],
                    }));
                } else{
                    alert("ID menu sudah ada, silahkan masukkan ID yang berbeda!");
                }
            }

            setNewMenuId('');
            setNewMenuName('');
            setNewMenuPrice('');
      
        } else {
            alert("Silahkan isi semua kolom!");
        }
    }

    const handleEditItem = (item) => {
        setNewMenuId(item.id);
        setNewMenuName(item.menuName);
        setNewMenuPrice(item.menuPrice);
        setIsEditing(true);
        setEditingItemId(item.id);
    }

    const handleDeleteItem = (id) => {
        setDataMenu((prev) => ({
            ...prev,
            dataList: prev.dataList.filter(item => item.id !==  id),
        }));
    }

    return (
        <>
        <div>
            <p className="my-10 font-bold text-3xl text-amber-800 text-center">Menu Warung Makan Bahari</p>

            <div className="flex justify-center mb-5 space-x-3">
                <input
                    type="number"
                    placeholder="ID Menu"
                    value={newMenuId}
                    onChange={(e) => setNewMenuId(e.target.value)}
                    className="border rounded px-2 py-1 w-full md:w-1/4"
                    disabled={isEditing} 
                />
                <input
                    type="text"
                    placeholder="Nama Menu"
                    value={newMenuName}
                    onChange={(e) => setNewMenuName(e.target.value)}
                    className="border rounded px-2 py-1 w-full md:w-1/4"
                />
                <input
                    type="number"
                    placeholder="Harga"
                    value={newMenuPrice}
                    onChange={(e) => setNewMenuPrice(e.target.value)}
                    className="border rounded px-2 py-1 w-full md:w-1/4"
                />
                <Button
                    onClick={handleAddOrUpdateItem}
                    className={`rounded px-4 py-1 ${isEditing ? 'bg-yellow-600' : 'bg-green-600'} text-white`}
                >
                    {isEditing ? 'Perbarui' : 'Tambah'}
                </Button>
            </div>


            <Table 
                aria-label="Menu Table pagination" 
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination 
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                className={{wrapper: "min-h-[222px]",}}
            >
                <TableHeader>
                    <TableColumn key="id">Id Menu</TableColumn>
                    <TableColumn key="menuName">Nama Menu</TableColumn>
                    <TableColumn key="menuPrice">Harga</TableColumn>
                    <TableColumn className="text-center">Aksi</TableColumn>
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.menuName}</TableCell>
                            <TableCell>{item.menuPrice}</TableCell>
                            <TableCell className="flex justify-center items-center space-x-2">
                                <Pencil className="text-amber-800 cursor-pointer" size={20} onClick={() => handleEditItem(item)}/> 
                                <Trash className="text-red-700 cursor-pointer" size={20} onClick={() => handleDeleteItem(item.id)} />
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
        
        </>
    );
}

export default Menu;
