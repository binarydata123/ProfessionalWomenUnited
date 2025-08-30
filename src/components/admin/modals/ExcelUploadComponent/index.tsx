import { useState, useRef } from 'react';
import Link from 'next/link';
import { importMembers } from '../../../../../lib/adminapi';
import DefaultButton from '@/commonUI/DefaultButton';
import { toast } from 'react-toastify';

interface ExcelUploadComponentProps {
    onImportSuccess?: () => void;
}

const ExcelUploadComponent = ({ onImportSuccess }: ExcelUploadComponentProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [progressPercent, setProgressPercent] = useState(0);
    const [currentStatus, setCurrentStatus] = useState('');

    const handleUpload = async () => {
        if (!file) {
            toast.error('Please select a file first');
            return;
        }

        // Check file extension
        const fileName = file.name.toLowerCase();
        const allowedExtensions = ['.xlsx', '.xls', '.csv'];
        const isValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

        if (!isValidExtension) {
            toast.error('Please select Excel (.xlsx, .xls) or CSV file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('File is too large. Maximum size is 5MB.');
            return;
        }

        setIsUploading(true);
        setProgressPercent(0);
        setCurrentStatus('Validating file...');

        try {
            setCurrentStatus('Checking file content...');

            const res = await importMembers(file);

            if (res.error) {
                toast.error(res.error);
                setIsUploading(false);
                return;
            }

            setCurrentStatus('Processing data...');
            setProgressPercent(30);

            const progressInterval = setInterval(() => {
                setProgressPercent(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return prev + 10;
                });
            }, 300);

            setTimeout(() => {
                clearInterval(progressInterval);
                setProgressPercent(100);
                setCurrentStatus('Processing complete!');

                if (res.duplicates && res.duplicates.length > 0) {
                    toast.warn(`${res.duplicates.length} duplicates found`);
                }

                if (res.inserted && res.inserted > 0) {
                    toast.success(`Imported ${res.inserted} new members successfully`);
                    setUploadSuccess(true);
                } else if (!res.duplicates || res.duplicates.length === 0) {
                    toast.info('No new members found to import');
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
                    setProgressPercent(0);
                }, 3000);

            }, 2000);

        } catch (err: any) {
            console.error('Upload error:', err);

            setIsUploading(false);
            setProgressPercent(0);

            if (err.response && err.response.data) {
                const errorData = err.response.data;

                if (errorData.errors && errorData.errors.file) {
                    toast.error(errorData.errors.file[0]);
                } else if (errorData.error) {
                    toast.error(errorData.error);
                } else if (errorData.message) {
                    toast.error(errorData.message);
                } else {
                    toast.error('Upload failed: Unknown error');
                }
            } else if (err.message) {
                toast.error(err.message);
            } else {
                toast.error('Upload failed. Please try again.');
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Check file type
            const fileName = selectedFile.name.toLowerCase();
            const allowedExtensions = ['.xlsx', '.xls', '.csv'];
            const isValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

            if (!isValidExtension) {
                toast.error('Please select Excel (.xlsx, .xls) or CSV file');
                return;
            }

            setFile(selectedFile);
        }
    };

    const closeModal = () => {
        if (!isUploading) {
            setIsModalOpen(false);
            setFile(null);
            setUploadSuccess(false);
            setProgressPercent(0);
        }
    };

    return (
        <div>
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
                        {!isUploading && !uploadSuccess && (
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

                        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
                            Import Excel Data
                        </h2>

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
                                                onClick={() => document.getElementById('fileInput')?.click()}
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
                                                onClick={() => document.getElementById('fileInput')?.click()}
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

                                {/* Progress Bar */}
                                {isUploading && progressPercent > 0 && (
                                    <div style={{ margin: '1.5rem 0' }}>
                                        <div style={{
                                            width: '100%',
                                            height: '8px',
                                            backgroundColor: '#e0e0e0',
                                            borderRadius: '4px',
                                            overflow: 'hidden',
                                            marginBottom: '0.5rem'
                                        }}>
                                            <div style={{
                                                height: '100%',
                                                backgroundColor: '#4CAF50',
                                                width: `${progressPercent}%`,
                                                transition: 'width 0.3s ease',
                                                borderRadius: '4px'
                                            }} />
                                        </div>
                                        <p style={{
                                            margin: '0.5rem 0',
                                            fontSize: '0.9rem',
                                            color: '#666',
                                            textAlign: 'center'
                                        }}>
                                            {currentStatus} ({progressPercent}%)
                                        </p>
                                    </div>
                                )}

                                <DefaultButton
                                    height={50}
                                    showIcon={false}
                                    className="w-100"
                                    onClick={handleUpload}
                                // disabled={!file || isUploading}
                                >
                                    {isUploading ? (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                border: '2px solid #f3f3f3',
                                                borderTop: '2px solid #C49073',
                                                borderRadius: '50%',
                                                animation: 'spin 1s linear infinite',
                                                marginRight: '10px'
                                            }}></div>
                                            {isUploading ? 'Uploading...' : 'Processing...'}
                                        </div>
                                    ) : (
                                        'Upload File'
                                    )}
                                </DefaultButton>

                                <div style={{
                                    marginTop: '1rem',
                                    fontSize: '0.9rem',
                                    color: '#666'
                                }}>
                                    <p>Supported formats: .xlsx, .xls, .csv</p>
                                    <p>Maximum 100 rows allowed</p>
                                    <p>Maximum file size: 5MB</p>
                                </div>
                            </div>
                        ) : (
                            <div style={{
                                textAlign: 'center',
                                padding: '2rem'
                            }}>
                                <div style={{
                                    fontSize: '3rem',
                                    color: '#4CAF50',
                                    marginBottom: '1rem'
                                }}>✓</div>
                                <h3 style={{
                                    color: '#4CAF50',
                                    marginBottom: '1rem'
                                }}>
                                    Data Uploaded Successfully!
                                </h3>
                                <p style={{ color: '#666' }}>
                                    Your Excel data has been imported successfully.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

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