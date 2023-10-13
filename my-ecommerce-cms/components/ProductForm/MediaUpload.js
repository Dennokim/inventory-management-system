import React, { useState } from 'react';
import Button from '../common/Button';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import firebase_app from '../../pages/firebase/config';

const storage = getStorage(firebase_app);

const MediaUpload = ({ defaultValues = [], setValue }) => {
  const [imageSrc, setImageSrc] = useState([...defaultValues]);
  const [loading, setLoading] = useState(false);
  const handleOnChange = (changeEvent) => {
    const selectedFiles = changeEvent.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    selectedFilesArray.forEach(async (file) => {
      const storageRef = ref(storage, `media/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      setLoading(true);

      try {
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);
        setImageSrc(prevState => [...prevState, downloadURL]);
        setLoading(false);
      } catch (error) {
        console.error("Error uploading file: ", error);
        setLoading(false);
      }
    });
  };

  return (
    <form>
      <label htmlFor="media" className="mb-1 block text-sm text-gray-600">
        Upload multiple files
      </label>
      <input
        type="file"
        multiple
        name="media"
        onChange={handleOnChange}
        className="mb-3 w-full rounded-md border p-3 focus:border-sky-300 focus:ring-sky-300"
      />
      <div>
        <div className="mb-2 grid max-w-full grid-cols-2 gap-2 overflow-hidden">
          {imageSrc.map((i, idx) => (
            <div key={idx}>
              <img
                className="aspect-video max-h-40 flex-1 overflow-hidden rounded"
                src={i}
                alt=""
              />
            </div>
          ))}
        </div>
        {imageSrc.length ? (
          <Button
            variant="text"
            className="w-full"
            loading={loading}
            loadingText="Uploading..."
          >
            Upload
          </Button>
        ) : null}
      </div>
    </form>
  );
};

export default MediaUpload;
