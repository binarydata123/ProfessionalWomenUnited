import { useState } from 'react';
import Link from 'next/link';
import { importMembers } from '../../../../../lib/adminapi';
import DefaultButton from '@/commonUI/DefaultButton';
import { toast } from 'react-toastify';

interface ExcelUploadComponentProps {
    onImportSuccess?: () => void; // Function to call after successful import
}
const ExcelUploadComponent = ({ onImportSuccess }: ExcelUploadComponentProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [resData, setResData] = useState<any>(null);

    // const handleUpload = async () => {
    //     if (!file) {
    //         toast.error('Please select a file first');
    //         return;
    //     }
    //     setIsUploading(true);
    //     try {
    //         const res = await importMembers(file);
    //         console.log(res, 'ddg')
    //         toast.success(res.message);
    //         // Show success message
    //         setUploadSuccess(true);

    //         if (onImportSuccess) {
    //             onImportSuccess();
    //         }

    //         // Close modal after 2 seconds
    //         setTimeout(() => {
    //             setIsModalOpen(false);
    //             setUploadSuccess(false);
    //             setFile(null);
    //             setIsUploading(false);
    //         }, 2000);

    //     } catch (err) {
    //         console.error(err);
    //         // alert('Upload failed');
    //         toast.error('Upload failed');
    //         setIsUploading(false);

    //     }
    // };
    const handleUpload = async () => {
        if (!file) {
            toast.error('Please select a file first');
            return;
        }
        setIsUploading(true);
        try {
            const res = await importMembers(file);
            console.log(res, 'ddg');
            setResData(res);

            if (res.duplicates.length > 0) {
                toast.warn(`Already exist: ${res.duplicates.join(', ')}`);
            }

            if (res.inserted.length > 0) {
                toast.success(`Imported new: ${res.inserted.join(', ')}`);
                setUploadSuccess(true); // success popup for inserted
            } else if (res.duplicates.length === 0) {
                // case: no inserted + no duplicates = empty file
                setUploadSuccess(true);
            }

            if (onImportSuccess) {
                onImportSuccess();
            }

            setTimeout(() => {
                setIsModalOpen(false);
                setUploadSuccess(false);
                setFile(null);
                setIsUploading(false);
                setResData(null);
            }, 2000);

        } catch (err) {
            console.error(err);
            toast.error('Upload failed');
            setIsUploading(false);
        }
    };



    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const closeModal = () => {
        if (!isUploading) {
            setIsModalOpen(false);
            setFile(null);
            setUploadSuccess(false);
        }
    };

    return (
        <div>
            {/* Trigger Button */}
            <Link href='' onClick={(e) => e.preventDefault()}>
                <DefaultButton
                    height={55}
                    showIcon={false}
                    className="w-100 mt-1"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Import Excel Data
                </DefaultButton>
            </Link>

            {/* Upload Modal */}
            {isModalOpen && (
                <div className="modal-backdrop" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '12px',
                        width: '90%',
                        maxWidth: '500px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                    }}>
                        {/* Close Button */}
                        {!isUploading && (
                            <button
                                onClick={closeModal}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                ×
                            </button>
                        )}

                        {/* Modal Header */}
                        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
                            Import Excel Data
                        </h2>

                        {/* Upload Area */}
                        {!uploadSuccess ? (
                            <div>
                                <div
                                    className="upload-area"
                                    style={{
                                        border: '2px dashed #C49073',
                                        borderRadius: '8px',
                                        padding: '2rem',
                                        textAlign: 'center',
                                        marginBottom: '1.5rem',
                                        backgroundColor: '#fef7ed'
                                    }}
                                >
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".xlsx,.xls,.csv"
                                        disabled={isUploading}
                                        style={{ display: 'none' }}
                                        id="fileInput"
                                    />

                                    {file ? (
                                        <div>
                                            <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                                                Selected file: {file.name}
                                            </p>
                                            <button
                                                // onClick={() => document.getElementById('fileInput').click()}
                                                onClick={() => {
                                                    const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
                                                    if (fileInput) {
                                                        fileInput.click();
                                                    }
                                                }}
                                                disabled={isUploading}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    border: '1px solid #C49073',
                                                    borderRadius: '4px',
                                                    backgroundColor: 'white',
                                                    cursor: isUploading ? 'not-allowed' : 'pointer'
                                                }}
                                            >
                                                Change File
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <p style={{ marginBottom: '1rem' }}>
                                                Drag & drop your Excel file here or
                                            </p>
                                            <button
                                                // onClick={() => document.getElementById('fileInput').click()}
                                                onClick={() => {
                                                    const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
                                                    if (fileInput) {
                                                        fileInput.click();
                                                    }
                                                }}
                                                disabled={isUploading}
                                                style={{
                                                    padding: '0.75rem 1.5rem',
                                                    backgroundColor: '#C49073',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: isUploading ? 'not-allowed' : 'pointer',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                Browse Files
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Upload Button */}
                                <DefaultButton
                                    height={50}
                                    showIcon={false}
                                    className="w-100"
                                    onClick={handleUpload}
                                // disabled={!file || isUploading}
                                // style={{
                                //     opacity: (!file || isUploading) ? 0.6 : 1,
                                //     cursor: (!file || isUploading) ? 'not-allowed' : 'pointer'
                                // }}
                                >
                                    {isUploading ? (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div className="spinner" style={{
                                                width: '20px',
                                                height: '20px',
                                                border: '2px solid #f3f3f3',
                                                borderTop: '2px solid #C49073',
                                                borderRadius: '50%',
                                                animation: 'spin 1s linear infinite',
                                                marginRight: '10px'
                                            }}></div>
                                            Uploading...
                                        </div>
                                    ) : (
                                        'Upload File'
                                    )}
                                </DefaultButton>

                                {/* Instructions */}
                                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                                    <p>Supported formats: .xlsx, .xls, .csv</p>
                                </div>
                            </div>
                        ) : (

                            resData?.inserted?.length > 0 ? (
                                // ✅ Success popup (data inserted)
                                <div style={{ textAlign: 'center', padding: '2rem' }}>
                                    <div style={{ fontSize: '3rem', color: '#4CAF50', marginBottom: '1rem' }}>✓</div>
                                    <h3 style={{ color: '#4CAF50', marginBottom: '1rem' }}>
                                        Data Uploaded Successfully!
                                    </h3>
                                    <p style={{ color: '#666' }}>
                                        Your Excel data has been imported successfully.
                                    </p>
                                </div>
                            ) : (
                                // ⚠️ Empty file popup (no inserted + no duplicates)
                                <div style={{ textAlign: 'center', padding: '2rem' }}>
                                    <div style={{ fontSize: '3rem', color: '#4CAF50', marginBottom: '1rem' }}>✓</div>
                                    <h3 style={{ color: '#4CAF50', marginBottom: '1rem' }}>
                                        Data Uploaded Successfully!
                                    </h3>
                                    <p style={{ color: '#666' }}>
                                        Your Excel data has been imported successfully.
                                    </p>
                                </div>
                            )


                        )}

                    </div>
                </div>
            )}

            {/* Add spinner animation */}
            <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .upload-area:hover {
          background-color: #fed7aa !important;
          transition: background-color 0.3s ease;
        }
      `}</style>
        </div>
    );
};

export default ExcelUploadComponent;