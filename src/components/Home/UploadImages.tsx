import IconButton from '@material-ui/core/IconButton/IconButton';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CropOriginalOutlinedIcon from '@material-ui/icons/CropOriginalOutlined';
import { useStyles } from '../../pages/Home';
import ClearIcon from '@material-ui/icons/Clear';
import { ImgObj } from './WriteTweetForm';

type PropsType = {
  images: Array<ImgObj>;
  onChangeImages: (callback: (images: Array<ImgObj>) => Array<ImgObj>) => void;
};

export const UploadImages: React.FC<PropsType> = ({ onChangeImages, images }) => {
  const classes = useStyles();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickImg = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const removeImg = (url: string) => {
    onChangeImages((prev) => prev.filter((obj) => obj.blobUrl !== url));
  };

  const handleChangeFileInput = useCallback((event: Event) => {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const fileObj = new Blob([file]);
        onChangeImages((prev) => [
          ...prev,
          {
            blobUrl: URL.createObjectURL(fileObj),
            file,
          },
        ]);
      }
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('change', handleChangeFileInput);
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('change', handleChangeFileInput);
      }
    };
  }, []);
  return (
    <>
      <IconButton onClick={handleClickImg}>
        <CropOriginalOutlinedIcon color="primary" />
      </IconButton>
      <input ref={inputRef} type="file" style={{ display: 'none' }} id="uploadInput" />
      <div className={classes.listImg}>
        {images?.map((obj, key) => (
          <div
            key={key}
            style={{
              background: `url(${obj.blobUrl}) center center / cover`,
            }}
            className={classes.listImgItem}>
            <IconButton onClick={() => removeImg(obj.blobUrl)} className={classes.removeImg}>
              <ClearIcon style={{ fontSize: 18 }} />
            </IconButton>
          </div>
        ))}
      </div>
    </>
  );
};
