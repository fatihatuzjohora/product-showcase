import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react"
import { AuthContext } from '../context/authContext';
type RegisterFormInputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormInputs>();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { createUser } = authContext;

    const onSubmit: SubmitHandler<RegisterFormInputs> = async data => {
        try {
            await createUser(data.email, data.password);
            navigate('/');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Create an account to access our services. Already have an account? <Link to="/login" className="text-primary">Login here</Link>.
                    </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                placeholder="name"
                                className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="email"
                                className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("password", { required: "Password is required" })}
                                placeholder="password"
                                className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("confirmPassword", {
                                    validate: value =>
                                        value === watch('password') || "Passwords don't match"
                                })}
                                placeholder="confirm password"
                                className={`input input-bordered ${errors.confirmPassword ? 'input-error' : ''}`}
                            />
                            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
