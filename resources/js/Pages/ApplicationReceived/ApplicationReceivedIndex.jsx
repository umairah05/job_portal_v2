import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, useEffect} from 'react';
// import ApplicationIndex from './Application/ApplicationIndex';
import ViewApplicationReceived from './ViewApplicationReceived';
import ApplicationDelete from './Partials/ApplicationDelete';

export default function ApplicationReceivedIndex({applications, vacancies, success}) {

    const vacancyTitle = ''

function getVacancyTitle(vacancy_uuid)
{
    const vacancy = vacancies.find(v=> v.id === vacancy_uuid)
    return vacancy? vacancy.vacancies_title:'Ralat';

    // console.log(vacancyTitle);
}

// console.log(applications);
    const columns = [
        {
            Header: 'Nama Kerja Kosong',
            accessor: [],
            Cell: ({ row }) => {
                const dataSnapshot = JSON.parse(row.application_snapshot);
                return (
                    <div className="flex flex-col">
                        
                        <div className='font-bold'>{dataSnapshot.name}</div>
                        <div className='font-thin'>{row.candidate_nric}</div>
                    </div>
                );
            },
        },

        {
            Header: 'Jawatan',
            accessor: [],
            Cell: ({ row }) => (
                <div className="flex items-center space-x-2">
                    <div className='font-semibold'>{getVacancyTitle(row.vacancy_uuid)}</div> 
                </div>
            ),

        },

        {
            Header: 'Tarikh Hantar',
            accessor: ['created_at'],
            Cell: ({ row }) => (
                <div className="flex flex-col">
                    <div className='font-semibold'>{formatDateTime(row.created_at)}</div> 
                </div>
            ),

        },

        // {
        //     Header: 'Pautan Iklan',
        //     accessor: [],
        //     Cell: ({ row }) => (
        //         <div className="flex flex-col">
        //             <div className='font-semibold'>{row.ads_link}</div> 
        //         </div>
        //     ),
        // },
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
                    
                    <Link href={route('viewApplicationReceived', row.id)}>
                    {<PrimaryButton
                        className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-red-600"
                        // onClick={() => handleDelete(row.id)}  
                    >
                        Papar
                    </PrimaryButton>}
                    </Link>
                
                    {<PrimaryButton
                        className="px-2 py-1 text-white bg-green-500 rounded hover:bg-red-600"
                        // onClick={() => handleDelete(row.id)}  
                    >
                        Cetak
                    </PrimaryButton>}

                    <ApplicationDelete applications={row}/>
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
                    Senarai Permohonan
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
                                {/* <VacancyAddVacancy/> */}
                            </div>
                            <DataTable columns={columns} data={applications} className='mt-4'/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
    
}
