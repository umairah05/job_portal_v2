import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import { Link } from '@inertiajs/react';

export default function Dashboard({vacancies, applications}) {


    const number_of_vacancies = vacancies.length;
    // console.log(number_of_vacancies);
    const number_of_applications = applications.length;
    // console.log(number_of_applications);

    function getApplicationNumber(vacancy_uuid)
    {
        const applicationNum = applications.filter(item => item.vacancy_uuid === vacancy_uuid).length;
        
        return applicationNum;
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Utama
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border border-gray-300 p-4 rounded-xl bg-white mb-8">
                            <div className="grid flex-1 gap-2 md:grid-cols-2 my-2">
                                <div className="p-6 text-gray-900 border border-gray-300 bg-lime-500 rounded-lg shadow">
                                    <div className=''>                                       
                                        Jawatan Dibuka                                                    
                                    </div>
                                    <div className="font-bold text-right text-2xl">{number_of_vacancies}</div>
                                </div>

                                <div className="p-6 text-gray-900 border border-gray-300 bg-green-500 rounded-lg shadow">
                                    <div className=''>
                                        Jumlah Permohonan
                                    </div>
                                    <div className="font-bold text-right text-2xl">{number_of_applications}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-2 md:p-4 mt-6 text-sm font-bold">
                            SENARAI PERMOHONAN
                        </div>

                        <div className="p-2 grid flex-1 gap-2 md:grid-cols-3 my-2">
                            
                            {vacancies.map((vacancy) => (
                                <Link href={route('viewApplicantList', { id: vacancy.id })}>
                                <div className="p-6 text-gray-900 border border-gray-300 rounded-lg bg-orange-200 shadow">
                                    <div className='uppercase font-bold'>
                                        {vacancy.vacancies_title}                                                
                                    </div>
                                    <div className="">{getApplicationNumber(vacancy.id)} permohonan</div>
                                </div>
                                </Link>
                            ))}
                            
                        </div>
                        

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
