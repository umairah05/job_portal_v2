// import { Inertia } from '@inertiajs/inertia'; 
import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';

import { useForm } from '@inertiajs/react';
import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { format } from "date-fns";


export default function ApplicationDelete({applications}) {

    const { data, setData, post, processing, errors, reset } = useForm({
        id: applications.id,

    });
console.log('applicationDelete',);
    const [openStartDate, setOpenStartDate] = useState(false);
    const [openEndDate, setOpenEndDate] = useState(false);

    const [dropdown, setDropdown] = useState("dropdown");
    
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const submit = (e) => {
        e.preventDefault();
        console.log('onDelete', applications);

        post(route('application.delete'), {
            id:applications.id,
            ondelete: () => {
                reset(
                    'id',
                    // 'vacancies_location',
                    // 'vacancies_description',
                    // 'start_date',
                    // 'end_date',
                    // 'ads_link',
                );
                // Close the dialog
                // console.log('onSuccess', data);
                setIsDialogOpen(false);
            },
        });
    };

    // console.log('vendor_application_id', vendor_application_id);

    const handleDialogClose = (isOpen) => {
        setIsDialogOpen(isOpen);

        if (!isOpen) {
            reset(
              'vendor_id',
            );
        }
    };
    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <PrimaryButton variant="outline">
                    Padam
                </PrimaryButton>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Padam Pemohonan</DialogTitle>
                </DialogHeader>
                <div className="mt-4">

                    <form onSubmit={submit}>
                    <div className="items-center space-y-2">
                       
                        < div className="grid flex-1 gap-2">
                            <div>
                                <InputLabel
                                    // htmlFor="ads_link"
                                    value={
                                        <>
                                            Anda yakin mahu memadam maklumat permohonan ini?
                                        </>
                                    }
                                />

                            </div>
                        </div>
                        <PrimaryButton disabled={processing}>
                           Padam
                        </PrimaryButton>
                    </div>
                </form>

                </div>
            </DialogContent>
        </Dialog>
    );
}