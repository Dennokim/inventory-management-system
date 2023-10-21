import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import Button from '../common/Button';
import { Close } from '../common/icons/Close';
import CategoryForm from '../CategoryForm'; // Assuming you have a CategoryForm component
import firebase_app from '../../pages/firebase/config';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

const db = getFirestore(firebase_app);
const collectionRef = collection(db, 'categories'); // Update collection reference

const AddCategory = ({ props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const onFormSubmit = async (data) => {
    try {
      const docRef = await addDoc(collectionRef, data);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen} type="button" {...props}>
        Add Category
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          {/* Rest of the code remains the same */}
          <Dialog.Title
            as="div"
            className="mb-5 flex items-center justify-between text-lg font-semibold leading-6 text-gray-800"
          >
            <h3>Add Category</h3> {/* Update the title */}
            <Close onClick={handleClose} />
          </Dialog.Title>

          <CategoryForm type={'Add'} onFormSubmit={onFormSubmit} /> {/* Update the form component */}
        </Dialog>
      </Transition>
    </>
  );
};

export default AddCategory;
