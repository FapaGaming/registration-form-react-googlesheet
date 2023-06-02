import "./form.css";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { regions, provinces, cities, barangays } from 'select-philippines-address';
import { useEffect, useState } from "react";

const validationSchema = yup.object({
    firstName: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    phone: yup.string().required('street is required'),
    email: yup.string().required('street is required'),
});

export default function Form() {

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            street: '',
            city: '',
            zip: '',
            region: '',
            province: '',
            phone: '',
            email: '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });
    const [streetData, setStreet] = useState([]);
    const [regionData, setRegion] = useState([]);
    const [provinceData, setProvince] = useState([]);
    const [cityData, setCity] = useState([]);
    const [barangayData, setBarangay] = useState([]);

    const [streetAddr, setStreetAddr] = useState("");
    const [regionAddr, setRegionAddr] = useState("");
    const [provinceAddr, setProvinceAddr] = useState("");
    const [cityAddr, setCityAddr] = useState("");
    const [barangayAddr, setBarangayAddr] = useState("");



    const region = () => {
        regions().then(response => {
            setRegion(response);
        });
    }

    const province = (e) => {
        setRegionAddr(e.target.selectedOptions[0].text);
        provinces(e.target.value).then(response => {
            setProvince(response);
            setCity([]);
            setBarangay([]);
        });
    }

    const city = (e) => {
        setProvinceAddr(e.target.selectedOptions[0].text);
        cities(e.target.value).then(response => {
            setCity(response);
        });
    }

    const barangay = (e) => {
        setCityAddr(e.target.selectedOptions[0].text);
        barangays(e.target.value).then(response => {
            setBarangay(response);
        });
    }

    const brgy = (e) => {
        setBarangayAddr(e.target.selectedOptions[0].text);
    }

    useEffect(() => {
        region()
    }, [])


    return (
        <div className="container">
            <form method="POST" class="needs-validation" novalidate>
                <div class="row row-space">
                    <div class="col-2">
                        <div class="input-group-flex">
                            <label className="form-label" htmlFor="firstname" required="required">Firstname</label>
                            <input className="form-control" id="firstname" required="required" type="text" onChange={formik.handleChange} value={formik.values.firstname} />
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="input-group-flex">
                            <label className="form-label" htmlFor="lastname" required="required" >Lastname</label>
                            <input className="form-control" id="lastname" required="required" type="text" onChange={formik.handleChange} value={formik.values.lastname} />
                        </div>
                    </div>
                </div>
                <br />
                <div class="row row-space">
                    <div class="col-2">
                        <div class="form-label">
                            <label class="label">Date of birth</label>
                            <div class="input-group-icon">
                                <input class="form-control" type="date" name="birthday" placeholder="Click Here" required />
                                <i class="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                <div class="valid-feedback">
                                    Looks good!
                                </div>
                                <div class="invalid-feedback">
                                    Please choose a Date.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="input-group">
                            <label class="label">Gender</label>
                            <div class="p-t-10">
                                <label class="radio-container m-r-45">Male
                                    <input type="radio" checked  name="gender"/>
                                    <span class="checkmark"></span>
                                </label>
                                <label class="radio-container">Female
                                    <input type="radio" name="gender" required />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <h4 className="p-2 mt-5" style={{ background: "#2c6ed5", color: "white", borderRadius: "5px" }}>Home Address</h4>

                <div className="row row-space">
                    <div class="col-12">
                        <div class="input-group-flex">
                            <label className="form-label" htmlFor="street" required="required">Street</label>
                            <input className="form-control" id="street" required="required" type="text" onChange={formik.handleChange} value={formik.values.street} />
                        </div>
                        <div class="valid-feedback">
                            Looks good!
                        </div>
                        <div class="invalid-feedback">
                            Please enter a valid address.
                        </div>
                    </div>
                </div>

                <div className="col-md-12 mt-2">
                    <label for="inputState" class="form-label mt-3">Select Region</label>
                    <select id="Region" class="form-select slist" onChange={province} onSelect={region}>
                        <option disabled>Select Region</option>
                        {
                            regionData && regionData.length > 0 && regionData.map((item) => <option
                                key={item.region_code} value={item.region_code}>{item.region_name}</option>)
                        }
                    </select>

                    <div class="col-md-12">
                        <label for="inputState" class="form-label mt-3">Select Province</label>
                        <select id="Province" class="form-select slist" onChange={city}>
                            <option disabled>Select Province</option>
                            {
                                provinceData && provinceData.length > 0 && provinceData.map((item) => <option
                                    key={item.province_code} value={item.province_code}>{item.province_name}</option>)
                            }
                        </select>
                    </div>

                    <div class="col-md-12">
                        <label for="inputState" class="form-label mt-3">City</label>
                        <select id="city" class="form-select slist" onChange={barangay}>
                            <option disabled>Select City</option>
                            {
                                cityData && cityData.length > 0 && cityData.map((item) => <option
                                    key={item.city_code} value={item.city_code}>{item.city_name}</option>)
                            }
                        </select>
                    </div>

                    <div class="col-md-12">
                        <label for="inputState" class="form-label mt-3">Barangay</label>
                        <select id="city" class="form-select slist" onChange={brgy}>
                            <option disabled>Select Barangay</option>
                            {
                                barangayData && barangayData.length > 0 && barangayData.map((item) => <option
                                    key={item.brgy_code} value={item.brgy_code}>{item.brgy_name}</option>)
                            }
                        </select>
                    </div>
                    <div class="row row-space">
                        <div class="col-2">
                            <div class="input-group-flex">
                                <label className="form-label" htmlFor="zip" required="required">Zip</label>
                                <input className="form-control" id="zip" required="required" type="text" onChange={formik.handleChange} value={formik.values.zip} />
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="input-group-flex">
                                <label className="form-label" htmlFor="phone" required="required" >Phone Number</label>
                                <input className="form-control" id="phone" required="required" type="text" onChange={formik.handleChange} value={formik.values.phone} />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row row-space">
                    <label class="label mt-4">Photo of New Address</label>
                    <div class="input-group mb-3">
                        <input type="file" class="form-control" id="inputGroupFile01" required />
                        <div class="valid-feedback">
                            Looks good!
                        </div>
                        <div class="invalid-feedback">
                            Please choose a file (.png, .jpg etc.)
                        </div>
                    </div>
                </div>
                <div><h4 className="p-2 mt-4" style={{ background: "#2c6ed5", color: "white", borderRadius: "5px" }}>Guardian Details</h4></div>

                <div class="row row-space">
                    <div class="col-2">
                        <div class="input-group-flex">
                            <label className="form-label" htmlFor="firstname" required="required">Firstname</label>
                            <input className="form-control" id="firstname" required="required" type="text" onChange={formik.handleChange} value={formik.values.firstname} />
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="input-group-flex">
                            <label className="form-label" htmlFor="lastname" required="required" >Lastname</label>
                            <input className="form-control" id="lastname" required="required" type="text" onChange={formik.handleChange} value={formik.values.lastname} />
                        </div>
                    </div>
                </div>

                <div class="row row-space">
                    <div class="col-2">
                        <div class="input-group-flex">
                            <label className="form-label" htmlFor="firstname" required="required">Relationship to the Child</label>
                            <select class="form-select" aria-label="Default select example" required>
                                <option selected >Select</option>
                                <option value="1">Mother</option>
                                <option value="2">Father</option>
                                <option value="3">Step Parent</option>
                                <option value="3">Foster Parent</option>
                                <option value="3">Brother</option>
                                <option value="3">Sister</option>
                                <option value="3">Grand Parent</option>
                                <option value="3">Other</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-2">
                        <div class="input-group-flex">
                            <label class="label">Salutation</label>
                            <div class="p-t-10 m-1">
                                <label class="radio-container m-1">Mr.
                                    <input type="radio" checked name="gender" required />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="radio-container m-1">Mrs.
                                    <input type="radio" name="gender" required />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="radio-container m-1">Miss.
                                    <input type="radio" name="gender" required />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row row-space">
                    <div class="col-2">
                        <div class="input-group-flex">
                            <label className="form-label" htmlFor="Mobile" required="required">Mobile Number</label>
                            <input className="form-control" id="Mobile" required="required" type="text" onChange={formik.handleChange} value={formik.values.Mobile} />
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="input-group-flex">
                            <label className="form-label" htmlFor="email" required="required" >Email Address</label>
                            <input className="form-control" id="email" required="required" type="text" onChange={formik.handleChange} value={formik.values.email} />
                        </div>
                    </div>
                </div>

                <div><h4 className="p-2 mt-5" style={{ background: "#2c6ed5", color: "white", borderRadius: "5px" }}>Further Information <br />
                    <span className="" style={{ fontSize: 12 }}>If you have any other children attending the school kindly provide the details below:</span>
                </h4>
                </div>
                <div class="row row-space">
                    <div class="col-2">
                        <div class="input-group-flex">
                            <label className="form-label" htmlFor="fullname" required="required">Sibling's Fullname</label>
                            <input className="form-control" id="fullname" required="required" type="text" onChange={formik.handleChange} value={formik.values.fullname} />
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="input-group-flex">
                            <div class="form-label">
                                <label class="label">Date of birth</label>
                                <div class="input-group-icon">
                                    <input class="form-control" type="date" name="birthday" placeholder="Click Here" required />
                                    <i class="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                    <div class="valid-feedback">
                                        Looks good!
                                    </div>
                                    <div class="invalid-feedback">
                                        Please choose a Date.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row row-space">
                    <div class="col-2">
                        <div class="input-group-flex">
                            <label className="form-label" htmlFor="fullname" required="required">Sibling's Fullname</label>
                            <input className="form-control" id="fullname" required="required" type="text" onChange={formik.handleChange} value={formik.values.fullname} />
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="input-group-flex">
                            <div class="form-label">
                                <label class="label">Date of birth</label>
                                <div class="input-group-icon">
                                    <input class="form-control" type="date" name="birthday" placeholder="Click Here" required />
                                    <i class="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                    <div class="valid-feedback">
                                        Looks good!
                                    </div>
                                    <div class="invalid-feedback">
                                        Please choose a Date.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="border border-primary border-opacity-75 opacity-75 mt-5"></hr>
                <div className=""><h4 class="headers p-2 mt-4">nursery provision is 5:00 Am in the morning or 5:00 pm in the afternoon sessions, as shown below.</h4>
                    <h5 class="below">**Please tick which sessions you prefer**</h5>
                </div>
                <div class="row row-space"><div class="form-check col-2">
                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked />
                    <label class="form-check-label" for="flexRadioDefault1">
                        8:00 AM - 11:00 AM
                    </label>
                </div>
                    <div class="form-check col-2">
                        <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2" />
                        <label class="form-check-label" for="flexRadioDefault2">
                            1:00 PM - 4:00 PM
                        </label>
                    </div>
                </div>

                <p className="mt-3"><strong>Note:</strong><em>Possible parental preference will be taken into account but no guarantee can be given as the
                    allocation of places depends on whether a vacancy exists in the morning of the afternoon.
                    It would be helpful, therefore, if you could also tick the "Either session"
                    if you do not have a strong preference.</em></p>

                {/* Trigger the modal with a button */}
                <button class="btn btn--radius-2 btn--blue" type="submit" data-bs-toggle="modal" data-bs-target="#exampleModal">Submit</button>
                <button type="button" class="btn btn-floating btn-lg" id="btn-back-to-top"><i><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                </svg></i></button>

                {/* Vertically centered modal */}

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Student Registration Acknowledgement</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>Thank you for submitting this information. We will contact you as soon as we received and processed your enrollment.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>



            </form >
        </div >
    );
}