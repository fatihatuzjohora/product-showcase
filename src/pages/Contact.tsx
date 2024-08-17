import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import Container from '../utils/Container';
import Title from '../utils/Title';

type ContactFormInputs = {
    name: string;
    email: string;
    message: string;
};

const ContactUs = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ContactFormInputs>();
    const [submitted, setSubmitted] = useState(false);

    const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
        // Handle form submission (e.g., send data to backend)
        console.log(data);
        setSubmitted(true);
    };

    return (
        <Container className=" mx-4">
            <Title title="Contact Us" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
                {/* Left Section - Contact Information */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-primary mb-4">Get In Touch</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        We'd love to hear from you! Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
                    </p>
                    <ul className="text-lg text-gray-700">
                        <li className="mb-2">
                            <strong>Email:</strong> contact@yourcompany.com
                        </li>
                        <li className="mb-2">
                            <strong>Phone:</strong> +1 (555) 123-4567
                        </li>
                        <li>
                            <strong>Address:</strong> 123 Your Street, City, Country
                        </li>
                    </ul>
                </div>

                {/* Right Section - Contact Form */}
                <div>
                    {submitted ? (
                        <div className="p-6 text-center bg-green-100 border border-green-400 rounded-lg">
                            <h3 className="text-lg font-semibold text-green-700">
                                Thank you for your message! We'll get back to you soon.
                            </h3>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    {...register("message", { required: "Message is required" })}
                                    className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                                    rows={6}
                                ></textarea>
                                {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary-dark focus:ring-4 focus:ring-primary-dark"
                            >
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default ContactUs;
