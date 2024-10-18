import { Link } from "react-router-dom";

const SuccessModal = ({onClose}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-lg font-bold mb-4">Registration Successful!</h2>
                <p className="mb-4">You have registered Successfully. You can now log in to your account.</p>
                <div className="flex justify-end">
                    <button className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={onClose}>
                        Close
                    </button>
                    <Link to="/" className="px-2 py-2 bg-amber-600 text-white rounded hover:bg-amber-700">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;