import { Radio, Button, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import { useMemo } from "react";
import { useState } from "react";

const Meja = () => {
    const [dataMeja, setDataMeja] = useState({
        dataList: [{
            id: 1,
            mejaStatus: 'Unavailable',
        }, {
            id: 2,
            mejaStatus: 'Unavailable',
        }, {
            id: 3,
            mejaStatus: 'Available',
        }, {
            id: 4,
            mejaStatus: 'Unavailable',
        }, {
            id: 5,
            mejaStatus: 'Available',
        }],
    })

    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const [newMejaId, setNewMejaId] = useState('');
    const [newMejaStatus, setNewMejaStatus] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null);

    const pages = Math.ceil(dataMeja.dataList.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return dataMeja.dataList.slice(start, end);
    }, [page, dataMeja.dataList]);

    const handleAddOrUpdateItem = () => {
        if(newMejaId && newMejaStatus) {
            const newItem = {
                id: parseInt(newMejaId, 10),
                mejaStatus: newMejaStatus,
            };

            if (isEditing) {
                setDataMeja((prev) => ({
                    ...prev,
                    dataList: prev.dataList.map(item =>
                        item.id === editingItemId ? { ...item, mejaStatus: newMejaStatus} : item
                    ),
                }));
                setIsEditing(false);
                setEditingItemId(null);
            } else {
                if(!dataMeja.dataList.some(item => item.id === newItem.id)){
                    setDataMeja((prev) => ({
                        ...prev,
                        dataList: [newItem, ...prev.dataList],
                    }));
                } else{
                    alert("Nomor meja sudah ada, silahkan masukkan nomor yang berbeda!");
                }
            }

            setNewMejaId('');
            setNewMejaStatus('');
      
        } else {
            alert("Silahkan isi semua kolom!");
        }
    }

    const handleEditItem = (item) => {
        setNewMejaId(item.id);
        setNewMejaStatus(item.mejaStatus);
        setIsEditing(true);
        setEditingItemId(item.id);
    }

    const handleDeleteItem = (id) => {
        setDataMeja((prev) => ({
            ...prev,
            dataList: prev.dataList.filter(item => item.id !==  id),
        }));
    }

    return (
        <>
        <div>
            Belum selesai
            <p className="my-10 font-bold text-3xl text-amber-800 text-center">Meja Warung Makan Bahari</p>

            <div className="flex justify-center mb-5 space-x-3">
                <input
                    type="number"
                    placeholder="Nomor Meja"
                    value={newMejaId}
                    onChange={(e) => setNewMejaId(e.target.value)}
                    className="border rounded px-2 py-1 w-full md:w-1/4"
                    disabled={isEditing} 
                />
                
                <div className="flex items-center space-x-4">
                    <label>
                        <input
                            type="radio"
                            value="Available"
                            checked={newMejaStatus === 'Available'}
                            onChange={(e) => setNewMejaStatus(e.target.value)}
                            className="mr-2"
                        />
                        Available
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Unavailable"
                            checked={newMejaStatus === 'Unavailable'}
                            onChange={(e) => setNewMejaStatus(e.target.value)}
                            className="mr-2"
                        />
                        Unavailable
                    </label>
                </div>

                <Button
                    onClick={handleAddOrUpdateItem}
                    className={`rounded px-4 py-1 ${isEditing ? 'bg-yellow-600' : 'bg-green-600'} text-white`}
                >
                    {isEditing ? 'Perbarui' : 'Tambah'}
                </Button>
            </div>


            <Table 
                aria-label="Meja Table pagination" 
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
                    <TableColumn key="id">Nomor Meja</TableColumn>
                    <TableColumn key="mejaStatus">Status Meja</TableColumn>
                    <TableColumn className="text-center">Aksi</TableColumn>
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.mejaStatus}</TableCell>
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

export default Meja;