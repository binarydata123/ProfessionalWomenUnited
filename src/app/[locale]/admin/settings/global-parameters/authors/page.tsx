'use client';
import React, { useState, useEffect, useContext } from 'react';
import Popup from '@/commonUI/Popup';
import Table from '@/commonUI/Table';
import {
    createOrUpdateAuthor,
    deleteAuthor
} from '../../../../../../../lib/adminapi';
import Pagination from '@/commonUI/Pagination';
import DeleteButton from '@/commonUI/TableActionButtons/DeleteButton';
import EditButton from '@/commonUI/TableActionButtons/EditButton';
import DefaultButton from '@/commonUI/DefaultButton';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { getAllAuthor } from '../../../../../../../lib/frontendapi';
import AuthContext from '@/context/AuthContext';
import { formatDateToDDMMYYYYMMAPPORVAL } from '@/app/[locale]/commonfunctions/commonfunctions';

interface FormData {
    id: number | string;
    name: string;
    description: string;
    designation: string;
    image: string;
    gender: string;
    linkedin: string;
}

export default function page() {
    const { user } = useContext(AuthContext)
    const [user_id, setUserId] = useState('');
    const [filter_lawyer, SetFilterLawyer] = useState([]);
    const [name, setName] = useState('');
    const [sort_by, setSortBy] = useState('');
    const [addNewService, setaddNewService] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        id: '',
        name: '',
        description: '',
        designation: '',
        image: '',
        gender: '',
        linkedin: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [service_id, setServiceId] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPageStr = process.env.NEXT_PUBLIC_ITEM_PER_PAGE ?? '0';
    const itemsPerPage = parseInt(itemsPerPageStr, 10);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentLawyer = filter_lawyer.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filter_lawyer.length / itemsPerPage);

    const [showMore, setShowMore] = useState(false);
    const toggleShowMore = () => setShowMore(!showMore);

    const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (user)
            user?.id ? setUserId(user?.id) : setUserId('');
        handleChange('sort_by', '');
    }, []);

    const handlePageChange = (newPage: any) => {
        setCurrentPage(newPage);
    };

    const handleChange = (inputName: any, value: any) => {
        setCurrentPage(1);

        switch (inputName) {
            case 'name':
                setName(value);
                break;
            case 'sort_by':
                setSortBy(value);
                break;
            default:
                break;
        }

        const data = {
            name: inputName === 'name' ? value : name,
            sort: inputName === 'sort_by' ? value : sort_by,
        };

        getAllAuthors(data);
    };

    const getAllAuthors = async (data: any) => {
        try {
            const response = await getAllAuthor(data);
            if (response.status == 'success') {
                SetFilterLawyer(response.data);
            } else {
                SetFilterLawyer([]);
            }
        } catch (error) {
            console.error('Error fetching:', error);
        }
    };

    const EditServices = (id: any, name: any, description: any, image: any, gender: any, designation: any) => {
        setServiceId(id);
        setFormData({
            ...formData,
            id: id,
            name: name,
            description: description,
            gender: gender,
            designation: designation,
            image: image
        });
        setProfileImagePreview(`${process.env.NEXT_PUBLIC_IMAGE_URL}/professional-women/Blogs/${image}`)
        setaddNewService(true);
    };

    const changeUserStatus = (id: any, updated_status: any) => {
        // Show a confirmation dialog

        Swal.fire({
            title: 'Are you sure?',
            text: 'You Want to remove the service',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#02142d',
            cancelButtonColor: '#D04E4F',
            confirmButtonText: 'Yes'
        }).then(result => {
            if (result.isConfirmed) {
                try {
                    deleteAuthor(id)
                        .then(res => {
                            if (res.status == 'success') {
                                handleChange('sort_by', sort_by);
                                Swal.fire('Success!', res.message, 'success');
                            } else {
                                console.error('An error occurred');
                            }
                        })
                        .catch(err => {
                            if (err.response) {
                                console.error('An error occurred');
                            }
                        });
                } catch (error) {
                    console.error(error);
                }
            }
        });
    };

    function validateForm() {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) {
            newErrors.name = 'Author name is required';
        }
        if (!formData.designation) {
            newErrors.designation = 'Please enter your designation';
        }
        if (!formData.description) {
            newErrors.description = 'Description is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        const isValid = validateForm();
        if (isValid) {
            const data = {
                name: formData.name,
                description: formData.description,
                profile_image: formData.image,
                id: formData.id,
                gender: formData.gender,
                designation: formData.designation,
                linkedin: formData.linkedin
            };
            createOrUpdateAuthor(data)
                .then(res => {
                    if (res.status == 'success') {
                        toast.success(res.message);
                        handleChange('sort_by', sort_by);
                        setaddNewService(false);
                    } else {
                        toast.error(res.message);
                    }
                })
                .catch(err => {
                    if (err.response) {
                        toast.error('An error occurred');
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }

    const handleProFileInputChange = (event: any) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        setFormData({ ...formData, image: selectedFile })
        if (selectedFile.type.includes('image')) {
            if (selectedFile) {
                setProfileImagePreview(URL.createObjectURL(selectedFile));
            }
        } else {
            toast.error('Please upload an valid image file (JPEG,JPG,PNG).');
        }
    };

    const restform = () => {
        setServiceId('');
        setFormData({
            ...formData,
            id: '',
            name: '',
            description: '',
            image: '',
            gender: '',
            designation: ''
        });
        setProfileImagePreview('');
        setaddNewService(true);
    };

    return (
        <div>
            <div className="form-part mt-2">
                <div className="row align-items-center g-3">
                    <div className="col-sm-6 col-md-6 col-lg-3">
                        <div className="icon-fild icon-g p-set position-relative">
                            <input
                                type="text"
                                placeholder="Search for a professional services"
                                className="form-fild w-100 sp-right"
                                value={name}
                                onChange={e => handleChange('name', e.target.value)}
                            />
                            <Image
                                src="/images/search-normal.png"
                                width={24}
                                height={24}
                                alt="cdd"
                                className="magnify-search"
                            />
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-6 col-lg-3">
                        <select
                            className="form-fild add-icon w-100"
                            value={sort_by}
                            onChange={e => handleChange('sort_by', e.target.value)}
                        >
                            <option value={''}>Sort By</option>
                            <option value={'oldest'}>Oldest</option>
                            <option value={'newest'}>Newest</option>
                        </select>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6 text-end">
                        <DefaultButton
                            showIcon={false}
                            height={53}
                            onClick={() => {
                                restform();
                            }}
                        >
                            <p className="w-100 d-flex align-items-center justify-content-center create-blo">
                                <span className="plues-icon">+</span> Add Author
                            </p>
                        </DefaultButton>
                    </div>
                </div>
            </div>

            <p className="font-small weight-light social-link mt-3 mb-3">
                Displaying <span className="span-color-dash weight-bold">{filter_lawyer.length}</span> professional services
            </p>

            <div className="table-part mt-3">
                <Table
                    columns={['Name', 'Designation', 'Description', 'Created On', 'Status', 'Actions']}
                    data={currentLawyer}
                >
                    {(rowData, index) => (
                        <tr key={index}>
                            <td data-th="Name" width={200}>
                                <p className="font-small weight-light social-link text-capitalize" title="View Profile">
                                    {rowData.name && rowData.name.length > 20
                                        ? rowData.name.substring(0, 20) + '...'
                                        : rowData.name}
                                </p>
                            </td>
                            <td data-th="Designation">
                                {rowData.designation}
                            </td>
                            <td data-th="Description" width={'30%'}>
                                <p className="font-small weight-light text-sonic-silver">
                                    {showMore
                                        ? rowData?.description
                                        : `${rowData?.description.slice(0, 50)}${rowData?.description.length > 50 ? '...' : ''
                                        }`}
                                </p>

                                {rowData.description.length > 250 && (
                                    <a
                                        href="JavaScript:void(0)"
                                        onClick={toggleShowMore}
                                        className="green-medium-2  font-x-small weight-semi-bold"
                                    >
                                        {' '}
                                        {showMore ? 'Show Less' : 'Show More'}{' '}
                                    </a>
                                )}
                            </td>
                            <td data-th="Created On" width={150}>
                                <p className="font-x-small social-link weight-medium">
                                    {formatDateToDDMMYYYYMMAPPORVAL(rowData.created_at)}
                                </p>
                            </td>
                            <td data-th="Status">
                                <p className="font-x-small social-link weight-medium">
                                    {rowData.status}
                                </p>
                            </td>
                            <td data-th="Actions " className="text-right ">
                                <EditButton
                                    Tooltip="Edit"
                                    onClick={e =>
                                        EditServices(
                                            rowData?.id,
                                            rowData?.name,
                                            rowData?.description,
                                            rowData?.profile_image,
                                            rowData?.gender,
                                            rowData?.designation,
                                        )
                                    }
                                />
                                <DeleteButton
                                    Tooltip="Delete Service"
                                    onClick={e => changeUserStatus(rowData?.id, 'deleted')}
                                />
                            </td>
                        </tr>
                    )}
                </Table>
            </div>

            {currentLawyer.length > 0 && (
                <div className="text-right mt-5 m-none float-end">
                    <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
                </div>
            )}
            <Popup
                size="lg"
                show={addNewService}
                title={service_id ? 'Edit author' : 'Add new author'}
                onCancel={() => setaddNewService(false)}
                onOk={() => setaddNewService(false)}
                footer={false}
            >
                <form className="mt-2" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-sm-8">
                            <label className="font-small  weight-medium text-sonic-silver w-100">Full name</label>
                        </div>
                        <div className="col-sm-4 text-right">
                            <p className="Chinese-silver font-x-small weight-light">100</p>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        className="form-fild  w-100"
                        value={formData.name}
                        maxLength={100}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />

                    {errors.name && <small className="error-message text-danger">{errors.name}</small>}

                    <div className="row mt-4">
                        <div className="col-sm-8">
                            <label className="font-small  weight-medium text-sonic-silver w-100">Designation</label>
                        </div>
                        <div className="col-sm-4 text-right">
                            <p className="Chinese-silver font-x-small weight-light">100</p>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Enter your designation"
                        className="form-fild  w-100"
                        value={formData.designation}
                        maxLength={100}
                        onChange={e => setFormData({ ...formData, designation: e.target.value })}
                    />

                    {errors.name && <small className="error-message text-danger">{errors.designation}</small>}

                    <label className="font-small  weight-medium text-sonic-silver w-100 mt-4">Description</label>

                    <textarea
                        className="form-fild  w-100 h-129"
                        value={formData.description}
                        placeholder="Write legal description here.."
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    >
                        {' '}
                    </textarea>

                    {errors.description && <small className="error-message text-danger">{errors.description}</small>}

                    <div className="row mt-4">
                        <div className="col-sm-8">
                            <label className="font-small  weight-medium text-sonic-silver w-100">Linkedin</label>
                        </div>
                        <div className="col-sm-4 text-right">
                            <p className="Chinese-silver font-x-small weight-light">100</p>
                        </div>
                    </div>
                    <input
                        type="url"
                        placeholder="Enter Linkedin url.."
                        className="form-fild  w-100"
                        value={formData.linkedin}
                        maxLength={200}
                        onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                    />

                    {errors.seo_meta_title && <small className="error-message text-danger">{errors.seo_meta_title}</small>}

                    <label className="font-small  weight-medium text-sonic-silver w-100 mt-2">Gender</label>

                    <select
                        placeholder="Select gender"
                        className="form-fild  w-100"
                        value={formData.gender}
                        onChange={e => setFormData({ ...formData, gender: e.target.value })}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    {errors.seo_meta_description && <small className="error-message text-danger">{errors.seo_meta_description}</small>}

                    <div className="row">
                        <div className="col-sm-12 col-12">
                            <div className="file-btn-upload mt-3">
                                <input
                                    type="file"
                                    className="file-up w-100"
                                    onChange={handleProFileInputChange}
                                    accept="image/jpeg, image/png"
                                />
                                <button type="button" className="bg-893168 weight-semi-bold font-small save-pad">
                                    <i className="fa-solid fa-image" onChange={handleProFileInputChange}></i> &nbsp;
                                    Upload Profile Image
                                </button>
                            </div>
                            {profileImagePreview && (
                                <img
                                    src={profileImagePreview}
                                    alt="Preview"
                                    className="mt-2"
                                    height={100}
                                    width={100}
                                    style={{ objectFit: 'contain' }}
                                />
                            )}
                        </div>
                    </div>


                    <div className="modal-ft">
                        <div className="row mt-4">
                            <div className="col-sm-3 col-4">
                                <button
                                    type="button"
                                    onClick={() => setaddNewService(false)}
                                    className="btn btn-cancel w-100 save-pad"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                            </div>
                            <div className="col-sm-9 col-8">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-893168 weight-semi-bold font-small w-100  mar-top-min b-r-btn save-pad"
                                >
                                    {!isLoading ? (service_id ? 'Udpate' : 'Save') : 'Please wait...'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Popup>
        </div>
    );
}
