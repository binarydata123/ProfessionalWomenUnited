import React, { useState, useEffect, useContext } from 'react';
import { createOrUpdateFirmByAdmin } from '../../../../../lib/adminapi';
import { toast } from 'react-toastify';
import AuthContext from '@/context/AuthContext';
import { getAllCountries, getAllServices } from '../../../../../lib/frontendapi';
import { getAllSpecialization } from '../../../../../lib/adminapi';
import { RiCloseLine } from 'react-icons/ri';
import './style.css';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => import('../../../../commonUI/TextEditor'), {
    ssr: false
});

interface AddFirmProps {
    firmDetails: any;
    onCancel: () => void;
    firmId: any;
}
interface FormData {
    id: string;
    firm_name: string;
    slug: string;
    image: string;
    bio: string;
    contact_no: string;
    website_url: string;
    linkedin_url: string;
    country_id: string;
    service_id: string[];
    service: string[];
    specialization_id: string;
    created_by: string;
    specialization: string;
}
interface Specialization {
    id: any;
    name: any;
}

export default function AddFirm({ firmDetails, onCancel, firmId }: AddFirmProps) {

    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext)
    const [allCountries, setCountries] = useState([]);
    const [allservices, setServices] = useState([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [allSpecialization, setSpecializations] = useState<Specialization[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [imageError, setImageError] = useState<string | null>(null);

    const [formData, setFormData] = useState<FormData>({
        id: '',
        firm_name: '',
        slug: '',
        image: '',
        bio: '',
        contact_no: '',
        website_url: '',
        linkedin_url: '',
        country_id: '',
        service_id: [],
        service: [],
        specialization_id: '',
        created_by: user?.id || '',
        specialization: ''
    });

    const generateSlug = (firm_name: any) => {
        return firm_name
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };
    const getAllCountriesData = async () => {
        try {
            const res = await getAllCountries();
            if (res.status == true) {
                setCountries(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const getAllServicesData = async () => {
        try {
            const res = await getAllServices();
            if (res.status == true) {
                setServices(res.data);

            }
        } catch (err) {
            console.log(err);
        }
    };

    function addPracticeArea(event: any) {
        event.preventDefault();
        if (formData.service.length < 3) {
            const newPracticeAreas = [...formData.service, ''];
            setFormData({
                ...formData,
                service: newPracticeAreas
            });
        } else {
            toast.error('Maximum 3 practice area can be added.');
        }
    }

    function handlePracticeAreaChange(index: number, value: string) {
        const newPracticeAreas = [...formData.service];
        newPracticeAreas[index] = value;
        setFormData({
            ...formData,
            service: newPracticeAreas
        });
    }
    const practiceAreaInputs = formData.service.map((area, index) => (
        <div key={index}>
            <label className="font-small weight-medium text-sonic-silver w-100 mt-4 d-flex justify-content-between">
                Practice Area {index + 1}
                <span className="remove-spcl log-red" onClick={() => removePracticeArea(index)}>
                    Remove
                </span>
            </label>
            <select
                className="form-fild w-100"
                value={area} // Set value based on formData.service at current index
                onChange={e => handlePracticeAreaChange(index, e.target.value)}
            >
                <option value="">Select Practice Area</option>
                {allservices.map((services: any) => (
                    <option key={services.id} value={services.id}>
                        {services.name}
                    </option>
                ))}
            </select>
            {errors.primary_practice_area && (
                <small className="error-message text-danger d-block">{errors.primary_practice_area}</small>
            )}
        </div>
    ));


    function removePracticeArea(index: number) {
        const newPracticeAreas = [...formData.service];
        newPracticeAreas.splice(index, 1);
        setFormData({
            ...formData,
            service: newPracticeAreas
        });
    }
    function validateForm() {
        const newErrors: { [key: string]: string } = {};
        if (!formData.firm_name) {
            newErrors.firm_name = 'Firm name is required';
        }
        if (!formData.country_id) {
            newErrors.country_id = 'Location is required';
        }
        if (!formData.contact_no) {
            newErrors.contact_no = 'Contact Number is required';
        }
        if (!firmId && !image) {
            newErrors.image = 'Image is required';
        }
        // if (!formData.website_url) {
        //     newErrors.website_url = 'Website Url is required';
        // }
        // if (!formData.linkedin_url) {
        //     newErrors.linkedin_url = 'Linkedin Url is required';
        // }
        if (!formData.bio) {
            newErrors.bio = 'Bio is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleDescriptionChange = (newValue: string) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            bio: newValue
        }));
    };


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        const isValid = validateForm();

        if (isValid) {
            const imageData = image ? image : firmDetails.image;
            const serviceIdsFromForm = formData.service_id ? formData.service_id : '';
            const additionalServiceIds = formData.service ? formData.service.join(',') : '';
            const combinedServiceIds = [serviceIdsFromForm, additionalServiceIds].filter(Boolean).join(',');

            let createdByValue = user?.id;
            if (formData.created_by !== user?.id) {
                createdByValue = formData.created_by;
            }

            const data = {
                p_id: firmId,
                firm_name: formData.firm_name,
                slug: generateSlug(formData.firm_name),
                bio: formData.bio,
                contact_no: formData.contact_no,
                website_url: formData.website_url,
                linkedin_url: formData.linkedin_url,
                country_id: formData.country_id,
                service_id: combinedServiceIds,
                specialization_id: selectedOptions.join(','),
                created_by: createdByValue,
                status: 'active',
                image: imageData,
                user_id: user?.id,

            };
            createOrUpdateFirmByAdmin(data)
                .then(res => {
                    if (res.status == true) {
                        toast.success(res.message);
                        onCancel();
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
    useEffect(() => {
        if (firmDetails && firmDetails.length > 0 && firmId) {
            const matchedFirm = firmDetails.find((firm: FormData) => firm.id === firmId);
            if (matchedFirm) {

                const imageUrl = matchedFirm.image
                    ? process.env.NEXT_PUBLIC_IMAGE_URL + '/connect-Legal/Blogs/' + matchedFirm.image
                    : '/images/profile-circle.png';
                setImagePreview(imageUrl);

                // Check if specialization_id is not null
                const specializationIds = matchedFirm.specialization_id
                    ? matchedFirm.specialization_id.split(',').map(Number)
                    : [];
                // Split the service_id string into an array of individual values
                const serviceIdsArray = matchedFirm.service_id
                    ? matchedFirm.service_id.split(',').map(Number)
                    : [];
                // console.log(serviceIdsArray);

                const dataToProcess = serviceIdsArray.slice(1);

                setFormData({
                    ...formData,
                    firm_name: matchedFirm.firm_name || '',
                    bio: matchedFirm.bio || '',
                    contact_no: matchedFirm.contact_no || '',
                    website_url: matchedFirm.website_url || '',
                    linkedin_url: matchedFirm.linkedin_url || '',
                    country_id: matchedFirm.country_id || '',
                    specialization_id: matchedFirm.specialization_id || '',
                    service: dataToProcess,
                    // service_id: matchedFirm.service_id[0],
                    service_id: (matchedFirm?.service_id && matchedFirm.service_id[0]) || '',
                    created_by: matchedFirm.created_by || '',
                    image: imageUrl || '',

                });
                setSelectedOptions(specializationIds);

            }
        }
        getAllCountriesData();
        getAllServicesData();
        hnadleGetAllSpecialization(user?.id);
    }, [firmDetails, firmId]);


    const handleFileInputChange = (event: any) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        setImage(selectedFile);
        if (selectedFile.type.includes('image')) {
            if (selectedFile) {
                setImagePreview(URL.createObjectURL(selectedFile));
            }
        } else {
            toast.error('Please upload an valid image file (JPEG,JPG,PNG).');
        }
    };

    const hnadleGetAllSpecialization = async (id: any) => {
        try {
            const res = await getAllSpecialization(id);
            if (res.status == true) {
                setSpecializations(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const options = allSpecialization.map(item => ({
        id: item.id,
        value: item.name
    }));
    const handleOptionClick = (option: { id: number; value: string }) => {
        if (selectedOptions.includes(option.id)) {
            toast.error('Option already selected');
        } else if (selectedOptions.length >= 5) {
            toast.error('You can only select up to 5 specialization');
        } else {
            const updatedSelectedOptions = [...selectedOptions, option.id];
            setSelectedOptions(updatedSelectedOptions);

            const selectedSpecializationIds = updatedSelectedOptions.join(',');
            setFormData(prevFormData => ({
                ...prevFormData,
                selectedSpecializationIds,
                specialization: ''
            }));
        }
    };

    const handleRemoveOption = (index: number) => {
        const updatedOptions = [...selectedOptions];
        updatedOptions.splice(index, 1);
        const selectedSpecializationIds = updatedOptions.join(',');
        setSelectedOptions(updatedOptions);
        setFormData(prevFormData => ({
            ...prevFormData,
            selectedSpecializationIds
        }));
    };

    return (
        <>
            <form className="mt-2" onSubmit={handleSubmit} >
                <p className="weight-medium font-small color-light">Fill all details about the company</p>
                <p className="font-small  weight-medium text-sonic-silver mt-2">Profile Picture</p>
                <div className="row mb-1 align-items-center">
                    <div className="col-sm-2 col-3 pr-0 mt-1">
                        {imagePreview ? (
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                className="mt-2"
                                height={100}
                                width={100}
                                style={{ objectFit: 'contain' }}
                            />
                        ) : (
                            <Image
                                src={
                                    process.env.NEXT_PUBLIC_IMAGE_URL +
                                    '/images/default/Profile Avatar.png'
                                }
                                height={100}
                                width={100}
                                alt="Preview"
                                style={{ objectFit: 'contain' }}
                                className="img-circle"
                            />
                        )}
                    </div>
                    <div className="col-sm-10 col-9">
                        <div className="file-btn-upload  d-md-flex">
                            <input type="file" className="file-up" onChange={handleFileInputChange} />
                            <button className="bg-893168 weight-semi-bold font-small save-pad">
                                <img
                                    src="/images/gallery-add.png"
                                    alt="Upload Icon"
                                    className="img-set"
                                    onChange={handleFileInputChange}
                                />{' '}
                                &nbsp; Upload Picture
                            </button>{' '}
                        </div>
                    </div>

                </div>
                {errors.image && (
                    <small className="error-message text-danger d-block">{errors.image}</small>
                )}

                <div className="row">
                    <div className="col-sm-8">
                        <label className="font-small  weight-medium text-sonic-silver w-100 mb-2">
                            Company Name
                        </label>
                    </div>
                </div>
                <input
                    type="text"
                    placeholder="Company Name"
                    className="form-fild  w-100"
                    maxLength={100}
                    value={formData.firm_name}
                    onChange={e => setFormData({ ...formData, firm_name: e.target.value })}
                />
                {errors.firm_name && (
                    <small className="error-message text-danger d-block">{errors.firm_name}</small>
                )}
                <br />
                <div className="row  mt-2">
                    <div className="col-sm-8">
                        <label className="font-small  weight-medium text-sonic-silver w-100 mb-2">
                            Location
                        </label>
                    </div>
                </div>
                <select
                    className="form-fild  w-100"
                    value={formData.country_id}
                    onChange={(e) => setFormData({ ...formData, country_id: e.target.value })}
                >
                    <option value="">Select Location</option>
                    {allCountries.map((countries: any) => (
                        <option key={countries.id} value={countries.id}>
                            {countries.name}
                        </option>
                    ))}
                </select>
                {errors.country_id && (
                    <small className="error-message text-danger d-block">{errors.country_id}</small>
                )}

                <div className="row mt-2">
                    <div className="col-sm-8">
                        <label className="font-small  weight-medium text-sonic-silver w-100 mb-2">
                            Contact Number
                        </label>
                    </div>
                </div>
                <input
                    type="number"
                    placeholder="Contact Number"
                    className="form-fild  w-100"
                    maxLength={12}
                    value={formData.contact_no}
                    // onChange={e => setFormData({ ...formData, contact_no: e.target.value })}
                    onChange={e => {
                        const input = e.target.value;
                        if (/^\d{0,12}$/.test(input)) {
                            setFormData({ ...formData, contact_no: input });
                        }
                    }}
                />
                <br />
                {errors.contact_no && (
                    <small className="error-message text-danger d-block">{errors.contact_no}</small>
                )}
                <div className="row mt-2">
                    <div className="col-sm-8">
                        <label className="font-small  weight-medium text-sonic-silver w-100 mb-2">
                            LinkedIn
                        </label>
                    </div>
                </div>
                <input
                    type="url"
                    placeholder="LinkedIn Url"
                    className="form-fild  w-100"
                    maxLength={100}
                    value={formData.linkedin_url}
                    onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })}
                />
                {/* {errors.linkedin_url && (
                    <small className="error-message text-danger d-block">{errors.linkedin_url}</small>
                )} */}

                <div className="row mt-2">
                    <div className="col-sm-8">
                        <label className="font-small  weight-medium text-sonic-silver w-100 mb-2">
                            Website
                        </label>
                    </div>
                </div>

                <input
                    type="url"
                    placeholder="Website Url"
                    className="form-fild  w-100"
                    maxLength={100}
                    value={formData.website_url}
                    onChange={e => setFormData({ ...formData, website_url: e.target.value })}
                />
                {/* {errors.website_url && (
                    <small className="error-message text-danger d-block">{errors.website_url}</small>
                )} */}
                <br />
                <div className="row mt-2">
                    <div className="col-sm-8">
                        <label className="font-small  weight-medium text-sonic-silver w-100 mb-2">
                            Primary Practice Area
                        </label>
                    </div>
                </div>
                <select
                    className="form-fild  w-100"
                    value={formData.service_id[0]}
                    onChange={e =>
                        setFormData({
                            ...formData,
                            service_id: [e.target.value]
                        })
                    }
                >
                    <option value="">Select Practice Area</option>
                    {allservices.map((services: any) => (
                        <option key={services.id} value={services.id}>
                            {services.name}
                        </option>
                    ))}
                </select>

                {practiceAreaInputs}
                <p className="mt-3">
                    <a
                        href="#"
                        onClick={addPracticeArea}
                        className="font-small weight-semi-bold green-medium-2 "
                    >
                        <i className="fa-solid fa-square-plus"></i> Add Practice Area{' '}
                    </a>
                </p>


                <div className="row mt-2">
                    <div className="col-sm-8">
                        <label className="font-small  weight-medium text-sonic-silver w-100 mb-2">
                            Specialization
                        </label>
                    </div>
                </div>

                <div className="icon-fild p-set mt-1 position-relative">
                    <input
                        type="text"
                        placeholder=""
                        className="form-fild w-100"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                    />
                    <Image
                        src="/images/search-normal.svg"
                        alt="search-normal"
                        className="magnify-search"
                        width={20}
                        height={20}
                    />
                </div>

                {formData.specialization && (
                    <ul className="options-list">
                        {options
                            .filter(option =>
                                option.value
                                    .toLowerCase()
                                    .includes(formData.specialization.toLowerCase())
                            )
                            .map((option, index) => (
                                <li key={option.id} onClick={() => handleOptionClick(option)}>
                                    {option.value}
                                </li>
                            ))}
                    </ul>
                )}

                <div className="selected-options">
                    {selectedOptions.map((optionId, index) => {
                        const selectedOption = options.find(opt => opt.id === optionId);
                        return (
                            <div key={index} className="selected-option">
                                {selectedOption ? selectedOption.value : ''}
                                <RiCloseLine
                                    className="remove-spcl"
                                    width={20}
                                    onClick={() => handleRemoveOption(index)}
                                />
                            </div>
                        );
                    })}
                </div>
                <label className="font-small  weight-medium text-sonic-silver w-100 mt-3 pb-2">Bio</label>
                {/* <textarea
                    className="form-fild  w-100 h-129 "
                    placeholder="Share more about this company..."
                    value={formData.bio}
                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                ></textarea> */}
                <TextEditor
                    height={100}
                    value={formData.bio && formData.bio}
                    onChange={handleDescriptionChange}
                />
                {errors.bio && (
                    <small className="error-message text-danger d-block mt-5">{errors.bio}</small>
                )}
                <br></br>
                <div className="modal-ft">
                    <div className="row mt-4">
                        <div className="col-sm-3 col-4">
                            <button
                                type="button"
                                className="btn btn-cancel w-100 save-pad cancel-class"
                                data-bs-dismiss="modal"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                        </div>
                        <div className="col-sm-9 col-8">
                            <button
                                type="submit"
                                // disabled={isLoading}
                                className="bg-893168 weight-semi-bold font-small w-100  mar-top-min b-r-btn save-pad"
                            >
                                {/* {!isLoading ? (firmId ? 'Update' : 'Save & Publish') : 'Please wait...'} */}
                                {firmId ? 'Update' : 'Save & Publish'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
