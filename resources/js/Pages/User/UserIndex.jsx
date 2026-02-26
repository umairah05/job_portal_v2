import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function User({user}) {
console.log(user);
    const columns = [
        // { Header: 'Nama', accessor: 'allottee_name' },
        // { Header: 'No. Fail / Geran', accessor: 'lot_file_num' },
        {
            Header: 'Nama',
            accessor: ['name'],
            Cell: ({ row }) => (
                <div className="flex flex-col">
                    <div className='font-semibold'>{row.name}</div> 
                </div>
            ),
        },

        {
            Header: 'Jawatan',
            accessor: ['designation'],
            Cell: ({ row }) => (
                <div className="flex flex-col">
                    <div className='font-semibold'>{row.designation}</div> 
                </div>
            ),
        },

        {
            Header: 'Tarikh',
            accessor: ['created_at'],
            Cell: ({ row }) => (
                <div className="flex flex-col">
                    <div className='font-semibold'>{formatDateTime(row.created_at)}</div> 
                </div>
            ),

        },
        // {
        //     Header: 'Jenis Entiti',
        //     accessor: ['vendor_type',],
        //     Cell: ({ row }) => (
        //         <div className="flex flex-col text-sm">
        //             {row.vendor_type === 'company' && ('Syarikat')}
        //             {row.vendor_type === 'gov_entity' && ('Perbadanan / Entiti Kerajaan')}
        //             {row.vendor_type === 'cooperation' && ('Koperasi')}
        //             {row.vendor_type === 'organisation' && ('Pertubuhan / Kelab')}
        //         <p> </p>
        //             {row.vendor_company_type === 'bhd' && ('Berhad')}
        //             {row.vendor_company_type === 'sdn-bhd' && ('Sendirian Berhad')}
        //             {row.vendor_company_type === 'partnership' && ('Perkongsian')}
        //             {row.vendor_company_type === 'sole-ownership' && ('Milikan Tunggal')}
        //         </div>
        //     ),
        // },
        // { Header: 'No. Telefon', accessor: 'vendor_phone' },
        // {
        //     Header: 'Tindakan',
        //     accessor: 'actions',
        //     Cell: ({ row }) => (
        //         <div className="flex space-x-2 gap-2">
        //             {/* <AllotteeEdit allottee={row} /> */}
        //             <Link>
        //                 <PrimaryButton
        //                     className="px-2 py-1 text-white"
        //                 >
        //                     Lihat Butiran
        //                 </PrimaryButton>
        //             </Link>
        //             {/* <PrimaryButton
        //                 className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
        //                 onClick={() => handleDelete(row.id)}
        //             >
        //                 Tolak Permohonan
        //             </PrimaryButton> */}
        //         </div>
        //     ),
        // },
    ];

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return '-';
        const date = new Date(dateTimeString);
        
        // Convert to UTC+8
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Penguna
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <DataTable columns={columns} data={user} className='mt-4'/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
