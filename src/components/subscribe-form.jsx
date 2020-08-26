import React, {useState} from 'react';
import { subscribe } from '../components/actions/subscribeform';

export default function Subscribe (){

    const [values, setValues] = useState({
        subscriberEmail: '',
        error: '',
        loading: false,
        message: '',
        showForm: true,
        showSuccessMessage: false
    });

    const { subscriberEmail, error, loading, message, showForm, showSuccessMessage } = values;

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false });
        const message = { subscriberEmail };

        subscribe(message).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({
                    ...values,
                    subscriberEmail: '',
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: true,
                    showSuccessMessage: true
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');
    const showSuccess = () => (showSuccessMessage ? <div className="container alert alert-success"><center>Thank you! for subscribing to our newsletter.</center></div>: '');

   
    const subscribeForm = () => {
    return (
        <div className="site-section bg-light">
            <div className="container">
                <div className="row justify-content-center text-center">
                    <div className="col-md-5">
                        <div className="subscribe-1 ">
                            <h2>Subscribe to our newsletter</h2>
                            <p className="mb-5">Sign up to our newsletter, so you can be the first to find out the latest news and tips throughout the year.</p>
                            <form onSubmit={handleSubmit} className="d-flex">
                                <input type="email" className="form-control" value={subscriberEmail} onChange={handleChange('subscriberEmail')} placeholder="Enter your email address" required/>
                                <input type="submit" className="btn btn-primary" value="Subscribe"/>
                            </form>
                        </div>
                        <br/>
                        {showSuccess()} {showError()} {showLoading()} {showMessage()}
                    </div>
                </div>
            </div>
        </div>
    );
 };

    return (
        <>
         {showForm && subscribeForm()}   
        </>
    );
};