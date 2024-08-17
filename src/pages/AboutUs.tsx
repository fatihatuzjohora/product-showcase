import Container from "../utils/Container";
import Title from "../utils/Title";

const AboutUs = () => {
    return (
        <Container className="mx-4">
            <Title title="About Us" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Section - Image */}
                <div className="flex items-center justify-center">
                    <img
                        src="https://via.placeholder.com/500x500"
                        alt="Our Team"
                        className="rounded-lg shadow-lg w-full h-auto object-cover"
                    />
                </div>

                {/* Right Section - Content */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-primary mb-4">Who We Are</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        We are a passionate team of developers, designers, and innovators dedicated to creating top-notch digital experiences. Our mission is to deliver high-quality products that meet the needs of our clients and make a positive impact in the world.
                    </p>
                    <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Our mission is to empower businesses and individuals by providing them with cutting-edge technology solutions that enhance productivity, creativity, and connectivity. We strive to be leaders in our field by constantly pushing the boundaries of what's possible.
                    </p>
                    <h2 className="text-2xl font-bold text-primary mb-4">Our Values</h2>
                    <ul className="list-disc pl-5 text-lg text-gray-700">
                        <li>Integrity and transparency in all our dealings.</li>
                        <li>Innovation at the heart of everything we do.</li>
                        <li>Commitment to quality and excellence.</li>
                        <li>Customer satisfaction as our top priority.</li>
                        <li>Fostering a collaborative and inclusive work environment.</li>
                    </ul>
                </div>
            </div>

            {/* Additional Section - Company History */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold text-primary mb-4">Our Journey</h2>
                <p className="text-lg text-gray-700 mb-6">
                    Founded in [Year], we started with a small team of passionate individuals who shared a common vision: to revolutionize the tech industry with innovative solutions. Over the years, we have grown into a dynamic organization, constantly evolving to meet the challenges of a fast-paced digital world.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                    Our journey has been one of growth, learning, and constant innovation. We have successfully delivered numerous projects across various industries, earning the trust and loyalty of our clients. As we look to the future, we remain committed to pushing the envelope and delivering exceptional value to our clients and partners.
                </p>
            </div>
        </Container>
    );
};

export default AboutUs;
