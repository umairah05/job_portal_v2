import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import { Link } from '@inertiajs/react';

export default function AboutUs() {


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    About Us
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg text-center bg-sky-500/30">
                        <div className="uppercase p-2 md:p-4 mt-6 text-sm font-bold">
                            tentang kami
                        </div>
                        
                        <div className="p-2 md:p-4 mt-6 text-sm shadow-sm sm:rounded-lg text-center bg-sky-800/30">
                            Untuk memudahkan urusan melihat jawatan kosong yang ditawarkan 
                            oleh syarikat dan menilai permohonan yang dihantar.
                        
                            <div>Dibuat: 24/02/2026</div>
                            <div>Oleh:</div> 
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
