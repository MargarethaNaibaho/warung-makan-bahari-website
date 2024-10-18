import { FaLock, FaUser, FaPhone } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SuccessModal from "../components/SuccessModal";

const Register = () => {
    const {  register, isLoggedIn } = useAuth();
    const initialValues = {
        username: "",
        password: "",
        name: "",
        phoneNumber: ""
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [invalidRegisterMessage, setInvalidRegisterMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn){
            navigate('/dashboard');
        }
    }, [isLoggedIn, navigate]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormValues({...formValues, [name]: value});

        const errors = validate({...formValues, [name]: value});
        setFormErrors(errors);
    }

    const validate = (values) => {
        const errors = {};
        const regex = /^08\d*$/;

        if(!values.username){
            errors.username = "Username is required";
        }

        if(!values.name){
            errors.name = "Name is required";
        }

        if(!values.password){
            errors.password = "Password is required";
        } else if(values.password.length < 6){
            errors.password = "6 min length character"
        }

        if(!values.phoneNumber){
            errors.phoneNumber = "Phone number is required";
        } else if (!regex.test(values.phoneNumber)) {
            errors.phoneNumber = "Invalid phone number format";
        } else if(values.phoneNumber.length < 11) {
            errors.phoneNumber = "11 min length character"
        } else if(values.phoneNumber.length > 15) {
            errors.phoneNumber = "15 max length character"
        }

        return errors;
        
    }

    const handleRegister = async(event) => {
        event.preventDefault()
        const errors = validate(formValues);
        setFormErrors(errors);

        if(Object.keys(errors).length === 0){
            try{
                const {username, password, name, phoneNumber} = formValues;
                const success = await register(username, password, name, phoneNumber);
                
                setIsModalOpen(true);

            } catch(error) {
                setInvalidRegisterMessage(error.message);
            }
        }
    }

    if(isLoggedIn) {
        return null;
    }

    return (
        <div className="font-poppins flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Register Form</h1>
                {/* <pre>{JSON.stringify(formValues)}</pre> */}
                <form className="space-y-5" onSubmit={handleRegister}>
                    
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">Username</label>
                        <div className="input-wrapper flex items-center border border-gray-300 rounded-md px-3 focus-within:border-amber-500 focus-within:ring focus-within:ring-amber-200">
                            <MdMail className="text-gray-400"/>
                            <input type="text" 
                            name="username" 
                            placeholder="Username" 
                            value={ formValues.username }
                            onChange={handleChange}
                            className="w-full px-2 py-2 text-sm border-none focus:outline-none focus:ring-0 focus:border-transparent" />
                        </div>
                        <p className="text-red-600 text-sm mt-1 h-4">{formErrors.username}</p>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                        <div className="input-wrapper flex items-center border border-gray-300 rounded-md px-3 focus-within:border-amber-500 focus-within:ring focus-within:ring-amber-200">
                            <FaLock className="text-gray-400"/>
                            <input type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={ formValues.password } 
                            onChange={handleChange}
                            className="w-full px-2 py-2 text-sm border-none focus:outline-none focus:ring-0 focus:border-transparent" />
                        </div>
                        <p className="text-red-600 text-sm mt-1 h-4">{formErrors.password}</p>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">Name</label>
                        <div className="input-wrapper flex items-center border border-gray-300 rounded-md px-3 focus-within:border-amber-500 focus-within:ring focus-within:ring-amber-200">
                            <FaUser className="text-gray-400"/>
                            <input type="text" 
                            name="name" 
                            placeholder="Name" 
                            value={ formValues.name }
                            onChange={handleChange}
                            className="w-full px-2 py-2 text-sm border-none focus:outline-none focus:ring-0 focus:border-transparent" />
                        </div>
                        <p className="text-red-600 text-sm mt-1 h-4">{formErrors.name}</p>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">Phone Number</label>
                        <div className="input-wrapper flex items-center border border-gray-300 rounded-md px-3 focus-within:border-amber-500 focus-within:ring focus-within:ring-amber-200">
                            <FaPhone className="text-gray-400"/>
                            <input type="text" 
                            name="phoneNumber" 
                            placeholder="Phone Number (08...)" 
                            value={ formValues.phoneNumber }
                            onChange={handleChange}
                            className="w-full px-2 py-2 text-sm border-none focus:outline-none focus:ring-0 focus:border-transparent" />
                        </div>
                        <p className="text-red-600 text-sm mt-1 h-4">{formErrors.phoneNumber}</p>
                    </div>

                    {invalidRegisterMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3">{invalidRegisterMessage}</div>}

                    <div>
                        <div className="text-center text-sm text-gray-700">
                            Already have an account? 
                            <span className="text-amber-600 font-semibold cursor-pointer ml-5" >
                            <Link to="/">Login here</Link>
                            </span>
                        </div>
                    </div>

                    <button className="w-full py-2 px-4 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition">Register</button>

                </form>
            </div>

            {isModalOpen && <SuccessModal onClose={() => setIsModalOpen(false)}/>}
        </div>
    );
}

export default Register;