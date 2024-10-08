import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Loading from '../utils/Loading';

type LoginFormInputs = {
    email: string;
    password: string;
};

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { signInUser, signInWithGoogle, loading } = authContext;

    const onSubmit: SubmitHandler<LoginFormInputs> = async data => {
        try {
            await signInUser(data.email, data.password);
            navigate('/');
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate('/');
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Access your account to enjoy our services. Don't have an account? <Link to="/register" className="text-primary">Register here</Link>.
                    </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control mt-6">
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="btn btn-secondary"
                            >
                                Sign In with Google
                            </button>
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
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
