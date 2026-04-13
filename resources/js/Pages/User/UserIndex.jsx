import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import DeleteUser from './Partials/DeleteUser';
import { useState, useEffect} from 'react';

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

        {
            Header: 'Tindakan',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex space-x-2 gap-2">
                    <DeleteUser user={row}/>
                </div>
            ),
        },
    ];

    const submitRegister = (e) => 
    {
        e.preventDefault();

        post(route('vendor.register.store'), {
            preserveScroll: true,
            preserveState: (page) => Object.keys(page.props.errors).length,
            onFinish: () => reset('password', 'password_confirmation'),
        });
    }; 

    const formatDateTime = (dateTimeString) => 
    {
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
            <>
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Penguna
            </h2>

            
                
            </>
            }
        >
            <Head title="Dashboard" />

           

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <Link href={route('register')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            {<PrimaryButton
                                className="mt-4 px-3 py-2 text-white bg-orange-400 rounded-md hover:bg-red-200"
                            >
                                Register
                            </PrimaryButton>}
                        </Link>
                        <div className="p-6 text-gray-900">
                            <DataTable columns={columns} data={user} className='mt-4'/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
