import { Input } from '@/components/ui/input';
import axios from 'axios';
import React, { useState } from 'react';
import Link from 'next/link';

interface Contact {
  id: number;
  name: string;
  number: string;
  status: string;
}

export default function FileUpload() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCSVUpload = async (csvText:any) => {
        setLoading(true);
        setError(null);

        try {
            const parsedContacts = await parseCSV(csvText);
            setContacts(parsedContacts);
        } catch (error: any) { // Specify the type of error as any or Error
            setError('Error parsing CSV file. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const parseCSV = async (csvText:any) => {
        const rows = csvText.split('\n');
        const parsedContacts: Contact[] = [];

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const [name, number] = row.split(',');
            const data = { name, number };

            try {
                const response = await axios.post('/api/contacts/create', data);
                parsedContacts.push({ id: i, name, number, status: 'Contact Added Successfully' });
            } catch (error: any) { // Specify the type of error as any or Error
                parsedContacts.push({ id: i, name, number, status: error.response?.data?.error || 'Unknown Error' });
            }
        }

        return parsedContacts;
    };

    const handleFileUpload = (event:any) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            handleCSVUpload(text);
        };
        reader.readAsText(file);
    };

    return (
        <div>
            <div className='border m-3 p-4'>
                <h2>Upload CSV File. Download <Link href="" className='text-primary'>sample file</Link> for input download.</h2>
                <Input type="file" accept=".csv" onChange={handleFileUpload} />
            </div>
            
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            
            <div className='border m-3 p-4'>
                <ul>
                    {contacts.map((contact) => (
                        <li key={contact?.id} className={contact?.status == 'Contact Added Successfully' ? 'text-primary' : 'text-red-500'}>
                            Name: {contact?.name} - Number: {contact?.number} - Status: {contact?.status}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
