import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import VacancyAddVacancy from './Partials/VacancyAddVacancy';
import VacancyDeleteVacancy from './Partials/VacancyDeleteVacancy';
import { useState, useEffect} from 'react';

export default function VacancyIndex({vacancy, success}) {

console.log(success);
    const columns = [
        // { Header: 'Nama', accessor: 'allottee_name' },
        // { Header: 'No. Fail / Geran', accessor: 'lot_file_num' },
        {
            Header: 'Nama Kerja Kosong',
            accessor: ['vacancies_title'],
            Cell: ({ row }) => (
                <div className="flex flex-col">
                    <div className='font-semibold'>{row.vacancies_title}</div>
                    <div className='font-normal text-sm'>{row.vacancies_description}</div>
                </div>
            ),
        },

        {
            Header: 'Tarikh Iklan',
            accessor: ['start_date'],
            Cell: ({ row }) => (
                <div className="flex items-center space-x-2">
                    <div className='font-semibold'>{formatDateTime(row.start_date)}</div> 
                    <span className="text-gray-950">-</span>
                    <div className="font-semibold">{formatDateTime(row.end_date)}</div>
                </div>
            ),

        },

        {
            Header: 'Pautan Iklan',
            accessor: ['ads_link'],
            Cell: ({ row }) => (
                <div className="flex flex-col">
                    <div className='font-semibold'>{row.ads_link}</div> 
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
        {
            Header: 'Tindakan',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex space-x-2 gap-2">
                    {/* <AllotteeEdit allottee={row} /> */}
                    <VacancyDeleteVacancy vacancy={row}/>
                    {/* {<PrimaryButton
                        className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={() => handleDelete(row.id)}  
                    >
                        Padam
                    </PrimaryButton>} */}
                </div>
            ),
        },
    ];

    const [successMessage, setSuccessMessage] = useState(false);
    // const displaySuccessMessage = () => {
    // if (success) {
    //     setSuccessMessage(true);
    // }}
    useEffect(() => {
        if (success) {
            setSuccessMessage(true);
            // optional: hide after a few seconds
            // setTimeout(() => setSuccessMessage(false), 3000);
        }
    }, [success]);



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
                    Kerja Kosong
                </h2>
            }
        >
            <Head title="Dashboard" />

            

            <div className="py-12">
                
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {successMessage && (
                                <div className="p-4 bg-green-300 rounded-lg shadow-md mb-3">
                                    Berjaya Dipadam!
                                </div>

                            )}

                            <div className="flex justify-end mb-4">
                                <VacancyAddVacancy/>
                            </div>
                            <DataTable columns={columns} data={vacancy} className='mt-4'/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
    
}
