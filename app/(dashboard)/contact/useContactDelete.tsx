// hooks/useContactDelete.ts
import axios from 'axios';
import toast from 'react-hot-toast';

export const useContactDelete = async (id: string): Promise<void> => {
  try {
    const response = await axios.post(`/api/contacts/remove`, { id });
    toast.success(response?.data?.msg);
  } catch (error) {
    toast.error(error?.data?.error || 'An error occurred while deleting the contact.');
  }
};
