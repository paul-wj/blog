import React, {ReactElement, useEffect, useState} from "react";
import {UploadChangeParam} from "antd/lib/upload";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {message, Upload} from "antd";


interface UploadProps {
    value: string;
    onChange: (value: string) => void;
}

const getBase64 = (img: Blob, callback: (imageUrl?: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const HeaderUserModalUploadForm: React.FC<UploadProps> = ({value, onChange}: UploadProps): ReactElement => {

    const [loading, setLoading] = useState<boolean>(false);

    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        setImageUrl(value);
    }, [value]);

    const triggerChange = (changedValue: string) => {
        if (onChange) {
            onChange(changedValue);
        }
    };

    const handleChange = (info: UploadChangeParam) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, url => {
                setImageUrl(url);
                setLoading(false);
            });
            const {fileList: [{response}]} = info;
            triggerChange(response.result as string);
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    return (
        <Upload
          accept="image/jpg,image/jpeg,image/png"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="http://localhost:9000/upload"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
            {imageUrl ? <img src={imageUrl} alt="avatar" className="w100" /> : uploadButton}
        </Upload>
    )
};

export default HeaderUserModalUploadForm;
